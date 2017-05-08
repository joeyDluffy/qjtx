function flushdata() 
	{ 
		showLoader();
		$.ajax
	    (
	        {
	        	type:"GET",
				async: false,
				url:'qjOrdersData?saledaySelect='+selectDate,

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
		ajaxURL:'qjOrdersData?saledaySelect='+selectDate,
		fitColumns:true,
		columns:[
		
		{title:"订单序号", field:"orderid", sorter:"int"},
		{title:"客户姓名", field:"cname", sorter:"string",width:"60px"},
		{title:"客户手机", field:"mobile", sorter:"string",width:"100px"},
		{title:"选择套餐内容", field:"package_details", sorter:"string",width:"200px"},
		{title:"身份证号", field:"id_number", sorter:"string"},
		{title:"淘宝订单号", field:"tb_orderid", sorter:"string", editable: true, formatter:function(value, data, cell, row, options){
			if(numCheck(value)){
				return value;
			} else {
				cell.data("value", '');
				return '';
			}
		},width:"100px"},
		{title:"签订状态", field:"tb_orderid", sorter:"string", editable: true, formatter:function(value, data, cell, row, options){
			if(numCheck(value)){
				return value;
			} else {
				cell.data("value", '');
				return '';
			}
		},width:"100px"},
		{title:"处理订单", field:"reviewed", align:"center", formatter:"tickCross",editable:true, 
			onClick:function(e, cell, val, row)
			{

				if(val != 1)
					{
						var orderid = row['orderid'];
						var tb_orderid = row['tb_orderid'];
						if (cid !=null && cid !="") {
							var mymessage=confirm("确认提交审核？");  
						    if(mymessage==true)  
						    {   
						    	var submitData={
						    			orderid:orderid,
						    			tb_orderid:tb_orderid,
										qty:qty,
										reviewopid:reviewopid
									    }; 
								$.ajax
							    (
							        {
							        	type:"GET",
										async: false,
										url:'qjoperateOrders',
							            dataType: "json",
							            data:submitData,
							            success: function (data)  
							            {		            	

							            	$("#qbvk-table").tabulator("setData");
							            }
							    
							        }
							    );

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
		{title:"身份凭证", field:"id_images", sorter:"string", formatter:function(value, data, cell, row, options){
			if (value) 
				{
					var imgfileS = value.split(";");
					var display="";
					for(var i=0;i<imgfileS.length-1;i++){
						display = display+"<a class='example-image-link' data-lightbox='example' href='/saleImageFiles/" + imgfileS[i] + "' >点击查看身份凭证"+(i+1)+";</a>" +"</br>"
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