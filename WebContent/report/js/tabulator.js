/*
 * This file is part of the Tabulator package.
 *
 * (c) Oliver Folkerd <oliver.folkerd@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

$.widget("ui.tabulator", {

data:[],//array to hold data for table
firstRender:true, //layout table widths correctly on first render
mouseDrag:false, //mouse drag tracker;
mouseDragWidth:false, //starting width of colum on mouse drag
mouseDragElement:false, //column being dragged
mouseDragOut:false, //catch to prevent mouseup on col drag triggering click on sort

sortCurCol:null,//column name of currently sorted column
sortCurDir:null,//column name of currently sorted column

filterField:null, //field to be filtered on data render
filterValue:null, //value to match on filter
filterType:null, //filter type

//setup options
options: {
	backgroundColor: "#888", //background color of tabulator
	borderColor:"#999", //border to tablulator

	textSize: "14px", //table text size

	headerBackgroundColor:"#e6e6e6", //border to tablulator
	headerTextColor:"#555", //header text colour
	headerBorderColor:"#aaa", //header border color
	headerSeperatorColor:"#999", //header bottom seperator color
	headerMargin:"4px",

	rowBackgroundColor:"#fff", //table row background color
	rowBorderColor:"#aaa", //table border color
	rowTextColor:"#333", //table text color
	rowHoverBackground:"#bbb", //row background color on hover

	colMinWidth:"40px", //minimum global width for a column
	colResizable:true, //resizable columns

	height:false, //height of tabulator
	fitColumns:false, //fit colums to width of screen;

	columns:[],//stor for colum header info

	sortable:true, //global default for sorting
	dateFormat: "dd/mm/yyyy", //date format to be used for sorting
	sortArrows:{ //colors for sorting arrows
		active: "#666",
		inactive: "#bbb",
	},

	sortBy:"id", //defualt column to sort by
	sortDir:"desc", //default sort direction

	addRowPos:"bottom", //position to insert blank rows, top|bottom

	selectable:true, //highlight rows on hover

	ajaxURL:false, //url for ajax loading

	showLoader:true, //show loader while data loading
	loader:"<div style='display:inline-block; border:4px solid #333; border-radius:10px; background:#fff; font-weight:bold; font-size:16px; color:#000; padding:10px 20px;'>Loading Data</div>", //loader element
	loaderError:"<div style='display:inline-block; border:4px solid #D00; border-radius:10px; background:#fff; font-weight:bold; font-size:16px; color:#590000; padding:10px 20px;'>Loading Error</div>", //loader element

	rowClick:function(){}, //do action on row click
	rowAdded:function(){}, //do action on row add
	rowEdit:function(){}, //do action on row edit
	rowDelete:function(){}, //do action on row delete
	rowContext:function(){}, //context menu action
	dataLoaded:function(){},  //callback for when data has been Loaded
},

//loader blockout div
loaderDiv: $("<div class='tablulator-loader' style='position:absolute; top:20px; left:0; z-index:9999999; height:100%; width:100%; background:rgba(0,0,0,.4); text-align:center;'><div class='tabulator-loader-msg'></div></div>"),

//show loader blockout div
_showLoader:function(self, msg){
	if(self.options.showLoader){
		$(".tabulator-loader-msg", self.loaderDiv).empty().append(msg);
		$(".tabulator-loader-msg", self.loaderDiv).css({"margin-top":(self.element.innerHeight() / 2) - ($(".tabulator-loader-msg", self.loaderDiv).outerHeight()/2)})
		self.element.append(self.loaderDiv);
	}
},


_hideLoader:function(self){
	$(".tablulator-loader", self.element).remove();
},


//event triggers
//dataLoading:-  callback for when data is being loaded

//dataLoadError:-  callback for when there is adata loading error
//renderStarted:-  callback for when table is starting to render
//renderComplete:-  callback for when table is rendered
//sortStarted:-  callback for when sorting has begun
//sortComplete:-  callback for when sorting is complete

//constructor
_create: function() {
	var self = this;
	var options = self.options;
	var element = self.element;

	options.textSize = isNaN(options.textSize) ? options.textSize : options.textSize + "px";
	options.colMinWidth = isNaN(options.colMinWidth) ? options.colMinWidth : options.colMinWidth + "px";

	options.textSizeNum = parseInt(options.textSize.replace("px",""));
	headerMargin = parseInt(options.headerMargin.replace("px",""));
	options.headerHeight =  options.textSizeNum + (headerMargin*2) + 2;

	if(options.height){
		options.height = isNaN(options.height) ? options.height : options.height + "px";
		element.css({"height": options.height});
	}

	element.addClass("tabulator");
	element.css({
		position:"relative",
		"box-sizing" : "border-box",
		"background-color": options.backgroundColor,
		"border": "1px solid " + options.borderColor,
		//"overflow-x":"auto",
		"overflow":"hidden",
	})

	self.header = $("<div class='tabulator-header'></div>")

	self.header.css({
		position:"relative",

		"background-color": options.headerBackgroundColor,
		"border-bottom":"1px solid " + options.headerSeperatorColor,
		"color": options.headerTextColor,
		"font-size":options.textSize,
		"font-weight":"bold",
		"white-space": "nowrap",
		"z-index":"1",
		"overflow":"visible",
	});

	self.tableHolder = $("<div class='tabulator-tableHolder'></div>");

	self.tableHolder.css({
		"position":"absolute",
		"z-index":"1",
		"min-height":"calc(100% - " + (options.headerHeight + 1) + "px)",
		"max-height":"calc(100% - " + (options.headerHeight + 1) + "px)",
		"white-space": "nowrap",
		"overflow":"hidden",
		"width":"100%",
	});

	self.tableHolder.scroll(function(){
		self.header.css({"margin-left": "-1" * $(this).scrollLeft()});
	});

	//create scrollable table holder
	self.table = $("<div class='tabulator-table'></div>");


	self.table.css({
		position:"relative",
		"font-size":options.textSize,
		"white-space": "nowrap",
		"z-index":"1",
		"display":"inline-block",
		"overflow":"hidden",
	});

	//create sortable arrow chevrons
	var arrow = $("<div class='tabulator-arrow'></div>");
	arrow.css({
		display: "inline-block",
		position: "absolute",
		top:"9px",
		right:"8px",
		width: 0,
		height: 0,
		"border-left": "6px solid transparent",
		"border-right": "6px solid transparent",
		"border-bottom": "6px solid " + options.sortArrows.inactive,
	});

	$.each(options.columns, function(i, column) {

		column.index = i;

		column.sorter = typeof(column.sorter) == "undefined" ? "string" : column.sorter;
		column.sortable = typeof(column.sortable) == "undefined" ? options.sortable : column.sortable;
		column.sortable = typeof(column.field) == "undefined" ? false : column.sortable;

		if(options.sortBy == column.field){
			var sortdir = " data-sortdir='" + options.sortDir + "' ";
			self.sortCurCol= column;
			self.sortCurDir = options.sortDir;
		}else{
			var sortdir = "";
		}

		var title = column.title ? column.title : "&nbsp";

		var col = $('<div class="tabulator-col" style="display:inline-block" data-index="' + i + '" data-field="' + column.field + '" data-sortable=' + column.sortable + sortdir + ' >' + title + '</div>');

		if(typeof(column.width) != "undefined"){
			column.width = isNaN(column.width) ? column.width : column.width + "px"; //format number

			col.data("width", column.width);

			col.css({width:column.width});
		}

		//sort tabl click binding
		if(column.sortable){
			col.on("click", function(){
				if(!self.mouseDragOut){ //prevent accidental trigger my mouseup on column drag
					self._sortClick(column, col); //trigger sort
				}
				self.mouseDragOut = false;
			})
		}

		self.header.append(col);

	});

element.append(self.header);
self.tableHolder.append(self.table);
element.append(self.tableHolder);

	//layout headers
	$(".tabulator-col", self.header).css({
		"padding":"4px",
		"text-align":"left",
		"position":"relative",
		"border-right":"1px solid " + options.headerBorderColor,
		"box-sizing":"border-box",
		"user-select":"none",
		"white-space": "nowrap",
		"overflow": "hidden",
		"text-overflow": "ellipsis",
		"vertical-align": "bottom",
	});

	//handle resizable columns
	if(self.options.colResizable){
		//create resize handle
		var handle = $("<div class='tabulator-handle' style='position:absolute; right:0; top:0; bottom:0; width:5px;'></div>")
		handle.on("mousedown", function(e){
			self.mouseDrag = e.screenX;
			self.mouseDragWidth = $(this).closest(".tabulator-col").outerWidth();
			self.mouseDragElement = $(this).closest(".tabulator-col");
		})
		self.element.on("mousemove", function(e){
			if(self.mouseDrag){
				self.mouseDragElement.css({width: self.mouseDragWidth + (e.screenX - self.mouseDrag)})
				self._resizeCol(self.mouseDragElement.data("index"), self.mouseDragElement.outerWidth());
			}
		})
		self.element.on("mouseup", function(e){

			if(self.mouseDrag){
				e.stopPropagation();
				e.stopImmediatePropagation();

				self.mouseDragOut = true;

				self._resizeCol(self.mouseDragElement.data("index"), self.mouseDragElement.outerWidth());

				self.mouseDrag = false;
				self.mouseDragWidth = false;
				self.mouseDragElement = false;
			}
		});

		handle.on("mouseover", function(){$(this).css({cursor:"ew-resize"})})

		$(".tabulator-col", self.header).append(handle);

		$(".tabulator-col", self.header).on("mouseup", function(){

		});

		element.on("change blur", ".tabulator-cell input", function(e){
			self._cellDataChange($(this));
		})
	}

	//append sortable arrows to sortable headers
	$(".tabulator-col[data-sortable=true]", self.header).css({"padding-right":"25px"})
	.data("sortdir", "desc")
	.on("mouseover", function(){$(this).css({cursor:"pointer", "background-color":"rgba(0,0,0,.1)"})})
	.on("mouseout", function(){$(this).css({"background-color":"transparent"})})
	.append(arrow.clone());

	//render column headings
	self._colRender();

},

//set options
_setOption: function(option, value) {
	$.Widget.prototype._setOption.apply( this, arguments );
},

//handle cell data change
_cellDataChange: function(input){

	var self = this;

	var cell = input.closest(".tabulator-cell");
	var row = cell.closest(".tabulator-row");

	//update cell data value
	cell.data("value", input.val());

	//update row data
	var rowData =  row.data("data");
	rowData[cell.data("field")] = input.val();
	row.data("data", rowData);

	if(rowData.id){
		//update tabulator data
		self.data[rowData.id] = rowData;
	}

	//reformat cell data
	cell.html(self._formatCell(cell.data("formatter"), input.val(), rowData, cell, row))
	.css({"padding":"4px"});


	//triger event
	self.options.rowEdit(rowData.id, rowData, row);

},

//delete row from table by id
deleteRow: function(item){
	var self = this;

	var id = typeof(item) == "number" ? item : item.data("data").id;

	if(self.data[id]){
		//remove row from data
		self.data.splice(id, 1);
	}

	if(id){
		//remove row from table
		$("[data-id=" + id + "]", self.element).remove();
	}else{
		//remove row from table
		item.remove();
	}

	//style table rows
	self._styleRows();

	//align column widths
	self._colRender(!self.firstRender);
	self._trigger("renderComplete");

	self.options.rowDelete(id);
},

//add blank row to table
addRow:function(item){
	var self = this;

	if(item){
		item.id = item.id ? item.id : 0;
	}else{
		item = {id:0}
	}

	//create blank row
	var row = self._renderRow(item);

	//append to top or bottom of table based on preference
	if(self.options.addRowPos == "top"){
		self.table.prepend(row);
	}else{
		self.table.append(row);
	}
	//style table rows
	self._styleRows();

	//align column widths
	self._colRender(!self.firstRender);
	self._trigger("renderComplete");

	//triger event
	self.options.rowAdded(item);

},

//get array of data from the table
getData:function(){
	var self = this;


	var allData = [];

	//get all data from array
	self.data.forEach( function(item, i) {
		allData.push(item);
	});

	//get all new elements from list
	$("[data-id=0]", self.element).each(function(){
		allData.push($(this).data("data"));
	});

	return allData;
},

//load data
setData:function(data){

	this._trigger("dataLoading");

	//show loader if needed
	this._showLoader(this, this.options.loader)

	if(typeof(data) === "string"){
		if (data.indexOf("{") == 0 || data.indexOf("[") == 0){
			//data is a json encoded string
			this._parseData(jQuery.parseJSON(data));
		}else{
			//assume data is url, make ajax call to url to get data
			this._getAjaxData(data);
		}
	}else{
		if(data){
			//asume data is already an object
			this._parseData(data);

		}else{
			//no data provided, check if ajaxURL is present;
			if(this.options.ajaxURL){
				this._getAjaxData(this.options.ajaxURL);
			}else{
				//empty data
				this._parseData([]);
			}
		}
	}
},

setAjaxurl:function(ajaxurl){
	this.options.ajaxURL=ajaxurl;
},

//clear data
clear:function(){
	this.table.empty();
	this.options=null;
	this.data = [];
	this._renderTable();
},

//filter data in table
setFilter:function(field, type, value){
	var self = this;

	//set filter
	if(field){
		//set filter
		self.filterField = field;
		self.filterType = typeof(value) == "undefined" ? "=" : type;
		self.filterValue = typeof(value) == "undefined" ? type : value;
	}else{
		//clear filter
		self.filterField = null;
		self.filterType = null;
		self.filterValue = null;
	}

	//render table
	this._renderTable();
},

//clear filter
clearFilter:function(){
	var self = this;

	self.filterField = null;
	self.filterType = null;
	self.filterValue = null;

	//render table
	this._renderTable();
},

//get current filter info
getFilter:function(){

	var self = this;

	if(self.filterField){

		var filter = {
			"field":self.filterField,
			"type":self.filterType,
			"value":self.filterValue,
		};

		return filter;

	}else{
		return false;
	}

},

//parse and index data
_parseData:function(data){

	var newData = [];

	$.each(data, function(i, item) {
		newData[item.id] = item;
	});

	this.data = newData;

	this.options.dataLoaded(data);
	this._renderTable();
},

//get json data via ajax
_getAjaxData:function(url){

	var self = this;

	$.ajax({
		url: url,
		type: "GET",
		async: true,
		dataType:'json',
		success: function (data) {
			self._parseData(data.resList);
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log("Tablulator ERROR (ajax get): " + xhr.status + " - " + thrownError);
			self._trigger("dataLoadError", xhr, thrownError);

			self._showLoader(self, self.options.loaderError);
		},
	});
},

_renderTable:function(){
	var self = this;

	this._trigger("renderStarted");

	//hide table while building
	self.table.hide();
	//show loader if needed
	self._showLoader(self, self.options.loader)

	//clear data from table before loading new
	self.table.empty();

	//build rows of table
	self.data.forEach( function(item, i) {
		//check if filter and only build row if if data matches filter
		if(!self.filterField || (self.filterField && self._filterRow(item))){
			self.table.append(self._renderRow(item));
		}
	});

	self.table.css({//
		"background-color":self.options.rowBackgroundColor,
		"color":self.options.rowTextColor,
	});

	//style table rows
	self._styleRows();

	//sort data if already sorted
	if(self.sortCurCol){
		self._sorter(self.sortCurCol, self.sortCurDir);
	}


	//show table once loading complete
	self.table.show();

	//align column widths
	self._colRender(!self.firstRender);

	//hide loader div
	self._hideLoader(self);

	self._trigger("renderComplete");

},

//check if row data matches filter
_filterRow:function(row){
	var self = this;

	// if no filter set display row
	if(!self.filterField){
		return true;
	}

	var value = row[self.filterField];
	var term = self.filterValue;

	switch(self.filterType){
		case "=": //equal to
		return value == term ? true : false;
		break;

		case "<": //less than
		return value < term ? true : false;
		break;

		case "<=": //less than or equal too
		return value <= term ? true : false;
		break;

		case ">": //greater than
		return value > term ? true : false;
		break;

		case ">=": //greater than or equal too
		return value >= term ? true : false;
		break;

		case "!=": //not equal to
		return value != term ? true : false;
		break;

		case "like": //text like
		return value.toLowerCase().indexOf(term.toLowerCase()) > -1 ? true : false;
		break;

		default:
		return false;
	}

	return false;

},

//render individual rows
_renderRow:function(item){

	var self = this;

	var row = $('<div class="tabulator-row" data-id="' + item.id + '"></div>');

	//bind row data to row
	row.data("data", item);

	//bind row click events
	row.on("click", function(e){self._rowClick(e, row, item)});
	row.on("contextmenu", function(e){self._rowContext(e, row, item)});

	$.each(self.options.columns, function(i, column) {
		//deal with values that arnt declared

		var value = typeof(item[column.field]) == 'undefined' ? "" : item[column.field];

		// set empty values to not break search
		if(typeof(item[column.field]) == 'undefined'){
			item[column.field] = "";
		}

		//set column text alignment
		var align = typeof(column.align) == 'undefined' ? "left" : column.align;

		//mark cell as editable
		var editable = column.editable ? "data-editable=true" : "";

		var cell = $("<div class='tabulator-cell' data-index='" + i + "' " + editable + " data-field='" + column.field + "' data-value='" + self._safeString(value) + "' ></div>");

		cell.css({

			"text-align": align,
			"box-sizing":"border-box",
			"display":"inline-block",
			"vertical-align":"middle",
			"min-height":self.options.headerHeight,
			"white-space":"nowrap",
			"overflow":"hidden",
			"text-overflow":"ellipsis",
			"padding":"4px",
		})


		//format cell contents
		cell.data("formatter", column.formatter);
		cell.html(self._formatCell(column.formatter, value, item, cell, row));

		//bind cell click function
		if(typeof(column.onClick) == "function"){
			cell.on("click", function(e){self._cellClick(e, cell)});
		}else{
			//handle input replacement on editable cells
			if(cell.data("editable")){
				cell.on("click", function(e){

					e.stopPropagation();

					//create and style input
					cell.html("<input type='text'/>");
					$("input", cell).css({
						"border":"none",
						"background":"transparent",
						"padding":"4px",
						"width":"100%",
						"box-sizing":"border-box",
					})
					.click(function(e){
						e.stopPropagation();
					})

					$("input", cell).val(cell.data("value"));
					cell.css({padding: "0"});

					//set focus on input
					$("input", cell).focus();
				});
			}
		}

		row.append(cell);
	});

return row;
},

//get number of elements in dataset
dataCount:function(){
	return this.data.length;
},


//redraw list without updating data
redraw:function(){
	var self = this

	//redraw columns
	if(self.options.fitColumns){
		self._colRender();
	}

	//reposition loader if present
	if(self.element.innerHeight() > 0){
		$(".tabulator-loader-msg", self.loaderDiv).css({"margin-top":(self.element.innerHeight() / 2) - ($(".tabulator-loader-msg", self.loaderDiv).outerHeight()/2)})
	}
},

//resize a colum to specified width
_resizeCol:function(index, width){
	$(".tabulator-cell[data-index=" + index + "], .tabulator-col[data-index=" + index + "]",this.element).css({width:width})
},

//layout coluns on first render
_colRender:function(fixedwidth){
	var self = this;
	var options = self.options;
	var table = self.table;
	var header = self.header;
	var element = self.element;

	self.firstRender = false;

	if(fixedwidth && !options.fitColumns){ //it columns have been resized and now data needs to match them
		//free sized table
		$.each(options.columns, function(i, column) {
			colWidth = $(".tabulator-col[data-index=" + i + "]", element).outerWidth();
			var col = $(".tabulator-cell[data-index=" + i + "]", element);
			col.css({width:colWidth});
		});
	}else{

		if(options.fitColumns){
			//resize columns to fit in window

			if(self.options.fitColumns){
				$(".tabulator-row", self.table).css({
					"width":"100%",
				})
			}

			var totWidth = self.element.innerWidth();
			var colCount = options.columns.length;
			var colWidth = totWidth / colCount;

			var widthIdeal = 0;
			var widthIdealCount = 0;

			$.each(options.columns, function(i, column) {
				if(column.width){

					var thisWidth = typeof(column.width) == "string" ? parseInt(column.width) : column.width;

					widthIdeal += thisWidth;
					widthIdealCount++;
				}
			});

			var proposedWidth = Math.floor((totWidth - widthIdeal) / (colCount - widthIdealCount))

			if(proposedWidth >= parseInt(options.colMinWidth)){

				$.each(options.columns, function(i, column) {
					var newWidth = column.width ? column.width : proposedWidth;

					var col = $(".tabulator-cell[data-index=" + i + "], .tabulator-col[data-index=" + i + "]",element);
					col.css({width:newWidth});
				});

			}else{
				var col = $(".tabulator-cell, .tabulator-col",element);
				col.css({width:colWidth});
			}

		}else{

			//free sized table
			$.each(options.columns, function(i, column) {

				var col = $(".tabulator-cell[data-index=" + i + "], .tabulator-col[data-index=" + i+ "]",element)

				if(column.width){
					//reseize to match specified column width
					max = column.width;
				}else{
					//resize columns to widest element

					var max = 0;

					col.each(function(){
						max = $(this).outerWidth() > max ? $(this).outerWidth() : max
					});

					if(options.colMinWidth){
						max = max < options.colMinWidth ? options.colMinWidth : max;
					}

				}
				col.css({width:max});
			});
		}//
	}
},

//style rows of the table
_styleRows:function(){

	var self = this;

	//fixes IE rendering bug on table redraw
	$(".tabulator-tableHolder", self.element).css({height:$(".tabulator-table", self.element).height()});

	$(".tabulator-row", self.table).css({"background-color":"transparent"})

	//hover over rows
	if(self.options.selectable){
		$(".tabulator-row", self.table)
		.on("mouseover", function(){$(this).css({cursor:"pointer", "background-color":self.options.rowHoverBackground})})
		.on("mouseout", function(){$(this).css({"background-color":"transparent"})})
	}

	//color odd rows
	$(".tabulator-row:nth-of-type(even)", self.table).css({
		"background-color": "rgba(0,0,0,.1);" //shade even numbered rows
	})
	.on("mouseout", function(){$(this).css({"background-color": "rgba(0,0,0,.08);"})}); //make sure odd rows revert back to color after hover

	//add column borders to rows
	$(".tabulator-cell", self.table).css({
		"border-right":"1px solid " + self.options.rowBorderColor,
	});

	if(!self.options.height){
		self.element.css({height:self.table.outerHeight() + self.options.headerHeight + 3})
	}
},

//format cell contents
_formatCell:function(formatter, value, data, cell, row){
	var formatter = typeof(formatter) == "undefined" ? "plaintext" : formatter;
	formatter = typeof(formatter) == "string" ? this.formatters[formatter] : formatter;

	return formatter(value, data, cell, row,  this.options);
},

//carry out action on row click
_rowClick: function(e, row, data){
	this.options.rowClick(e, row.data("id"), data, row);
},

//carry out action on row context
_rowContext: function(e, row, data){
	e.preventDefault();
	this.options.rowContext(e, row.data("id"), data, row);
},

//carry out action on cell click
_cellClick: function(e, cell){

	var column = this.options.columns.filter(function(column) {
		return column.index == cell.data("index");
	});

	column[0].onClick(e, cell, cell.data("value"), cell.closest(".tabulator-row").data("data")  );
},

//return escaped string for attribute
_safeString: function(value){
	return String(value).replace(/'/g, "&#39;");
},

_sortClick: function(column, element){
	var self = this;
	var header = self.header;
	var options = this.options;

	//reset all column sorts
	$(".tabulator-col[data-sortable=true][data-field!=" + column.field + "]", self.header).data("sortdir", "desc");
	$(".tabulator-col .tabulator-arrow", self.header).css({
		"border-top": "none",
		"border-bottom": "6px solid " + options.sortArrows.inactive,
	})

	if (element.data("sortdir") == "desc"){
		element.data("sortdir", "asc");
		$(".tabulator-arrow", element).css({
			"border-top": "none",
			"border-bottom": "6px solid " + options.sortArrows.active,
		});
	}else{
		element.data("sortdir", "desc");
		$(".tabulator-arrow", element).css({
			"border-top": "6px solid " + options.sortArrows.active,
			"border-bottom": "none",
		});
	}

	self._sorter(column, element.data("sortdir"));
},

_sorter: function(column, dir){

	var self = this;
	var table = self.table;
	var data = self.data;

	self._trigger("sortStarted");

	self.sortCurCol = column;
	self.sortCurDir = dir;

	$(".tabulator-row", table).sort(function(a,b) {

		//switch elements depending on search direction
		el1 = dir == "asc" ? $(a).data("data") : $(b).data("data")
		el2 = dir == "asc" ? $(b).data("data") : $(a).data("data")

		//workaround to format dates correctly
		a = column.sorter == "date" ? self._formatDate(el1[column.field]) : el1[column.field];
		b = column.sorter == "date" ? self._formatDate(el2[column.field]) : el2[column.field];

		//run sorter
		var sorter = typeof(column.sorter) == "undefined" ? "plaintext" : column.sorter;
		sorter = typeof(sorter) == "string" ? self.sorters[sorter] : sorter;
		return sorter(a, b);

	}).appendTo(table);

	//style table rows
	self._styleRows();

	self._trigger("sortComplete");
},

//format date for date comparison
_formatDate:function(dateString){
	var format = this.options.dateFormat

	var ypos = format.indexOf("yyyy");
	var mpos = format.indexOf("mm");
	var dpos = format.indexOf("dd");

	if(dateString){
		var formattedString = dateString.substring(ypos, ypos+4) + "-" + dateString.substring(mpos, mpos+2) + "-" + dateString.substring(dpos, dpos+2);

		var newDate = Date.parse(formattedString)
	}else{
		var newDate = 0;
	}

	return isNaN(newDate) ? 0 : newDate;
},

//custom data sorters
sorters:{
	number:function(a, b){ //sort numbers
		return parseFloat(a.replace(",","")) - parseFloat(b.replace(",",""));
	},
	string:function(a, b){ //sort strings
		return String(a).toLowerCase().localeCompare(String(b).toLowerCase());
	},
	date:function(a, b){ //sort dates
		return a - b;
	},
	boolean:function(a, b){ //sort booleans
		el1 = a === true || a === "true" || a === "True" || a === 1 ? 1 : 0;
		el2 = b === true || b === "true" || b === "True" || b === 1 ? 1 : 0;

		return el1 - el2
	},
	alphanum:function(as, bs) {
		var a, b, a1, b1, i= 0, L, rx=  /(\d+)|(\D+)/g, rd=  /\d/;

		if(isFinite(as) && isFinite(bs)) return as - bs;
		a= String(as).toLowerCase();
		b= String(bs).toLowerCase();
		if(a=== b) return 0;
		if(!(rd.test(a) && rd.test(b))) return a> b? 1: -1;
		a= a.match(rx);
		b= b.match(rx);
		L= a.length> b.length? b.length: a.length;
		while(i < L){
			a1= a[i];
			b1= b[i++];
			if(a1!== b1){
				if(isFinite(a1) && isFinite(b1)){
					if(a1.charAt(0)=== "0") a1= "." + a1;
					if(b1.charAt(0)=== "0") b1= "." + b1;
					return a1 - b1;
				}
				else return a1> b1? 1: -1;
			}
		}
		return a.length > b.length;
	},
},


//custom data formatters
formatters:{
	plaintext:function(value, data, cell, row, options){ //plain text value
		return value;
	},
	money:function(value, data, cell, row, options){
		var number =  parseFloat(value).toFixed(2);

		var number = number.split('.');

		var integer = number[0];
		var decimal = number.length > 1 ? '.' + number[1] : '';

		var rgx = /(\d+)(\d{3})/;

		while (rgx.test(integer)) {

			integer = integer.replace(rgx, '$1' + ',' + '$2');

		}

		return integer + decimal;
	},
	email:function(value, data, cell, row, options){
		return "<a href='mailto:" + value + "'>" + value + "</a>";
	},
	link:function(value, data, cell, row, options){
		return "<a href='" + value + "'>" + value + "</a>";
	},
	tick:function(value, data, cell, row, options){
		var tick = '<svg enable-background="new 0 0 24 24" height="' + options.textSize + '" width="' + options.textSize + '"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';

		if(value === true || value === 'true' || value === 'True' || value === 1){
			return tick;
		}
	},
	tickCross:function(value, data, cell, row, options){
		var tick = '<svg enable-background="new 0 0 24 24" height="' + options.textSize + '" width="' + options.textSize + '"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';
		var cross = '<svg enable-background="new 0 0 24 24" height="' + options.textSize + '" width="' + options.textSize + '"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';

		if(value === true || value === 'true' || value === 'True' || value === 1){
			return tick;
		}else{
			return cross;
		}
	},
	qjStatus:function(value, data, cell, row, options){
		var dfk = '<svg t="1495981672655" class="icon" style="" viewBox="0 0 1150 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17436" xmlns:xlink="http://www.w3.org/1999/xlink" width="26.953125" height="24"><defs><style type="text/css"></style></defs><path d="M860.258883 435.489345c-159.931878 0.146077-289.468496 129.929902-289.311182 289.906727s129.952376 289.423549 289.839307 289.266235 289.322419-129.772589 289.311181-289.614573-129.840009-289.637046-289.839306-289.558389z m142.706024 459.356085c-22.47339 2.528256-267.905278 6.236366-288.974081 2.090025 0.685438-24.889279-3.371008-136.90789 73.701482-184.60766a180.775946 180.775946 0 0 1-73.701482-165.651355c12.585098 0.224734 264.264589-3.573269 288.26617 0 2.82041 17.248327-3.865423 115.569406-79.780534 165.055811 73.038516 45.913135 84.185318 150.695314 80.454735 183.101942z" p-id="17437" fill="#efb336"></path><path d="M894.339778 727.744541c0-10.562493 0.595545-31.260485 0.595545-31.260485a116.659366 116.659366 0 0 0 75.409459-117.884166c-62.869308 0.449468-187.192099-0.247207-224.217008 0-0.483178 17.248327 1.797871 91.017228 70.173159 118.771865v30.339076c-32.586415 15.540349-66.2965 52.632679-70.173159 137.413541 53.497904-1.123669 224.217009-1.39335 224.217008 0 0.764095-29.327774-14.731307-117.15378-76.005004-137.379831z m-116.951519 102.253923a93.129727 93.129727 0 0 1 46.890727-70.791178c16.765149-9.28151 21.068803-22.754307 21.068803-48.081817a44.553495 44.553495 0 0 0-14.832437-41.575771 96.635576 96.635576 0 0 1-38.272183-36.294524 301.79515 301.79515 0 0 1 126.424054 0 88.769889 88.769889 0 0 1-36.204631 34.519126c-8.079184 5.416087-17.225853 13.42785-17.225853 43.373642a50.059475 50.059475 0 0 0 30.339076 53.700165 96.107451 96.107451 0 0 1 37.36201 65.442511 925.251926 925.251926 0 0 1-155.549566-0.292154z" p-id="17438" fill="#efb336"></path><path d="M205.002261 352.180489a39.688006 39.688006 0 0 0 31.530165 46.430023h461.895578a26.001712 26.001712 0 0 0 7.787029-1.910238c2.75299-1.269747 5.37114-2.730517 8.146604-3.910369a40.452101 40.452101 0 0 0 16.315681-33.14825 36.204631 36.204631 0 0 0-32.238077-38.980095H236.532426a39.688006 39.688006 0 0 0-31.530165 31.518929z" p-id="17439" fill="#efb336"></path><path d="M585.454274 946.039811H161.280281a81.432327 81.432327 0 0 1-78.791704-83.275145V223.216943a78.724284 78.724284 0 0 1 35.811346-62.004082 72.971096 72.971096 0 0 1 35.811347-10.629914h55.498035v-0.089893c21.507034-10.629913 14.338023-31.900977 14.248129-49.643718v-0.393284a31.85603 31.85603 0 0 0-32.238077-31.462746h-55.520509a138.525974 138.525974 0 0 0-64.453682 17.720268 135.81793 135.81793 0 0 0-71.633929 116.861626V878.709536a144.807286 144.807286 0 0 0 143.335279 145.290464h536.765675a354.090728 354.090728 0 0 1-94.657917-77.960189zM347.382421 67.307802h69.836058v46.070449h-49.553824a32.327971 32.327971 0 0 0-30.990804 33.631427 33.451641 33.451641 0 0 0 32.215604 33.653902h196.394952a32.361681 32.361681 0 0 0 31.035751-33.631428A33.474114 33.474114 0 0 0 564.082081 113.378251h-48.317788v-46.070449h71.633929l0.089894-0.089894h1.022539a32.350444 32.350444 0 0 0 31.125645-33.541534A33.474114 33.474114 0 0 0 587.398222 0.022473H346.123911a32.327971 32.327971 0 0 0-30.979568 33.631428 34.766334 34.766334 0 0 0 32.238078 33.653901zM723.575727 150.616658h55.430616a95.208515 95.208515 0 0 1 35.811346 10.629913 70.532733 70.532733 0 0 1 35.811346 61.970372v141.099177c0.887699 0 1.752924-0.13484 2.640624-0.134841a352.674904 352.674904 0 0 1 79.870427 9.506244V198.496214a144.099375 144.099375 0 0 0-12.540152-49.598771 125.761089 125.761089 0 0 0-59.161198-62.004082 161.561198 161.561198 0 0 0-64.464918-17.720268h-55.880084a31.85603 31.85603 0 0 0-31.85603 31.85603c0 17.686558-1.775398 44.261341 14.338023 49.587535z" p-id="17440" fill="#efb336"></path><path d="M502.707253 678.527817H236.487479a39.688006 39.688006 0 0 0 0 77.960189h266.377088a336.763744 336.763744 0 0 1-0.157314-77.960189zM236.487479 501.35885v-0.089894a39.688006 39.688006 0 0 0 0 78.050083h292.041699a352.045649 352.045649 0 0 1 46.070449-77.948952z" p-id="17441" fill="#efb336"></path></svg>';
		var dcl = '<svg t="1495981163882" class="icon" style="" viewBox="0 0 2328 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2402" xmlns:xlink="http://www.w3.org/1999/xlink" width="54.5625" height="24"><defs><style type="text/css"></style></defs><path d="M1163.636364 325.818182l69.818182 0 0 69.818182-69.818182 0 0-69.818182Z" p-id="2403" fill="#ff5500"></path><path d="M1303.272727 442.181818l69.818182 0 0 46.545455-69.818182 0 0-46.545455Z" p-id="2404" fill="#ff5500"></path><path d="M1303.272727 325.818182l69.818182 0 0 69.818182-69.818182 0 0-69.818182Z" p-id="2405" fill="#ff5500"></path><path d="M466.548364 395.636364c-1.466182 23.272727-4.375273 15.476364-8.727273 22.737455 10.170182 65.442909 27.624727 117.736727 52.363636 159.906909C539.252364 533.201455 558.173091 488.727273 566.900364 395.636364L466.548364 395.636364z" p-id="2406" fill="#ff5500"></path><path d="M1163.636364 442.181818l69.818182 0 0 46.545455-69.818182 0 0-46.545455Z" p-id="2407" fill="#ff5500"></path><path d="M1559.272727 418.909091l139.636364 0 0 116.363636-139.636364 0 0-116.363636Z" p-id="2408" fill="#ff5500"></path><path d="M1768.727273 418.909091l139.636364 0 0 116.363636-139.636364 0 0-116.363636Z" p-id="2409" fill="#ff5500"></path><path d="M2115.700364 0 211.572364 0C94.72 0 0 104.192 0 232.727273l0 558.545455c0 128.512 94.72 232.727273 211.572364 232.727273l1904.128 0C2232.552727 1024 2327.272727 919.784727 2327.272727 791.272727L2327.272727 232.727273C2327.272727 104.192 2232.552727 0 2115.700364 0zM674.909091 256l69.818182 0 0 154.554182 16.919273-17.454545c43.636364 34.909091 84.829091 69.818182 124.090182 104.727273l-43.776 43.636364c-10.193455-10.170182-25.693091-26.181818-47.522909-47.988364S744.727273 455.656727 744.727273 445.463273L744.727273 674.909091l-69.818182 0L674.909091 256zM874.542545 753.082182c-81.477818 1.442909-144.011636-0.744727-187.624727-6.539636-71.284364-4.375273-129.466182-27.648-174.545455-69.818182-20.386909 21.829818-59.648 54.551273-117.806545 98.187636-4.375273-5.818182-10.193455-13.079273-17.454545-21.829818-8.727273-11.659636-15.266909-20.386909-19.642182-26.181818 47.988364-30.533818 87.272727-63.278545 117.806545-98.187636-24.738909-37.818182-42.193455-81.454545-52.363636-130.909091-2.932364 4.375273-7.284364 11.659636-13.079273 21.829818-13.079273 24.738909-23.994182 42.914909-32.721455 54.551273-7.284364-21.829818-15.266909-42.891636-23.994182-63.278545 45.079273-74.193455 77.800727-160 98.187636-257.442909l58.903273 8.727273c-2.932364 8.727273-6.539636 20.922182-10.914909 36.910545-5.818182 23.272727-10.193455 49.989818-13.079273 49.989818L628.363636 349.090909l0 52.736c-23.272727 96-39.121455 172.357818-79.825455 229.096727 34.909091 37.841455 82.269091 58.903273 143.36 63.278545 64 7.284364 130.583273 8.727273 200.401455 4.375273C886.481455 714.542545 880.337455 732.695273 874.542545 753.082182zM924.695273 721.477818l-11.357091-53.573818 63.464727-10.914909L977.454545 512l-46.545455 0 0-46.545455 46.545455 0 0-116.363636-46.545455 0 0-69.818182 162.909091 0 0 69.818182-46.545455 0 0 116.363636 46.545455 0 0 46.545455-46.545455 0-0.651636 136.261818 51.083636-13.079273c0 20.386909-1.442909 38.306909 0 55.761455-7.284364 1.442909-20.317091 3.630545-36.328727 6.539636C1004.660364 706.210909 958.138182 714.193455 924.695273 721.477818zM1442.909091 744.727273 1070.545455 744.727273l0-46.545455 162.909091 0 0-46.545455-116.363636 0 0-46.545455 116.363636 0 0-69.818182-116.363636 0L1117.090909 279.272727l302.545455 0 0 256-116.363636 0 0 69.818182 116.363636 0 0 46.545455-116.363636 0 0 46.545455 139.636364 0L1442.909091 744.727273zM1978.181818 628.363636l-69.818182 0 0-23.272727-139.636364 0 0 162.909091-69.818182 0 0-162.909091-139.636364 0 0 23.272727-46.545455 0L1512.727273 349.090909l186.181818 0 0-93.090909 69.818182 0 0 93.090909 209.454545 0L1978.181818 628.363636z" p-id="2410" fill="#ff5500"></path></svg>';
		var ycl = '<svg t="1495507014742" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4788" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24"><defs><style type="text/css"></style></defs><path d="M947.874 607.015c-10.195-20.301-20.311-40.675-31.445-60.462-12.929-22.977-13.425-45.18-0.43-68.31 11.122-19.796 21.225-40.174 31.519-60.426 19.573-38.509 10.209-67.041-28.564-86.872-20.793-10.634-41.617-21.236-62.73-31.205-22.621-10.682-34.486-28.182-37.576-52.848-3.062-24.46-6.79-48.87-11.238-73.116-6.8-37.073-31.385-54.434-68.479-48.903-24.385 3.637-48.813 7.201-72.983 12.012-23.878 4.75-43.427-1.542-60.126-18.859-16.231-16.828-32.678-33.456-49.285-49.916-31.433-31.155-57.989-31.286-89.128-0.404-17.063 16.922-33.794 34.178-50.638 51.318-16.301 16.587-35.511 22.457-58.602 17.943-24.823-4.852-49.854-8.756-74.898-12.353-35.777-5.138-60.483 12.797-66.934 48.658-4.364 24.264-8.43 48.627-11.358 73.097-3.059 25.553-15.442 43.192-38.838 54.038-21.769 10.091-43.232 20.9-64.433 32.145-35.361 18.758-44.519 47.292-26.819 83.048 11.23 22.684 22.982 45.111 34.816 67.489 10.212 19.311 10.294 38.332 0.13 57.663a4744.617 4744.617 0 0 0-33.92 65.761c-19.319 38.185-10.553 65.996 27.244 85.644 21.872 11.371 43.954 22.355 66.16 33.061 21.205 10.223 32.209 27.062 35.399 50.062 3.656 26.352 7.478 52.707 12.251 78.874 5.837 32.004 32.015 50.378 63.705 45.497 25.651-3.951 51.358-7.693 76.825-12.639 23.807-4.624 43.432 1.348 60.154 18.794 16.177 16.878 32.731 33.403 49.332 49.868 31.616 31.357 57.632 31.538 88.971 0.564 17.092-16.892 33.969-34.004 50.739-51.215 16.309-16.738 35.506-22.341 58.565-17.995 28.025 5.281 56.292 9.289 79.062 12.975 37.454-0.268 56.9-15.984 62.473-47.214 4.559-25.55 8.592-51.215 12.017-76.94 3.178-23.86 14.654-40.909 36.634-51.298 21.698-10.253 43.123-21.104 64.443-32.131 38.101-19.705 47.116-47.309 27.985-85.405z" fill="#26A97B" p-id="4789"></path><path d="M428.221 733.771l-168.202-170.012 77.179-77.984 91.023 92.015 237.621-239.557 77.235 77.99z" fill="#FFFFFF" p-id="4790"></path></svg>'
		if(value === 0){
			return dfk;
		}else if(value === 1){
			return dcl;
		}else if(value === 2){
			return ycl;
		}
	},
	button:function(value, data, cell, row, options){
		if(value === true || value === 'true' || value === 'True' || value === 1){
			return tick;
		}else{
			return cross;
		}
	},
	star:function(value, data, cell, row, options){
		var maxStars = 5;
		var stars=$("<span></span>");

		value = parseInt(value) < maxStars ? parseInt(value) : maxStars;

		var starActive = $('<svg width="' + options.textSize + '" height="' + options.textSize + '" viewBox="0 0 512 512" xml:space="preserve" style="margin:0 1px;"><polygon fill="#FFEA00" stroke="#C1AB60" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>');
		var starInactive = $('<svg width="' + options.textSize + '" height="' + options.textSize + '" viewBox="0 0 512 512" xml:space="preserve" style="margin:0 1px;"><polygon fill="#D2D2D2" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>');

		for(i=1;i<= maxStars;i++){

			var nextStar = i <= value ? starActive : starInactive;

			stars.append(nextStar.clone());
		}

		cell.css({
			"white-space": "nowrap",
			"overflow": "hidden",
			"text-overflow": "ellipsis",
		})

		return stars.html();
	},
	qjselect:function(value, data, cell, row, options){ 

		cell.css({
			"min-width":"30px",
		});
		if (value == '签订成功') {
			return "签订成功";
		} else if (value == '未付款') {
			return "<select id=qjselect"+data['orderid']+"> <option value='未付款' selected='selected'>未付款</option><option value='已付款'>已付款</option> <option value='签订成功'>签订成功</option><option value='签订失败'>签订失败</option></select>"
		} else if (value == '已付款') {
			return "<select id=qjselect"+data['orderid']+"> <option value='未付款'>未付款</option><option value='已付款' selected='selected'>已付款</option> <option value='签订成功'>签订成功</option><option value='签订失败'>签订失败</option></select>"
		} else if (value == '签订失败') {
			return "<select id=qjselect"+data['orderid']+"> <option value='未付款'>未付款</option><option value='已付款'>已付款</option> <option value='签订成功'>签订成功</option><option value='签订失败' selected='selected'>签订失败</option></select>"
		}
		return "<select id=qjselect"+data['orderid']+"> <option value='未付款'>未付款</option><option value='已付款'>已付款</option> <option value='签订成功'>签订成功</option><option value='签订失败'>签订失败</option></select>"
	},
	progress:function(value, data, cell, row, options){ //progress bar
		value = parseFloat(value) <= 100 ? parseFloat(value) : 100;

		cell.css({
			"min-width":"30px",
		});

		return "<div style='margin-top:3px; height:10px; width:" + value + "%; background-color:#2DC214; '></div>"
	},
},

//deconstructor
destroy: function() {

},

});