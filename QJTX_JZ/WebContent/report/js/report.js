function flushdata() 
	{ 
		showLoader();
		$.ajax
	    (
	        {
	        	type:"GET",
				async: false,
	//            url:'saveSalesData'+encodeURI(encodeURI(saleid))
	//			+"&total="+encodeURI(encodeURI(total))+"&qty="+encodeURI(encodeURI(qty))
	//			+"&saleday="+encodeURI(encodeURI(saleday))
				url:'reportSalesDataForOp?saledaySelect='+selectDate,
	//            fileElementId:'saleImg',
	            dataType: "json",
	            success: function (data)  
	            {		            	
	            	reportData=data.resList;
	            	refreshTable();
	            	hideLoader();
	            }
	    });
	} 
function refreshTable() {
	
	$("#qbvk-table").tabulator({
		backgroundColor:"#ccc",
		borderColor:"#333",

		headerBackgroundColor: "#333",
		headerTextColor: "#fff",

		rowBackgroundColor:"#666",
		rowTextColor:"#fff",
		ajaxURL:'reportSalesDataForOp?saledaySelect='+selectDate,
		fitColumns:true,
		columns:[
		
		{title:"商铺名", field:"storename", sorter:"string"},
		{title:"楼层", field:"floor", sorter:"string",width:"60px"},
		{title:"商铺号", field:"productid", sorter:"string",width:"100px"},
		{title:"联系人", field:"contact", sorter:"string",width:"100px"},
		{title:"电话", field:"phone", sorter:"string"},
		{title:"当日销售金额", field:"saletotal", editable: true, formatter:function(value, data, cell, row, options){
			var number =  parseFloat(value).toFixed(2);
			var number = number.split('.');
			var integer = number[0];
			var decimal = number.length > 1 ? '.' + number[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(integer)) {
				integer = integer.replace(rgx, '$1' + ',' + '$2');
			}
			if (integer + decimal == 'NaN') {
				cell.data("value", '');
				return "<span style='color:red; font-weight:bold;'>未提交</span>";
			}
			return "<span style='color:#98FB98; font-weight:bold;'>"+integer + decimal+'元'+"</span>";
		}},
		{title:"销售笔数", field:"qty", sorter:"string", editable: true, formatter:function(value, data, cell, row, options){
			if(numCheck(value)){
				return value;
			} else {
				cell.data("value", '');
				return '';
			}
		},width:"100px"},
		{title:"点击审核", field:"reviewed", align:"center", formatter:"tickCross",editable:true, 
			onClick:function(e, cell, val, row)
			{
//				alert(cell.data("value"));
				if(val != 1)
					{
						var cid = row['cid'];
						var saletotal = row['saletotal'];
						var qty = row['qty'];
						if (cid !=null && cid !="") {
							var mymessage=confirm("确认提交审核？");  
						    if(mymessage==true)  
						    {   
//						    	showLoader();
						    	var submitData={
										cid:cid,
										saletotal:saletotal,
										qty:qty,
										reviewopid:reviewopid
									    }; 
//						    	cell.data("value", 1);
						    	
//						    	$("#qbvk-table").tabulator("setData");
//						    	var rowData = row.data("data");
//						    	rowData[cell.data("field")] = 1;
//						    	cell.html(self._formatCell(cell.data("formatter"), 1, rowData, cell, row))
//						    	.css({"padding":"4px"});
//						    	$("#qbvk-table").tabulator("redraw");
								$.ajax
							    (
							        {
							        	type:"GET",
										async: false,
										url:'reviewSalesData',
							//            fileElementId:'saleImg',
							            dataType: "json",
							            data:submitData,
							            success: function (data)  
							            {		            	
//							            	hideLoader();
//							            	cell.data("value", 1);
//							            	window.location.reload();
//							            	flushdata();
//							            	refreshTable();
							            	$("#qbvk-table").tabulator("setData");
							            }
							    
							        }
							    );
//								hideLoader();
//								cell.data("value", 1);
//								$(window).resize(function(){
//									$("#qbvk-table").tabulator("redraw");
//								});
						    }  
						    else if(mymessage==false)  
						    {  
						    	
						    }
						} else {
							//alert("未提交数据无法审核！");
						}
					}
			}
		,width:"90px",sortable:false},
		{title:"凭证图片", field:"imgfile", sorter:"string", formatter:function(value, data, cell, row, options){
			if (value) 
				{
					var imgfileS = value.split(";");
					var display="";
					for(var i=0;i<imgfileS.length-1;i++){
						display = display+"<a class='example-image-link' data-lightbox='example' href='/vk/saleImageFiles/" + imgfileS[i] + "' >点击查看收银凭证"+(i+1)+";</a>" +"</br>"
					}
//					imgfileS.forEach(function(e){  
//						display = display+"<a href='/vk002/saleImageFiles/" + e + "' target='_blank'>点击查看</a>" +"</br>" 
//					})  
				return display;
				} else {
					return "无"
				}
			
		}},
		{title:"", field:"cid", sorter:"string",padding:"0px",width:"0px",sortable:false}
		],
		rowClick:function(e, id, data, row){
			//alert("Row " + data.id + " Clicked!!!!" + data.value)
		},
		rowContext:function(e, id, data, row){
			//alert("Row " + data.id + " Context Clicked!!!!")
		},
	});
	$("#qbvk-table").tabulator("setData");
//	$("#qbvk-table").tabulator("setData", reportData);
	
	$(window).resize(function(){
		$("#qbvk-table").tabulator("redraw");
	});
	filterData();
}
$(window).load(function(){
//	flushdata();
	if (username != null && username !='') {
		$("#uuuu").text("用户: " + username);
		refreshTable();
		$("#saleday").attr('value',selectDate);
		document.querySelector('#saleday').addEventListener('change', function () {
			selectDate = $("#saleday").val();
//			$("#qbvk-table").remove();
//			refreshTable();
			$("#qbvk-table").tabulator("setAjaxurl",'reportSalesDataForOp?saledaySelect='+selectDate);
			$("#qbvk-table").tabulator("setData");
		});
		document.querySelector('#floorSelect').addEventListener('change', function () {
			floorSelect = $("#floorSelect").val();
			$("#qbvk-table").tabulator("setAjaxurl",'reportSalesDataForOp?saledaySelect='+selectDate+'&floor='+floorSelect);
			$("#qbvk-table").tabulator("setData");
		});
		document.querySelector('#isReview').addEventListener('click', function () {
			filterData();
			if($("#isSubmit")[0].checked && $("#isReview")[0].checked) {
				$("#qbvk-table").tabulator("setFilter", "saletotal", "!=", null);
				$("#qbvk-table").tabulator("setFilter", "reviewed", "=", 0);
				$("#isSubmit")[0].checked = false;
			} 
		});
		document.querySelector('#isSubmit').addEventListener('click', function () {
			filterData();
			if($("#isSubmit")[0].checked && $("#isReview")[0].checked) {
				$("#qbvk-table").tabulator("setFilter", "saletotal", "=", null);
				$("#isReview")[0].checked = false;
			} 
		});
	}
	
});

function filterData() {

	if($("#isSubmit")[0].checked && !$("#isReview")[0].checked) {
		$("#qbvk-table").tabulator("setFilter", "saletotal", "=", null);
		$("#isReview")[0].checked = false;
	} 

	if(!$("#isReview")[0].checked && !$("#isSubmit")[0].checked) {
		$("#qbvk-table").tabulator("clearFilter");
	} 
	if($("#isReview")[0].checked && !$("#isSubmit")[0].checked) {
		$("#qbvk-table").tabulator("setFilter", "saletotal", "!=", null);
		$("#qbvk-table").tabulator("setFilter", "reviewed", "=", 0);
	} 
}
function showLoader() {  
    //显示加载器.for jQuery Mobile 1.2.0  
    $.mobile.loading('show', {  
        text: '数据请求中...', //加载器中显	示的文字  
        textVisible: true, //是否显示文字  
        theme: 'a',        //加载器主题样式a-e  
        textonly: true,   //是否只显示文字  
        html: ""           //要显示的html内容，如图片等  
    });  
}
//隐藏加载器.for jQuery Mobile 1.2.0  
function hideLoader()  
{  
    //隐藏加载器  
    $.mobile.loading('hide');  
}

function numCheck(total) {    
    var pattern = /^-?\d+$/;  
    if (!pattern.test(total)) {  
        return false;  
    }  
    return true;  
} 

function setReviewStatus() {
	
}