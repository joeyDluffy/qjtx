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
		var dfk = '<svg t="1495506996872" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4060" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24"><defs><style type="text/css"></style></defs><path d="M934.8096 627.541333c-47.991467 200.704-228.1472 350.139733-443.562667 350.139733-252.142933 0-456.533333-204.424533-456.533333-456.567467S239.104 64.546133 491.246933 64.546133c151.8592 0 285.969067 74.410667 368.9472 188.484267l33.28-19.319467c-88.951467-125.44-234.8032-207.633067-400.2816-207.633067-271.325867 0-491.178667 219.886933-491.178667 491.178667s219.886933 491.178667 491.178667 491.178667c233.233067 0 428.1344-162.816 478.208-380.8256L934.8096 627.541333 934.8096 627.541333z" p-id="4061" fill="#efb336"></path><path d="M683.008 542.856533l0-38.877867-169.096533 1.9456 186.5728-213.742933-34.9184-19.456-176.878933 194.321067L306.005333 272.759467 272.964267 290.235733l192.4096 213.742933-171.008 0 0 38.877867 174.8992 0 0 77.687467L294.331733 620.544l0 38.912 174.8992 0 0 135.9872 38.877867 0L508.1088 659.456l174.8992 0 0-38.912-174.8992 0 0-77.687467L683.008 542.856533z" p-id="4062" fill="#efb336"></path><path d="M972.219733 598.459733c-5.2224-13.2096-13.824-7.509333-13.824-7.509333l-44.2368 30.208 0.068267-0.034133-66.833067 44.100267c-3.515733 2.184533-1.604267 10.8544 3.8912 19.3536 5.632 8.4992 12.834133 13.585067 16.2816 11.3664l82.295467-54.203733 34.065067 85.0944c1.4336 3.6864 10.3424 3.652267 19.7632-0.1024s15.872-9.864533 14.370133-13.550933L972.219733 598.459733z" p-id="4063" fill="#efb336"></path></svg>';
		var dcl = '<svg t="1495506977751" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3121" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24"><defs><style type="text/css"></style></defs><path d="M877.568 346.931c3.482 7.373 10.854 11.674 18.637 11.674 2.867 0 5.939-0.615 8.806-2.048a20.589 20.589 0 0 0 9.83-27.239c-2.662-5.53-5.324-11.059-8.191-16.384-5.325-10.035-17.613-13.926-27.648-8.601-10.036 5.325-13.927 17.613-8.602 27.648a496.214 496.214 0 0 0 7.168 14.95zM903.578 419.635c2.662 10.65 4.915 21.504 6.553 32.154 1.639 10.035 10.24 17.203 20.275 17.203 1.024 0 2.253 0 3.277-0.205 11.264-1.843 18.637-12.288 16.999-23.552a550.385 550.385 0 0 0-7.373-35.635c-2.663-11.06-13.927-17.613-24.781-14.95-11.06 3.072-17.818 14.13-14.95 24.985zM684.442 879.206a496.695 496.695 0 0 1-30.31 12.698c-10.65 3.891-15.975 15.77-12.084 26.214 3.072 8.192 10.854 13.312 19.251 13.312 2.253 0 4.71-0.41 7.168-1.228 11.264-4.096 22.528-8.807 33.587-13.927 10.24-4.71 14.746-16.998 9.83-27.238-4.914-10.24-17.202-14.541-27.442-9.83zM922.624 624.23c-10.854-3.481-22.323 2.458-25.805 13.312-3.277 10.445-7.168 20.89-11.264 30.925-4.3 10.445 0.615 22.528 11.264 26.624 2.458 1.024 5.12 1.639 7.783 1.639 7.987 0 15.77-4.71 19.046-12.698 4.506-11.06 8.806-22.733 12.288-34.202 3.482-10.65-2.458-22.118-13.312-25.6zM936.346 509.338h-0.615c-11.059 0-20.07 8.806-20.48 19.865-0.41 11.06-1.024 21.914-2.253 32.768-1.228 11.264 6.759 21.3 18.023 22.733 0.819 0 1.638 0.205 2.253 0.205 10.24 0 19.25-7.783 20.275-18.227 1.433-11.879 2.253-24.167 2.662-36.25 0.41-11.469-8.601-20.89-19.865-21.094zM877.978 731.136c-9.421-6.144-22.119-3.686-28.468 5.734-5.939 9.216-12.492 18.023-19.25 26.624-6.964 8.807-5.53 21.71 3.48 28.672 3.687 2.868 8.193 4.301 12.698 4.301 6.144 0 12.084-2.662 16.18-7.782 7.372-9.421 14.54-19.456 21.299-29.491 5.939-9.216 3.481-21.914-5.94-28.058zM776.806 819.405c-8.192 7.168-16.998 13.926-25.804 20.48-9.216 6.758-11.06 19.456-4.506 28.672 4.096 5.53 10.24 8.397 16.589 8.397 4.096 0 8.397-1.23 12.083-3.892 9.83-7.168 19.251-14.745 28.467-22.528 8.602-7.372 9.421-20.275 2.048-28.876-7.373-8.602-20.275-9.626-28.877-2.253zM579.174 911.36c-5.53 0.82-11.059 1.638-16.384 2.253-11.264 1.229-19.25 11.469-18.022 22.733 1.229 10.444 10.035 18.022 20.275 18.022 0.82 0 1.639 0 2.458-0.205 5.939-0.614 12.083-1.433 18.022-2.457 11.264-1.844 18.842-12.288 16.999-23.348-1.639-11.059-12.084-18.841-23.348-16.998zM446.26 910.54v-0.204c-91.342-16.18-174.695-64.102-235.111-135.168-61.03-71.885-94.618-163.635-94.618-258.048 0-220.16 179.2-399.36 399.36-399.36 86.63 0 170.394 28.262 239.002 79.462-23.962 34.816-46.695 67.79-48.333 70.247 16.794-1.024 107.725-6.759 124.723-9.011h0.41c2.867-0.205 5.53-1.23 7.987-2.458 5.734-2.867 8.806-7.782 10.035-13.517 0-0.205 0-0.41 0.205-0.614 1.024-5.735 0.41-12.083-1.638-18.432-11.879-37.274-22.528-74.957-33.792-112.64 0 0-16.18 23.552-36.045 52.429-75.367-55.706-167.322-86.63-262.349-86.63-117.555 0-228.147 45.874-311.296 129.023S75.776 399.36 75.776 516.915c0 104.243 37.069 205.21 104.243 284.467 66.355 78.439 158.515 131.277 259.072 149.095v-0.205c1.229 0.205 2.253 0.41 3.482 0.41 11.059 0 20.275-9.012 20.275-20.276 0.205-10.035-7.168-18.227-16.589-19.865z" p-id="3122" fill="#efb336"></path><path d="M727.245 634.675L502.579 525.312l3.891-251.904h-0.204v-0.205c0-6.758-5.325-12.083-12.084-12.083-6.553 0-12.083 5.325-12.083 11.878h-0.205l-4.096 258.663h0.205c-0.205 0.819-0.41 1.638-0.41 2.457 0 4.301 2.458 7.783 6.145 9.421l232.857 113.05v-0.205h0.205c6.144 2.867 13.312 0.205 16.18-5.94 2.662-5.734 0.204-12.902-5.735-15.769zM706.355 267.674s0-0.205 0 0h-2.457 2.457z" p-id="3123" fill="#efb336"></path></svg>';
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