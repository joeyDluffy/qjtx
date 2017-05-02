$(document).ready(function(){
	$("#saleday").text('日期：' + new Date().Format("yyyy-MM-dd"));
	pdatalist = new Array();
	var ref = '';  
	if (document.referrer.length > 0) {  

	ref = document.referrer;  
			alert(ref);
	}

	try {  if (ref.length == 0 && opener.location.href.length > 0) {  

	ref = opener.location.href;  
	 		alert(ref);
	}  

	 } catch (e) {}
	document.querySelector('#saleImg1').addEventListener('change', function () {
	    // this.files[0] 是用户选择的文件
		showLoader();
		for (var i = 0; i < this.files.length; i++){
		    lrz(this.files[i], {width: 800})
	        .then(function (rst) {
	            var img = new Image();
	            img.src = rst.base64;
	            img.width = 200;
	            img.onload = function () {
	            	
	            	document.querySelector('#imageshow').appendChild(img);
	            };
	        	pdatalist.push(encodeURI(encodeURI(rst.base64)));
	        	hideLoader();
	        })
	        .catch(function (err) {
	            // 万一出错了，这里可以捕捉到错误信息
	            // 而且以上的then都不会执行
	            alert(err);
		    	$("#saleImg1").attr("value","");
		    	hideLoader();
	        })
	        .always(function () {
	            // 不管是成功失败，这里都会执行
	        	hideLoader();
	        });
		}

	});

	$("#clear").bind(
			"click", function() {
				pdatalist.shift();
				document.querySelector('#imageshow img').remove();
				$("#saleImg1").attr('value','');
			});
	//提交
	$("#salesubmit").bind(
		"click", function() {
			if (saleid == "") 
			{	
				alert("无商铺信息！"); 
				return;
			}
			if ($("#saleid").val() == "" || $("#saleid").val()!=saleid.substring(1) ) 
			{	
				alert("无效商铺验证码！"); 
				return;
			}
			var saleday = $("#saleday").val();
			if (saleday == "") 
			{	
				alert("日期为空！"); 
				return;
			}
			var total = $("#total").val();
			if (total == "") 
			{	
				alert("销售额数据为空！"); 
				return;
			}
			if (!doubleCheck(total)) 
			{	
				alert("销售额请填写数字！"); 
				$("#total").val("");
				return;
			}
			var qty = $("#qty").val();
			if (!numCheck(qty)) 
			{	
				alert("成交笔数请填写整数！"); 
				$("#qty").val("");
				return;
			}
			var imgvalue = $("#saleImg1").attr("value");
		    if(imgvalue == null || imgvalue==""){
		    	alert("请上传营业额凭据！"); 
				return;
		    }
		    if (pdatalist ==null || pdatalist.length<1){
				return;
		    }

			showLoader();
//			alert("bingo");
			var submitData={
					saleid:saleid,
					imageList:pdatalist,
//					saleImage1Base64:encodeURI(encodeURI(pdata1.base64)),
//					saleImage2Base64:i2base,
//					saleImage3Base64:i3base,
//					saleImage4Base64:i4base,
					total:total,
					qty:qty,
					saleday:saleday
				    }; 
    		var jsondata = {"salesData":{"saleid":saleid, "total":total, "qty":qty,"imageList":pdatalist, "saleday":saleday}};
			$.ajax
		    (
		        {
		        	type:"POST",
					async: true,
//		            url:'saveSalesData'+encodeURI(encodeURI(saleid))
//					+"&total="+encodeURI(encodeURI(total))+"&qty="+encodeURI(encodeURI(qty))
//					+"&saleday="+encodeURI(encodeURI(saleday))
					url:'saveSalesData',
//		            fileElementId:'saleImg',
		            dataType: "json",
//		            data:submitData,
		            data:JSON.stringify(jsondata),
		            contentType:"application/json",
		            success: function (data)  
		            {		            	
		            	$("#total").val("");
						$("#qty").val("");
						$("#saleday").attr('value',new Date().Format("yyyy-MM-dd"));
						var div = document.getElementById("imageshow");
					    while(div.hasChildNodes()) //当div下还存在子节点时 循环继续
					    {
					        div.removeChild(div.firstChild);
					    }
//						document.querySelector('#imageshow img').remove();
						hideLoader();
						alert('提交成功！');
						$("#saleImg1").attr('value','');
						pdatalist = new Array();
		            }
		    });
		});
}); 







function emailCheck(cmail) {    
    var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;  
    if (!pattern.test(cmail)) {  
        return false;  
    }  
    return true;  
}  
function doubleCheck(total) {    
    var pattern = /^-?\d+\.?\d*$/;  
    if (!pattern.test(total)) {  
        return false;  
    }  
    return true;  
} 
function numCheck(total) {    
    var pattern = /^-?\d+$/;  
    if (!pattern.test(total)) {  
        return false;  
    }  
    return true;  
} 

//对Date的扩展，将 Date 转化为指定格式的String   
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
//例子：   
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt)   
{ //author: meizz   
var o = {   
 "M+" : this.getMonth()+1,                 //月份   
 "d+" : this.getDate(),                    //日   
 "h+" : this.getHours(),                   //小时   
 "m+" : this.getMinutes(),                 //分   
 "s+" : this.getSeconds(),                 //秒   
 "q+" : Math.floor((this.getMonth()+3)/3), //季度   
 "S"  : this.getMilliseconds()             //毫秒   
};   
if(/(y+)/.test(fmt))   
 fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
for(var k in o)   
 if(new RegExp("("+ k +")").test(fmt))   
fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
return fmt;   
} 
function showLoader() {  
    //显示加载器.for jQuery Mobile 1.2.0  
    $.mobile.loading('show', {  
        text: '提交中...', //加载器中显	示的文字  
        textVisible: true, //是否显示文字  
        theme: 'a',        //加载器主题样式a-e  
        textonly: false,   //是否只显示文字  
        html: ""           //要显示的html内容，如图片等  
    });  
}
//隐藏加载器.for jQuery Mobile 1.2.0  
function hideLoader()  
{  
    //隐藏加载器  
    $.mobile.loading('hide');  
} 
