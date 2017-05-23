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
		
		{title:"订单", field:"orderid", sorter:"string",width:"60px"},
		{title:"客户名", field:"cname", sorter:"string",width:"80px"},
		{title:"套餐手机", field:"mobile", sorter:"string",width:"100px"},
		{title:"联系电话", field:"tel", sorter:"string",width:"100px"},
		{title:"选择套餐内容", field:"package_details", sorter:"string"},
		{title:"身份证号", field:"id_number", sorter:"string",width:"170px"},
		{title:"淘宝订单号", field:"tb_orderid", sorter:"string", editable: true, formatter:function(value, data, cell, row, options){
			if(numCheck(value)){
				return value;
			} else {
				cell.data("value", '');
				return '';
			}
		},width:"120px"},
		{title:"签订状态", field:"operatestatus", sorter:"string", editable: true, formatter:function(value, data, cell, row, options){
			return value;
		},width:"100px"},
		{title:"处理订单", field:"opstatus_value", align:"center", formatter:"qjStatus",editable:true, 
			onClick:function(e, cell, val, row)
			{

				if(val != 2)
					{
						var orderid = row['orderid'];
						var tborderid = row['tb_orderid'];
						var operatestatus = row['operatestatus'];
						if (orderid !=null && orderid !="") {
							var mymessage=confirm("确认更新订单状态？");  
						    if(mymessage==true)  
						    {   
						    	var submitData={
						    			orderid:orderid,
						    			tborderid:tborderid,
						    			reviewopid:reviewopid,
										operatestatus:operatestatus
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
						display = display+"<a class='example-image-link' data-lightbox='example' href='/jzimg/" + imgfileS[i] + "' >点击查看身份凭证"+(i+1)+";</a>" +"</br>"
					}
//					imgfileS.forEach(function(e){  
//						display = display+"<a href='/vk002/saleImageFiles/" + e + "' target='_blank'>点击查看</a>" +"</br>" 
//					})  
				return display;
				} else {
					return "无"
				}
			
		}}
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
//		$("#saleday").attr('value',selectDate);
		document.querySelector('#saleday').addEventListener('change', function () {
			selectDate = $("#saleday").val();
//			$("#qbvk-table").remove();
//			refreshTable();
			$("#qbvk-table").tabulator("setAjaxurl",'qjOrdersData?saledaySelect='+selectDate);
			$("#qbvk-table").tabulator("setData");
		});


	}
	
});

function filterData() {

//	if($("#isSubmit")[0].checked && !$("#isReview")[0].checked) {
//		$("#qbvk-table").tabulator("setFilter", "saletotal", "=", null);
//		$("#isReview")[0].checked = false;
//	} 
//
//	if(!$("#isReview")[0].checked && !$("#isSubmit")[0].checked) {
//		$("#qbvk-table").tabulator("clearFilter");
//	} 
//	if($("#isReview")[0].checked && !$("#isSubmit")[0].checked) {
//		$("#qbvk-table").tabulator("setFilter", "saletotal", "!=", null);
//		$("#qbvk-table").tabulator("setFilter", "reviewed", "=", 0);
//	} 
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