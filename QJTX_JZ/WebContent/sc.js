$(document).ready(function(){
//	$("#saleday").text('日期：' + new Date().Format("yyyy-MM-dd"));
	
	//套餐初始化
	$("select[name='servicetype']").val("select");
	$("select[name='packagename']")[0].selectedIndex = -1;
	$("select[name='contractperiod']")[0].selectedIndex = -1;
	$("select[name='fee']")[0].selectedIndex = -1;
	$(function(){  
        var packagename1 = ["请选择..", "4G签约赠话费", "资费签约"];
        var packagename1a = [ "请选择..","58元", "88元", "108元", "128元", "158元", "188元", "228元", "288元"];     
        var packagename1b = [ "请选择..","58元", "88元", "108元", "138元", "158元"];
        var packagename1aa = ["18个月"];     
        var packagename1bb = ["12个月"];
        var packagename2 = ["请选择..","裸宽", "个人承诺消费送宽带", "家庭承诺消费送宽带"];  
        var packagename2a = ["请选择..","20M", "50M", "100M", "200M"];     
        var packagename2b = [ "请选择..","78元", "108元", "128元", "158元", "188元"];
        var packagename2c = [ "请选择..","108元", "188元", "268元", "288元"];
        var packagename2aa = ["请选择..","1年期", "2年期"];     
        var packagename2bb = ["12个月"];
        $("select[name='packagename']").change(function() {  
        	$("select[name='fee']").empty();
            $("select[name='contractperiod']").empty(); 
            var selected_value = $(this).val(); 
            if(selected_value == '4G签约赠话费'){
            	
                //循环添加  
                for(var i = 0; i < packagename1a.length; i++) {  
                    var option = $("<option>").val(packagename1a[i]).text(packagename1a[i]);  
                    $("select[name='fee']").append(option);  
                }  
                for(var i = 0; i < packagename1aa.length; i++) {  
                    var option = $("<option>").val(packagename1aa[i]).text(packagename1aa[i]);  
                    $("select[name='contractperiod']").append(option);  
                }
            } else if(selected_value == "资费签约"){  
            	for(var i = 0; i < packagename1b.length; i++) {  
                    var option = $("<option>").val(packagename1b[i]).text(packagename1b[i]);  
                    $("select[name='fee']").append(option);  
                }  
                for(var i = 0; i < packagename1bb.length; i++) {  
                    var option = $("<option>").val(packagename1bb[i]).text(packagename1bb[i]);  
                    $("select[name='contractperiod']").append(option);  
                } 
            } else if(selected_value == "裸宽"){  
            	for(var i = 0; i < packagename2a.length; i++) {  
                    var option = $("<option>").val(packagename2a[i]).text(packagename2a[i]);  
                    $("select[name='fee']").append(option);  
                }  
                for(var i = 0; i < packagename2aa.length; i++) {  
                    var option = $("<option>").val(packagename2aa[i]).text(packagename2aa		[i]);  
                    $("select[name='contractperiod']").append(option);  
                } 
            } else if(selected_value == "个人承诺消费送宽带"){  
            	for(var i = 0; i < packagename2b.length; i++) {  
                    var option = $("<option>").val(packagename2b[i]).text(packagename2b[i]);  
                    $("select[name='fee']").append(option);  
                }  
                for(var i = 0; i < packagename2bb.length; i++) {  
                    var option = $("<option>").val(packagename2bb[i]).text(packagename2bb[i]);  
                    $("select[name='contractperiod']").append(option);  
                } 
            } else if(selected_value == "家庭承诺消费送宽带"){  
            	for(var i = 0; i < packagename2c.length; i++) {  
                    var option = $("<option>").val(packagename2c[i]).text(packagename2c[i]);  
                    $("select[name='fee']").append(option);  
                }  
                for(var i = 0; i < packagename2bb.length; i++) {  
                    var option = $("<option>").val(packagename2bb[i]).text(packagename2bb[i]);  
                    $("select[name='contractperiod']").append(option);  
                } 
            }
            $("select[name='contractperiod']").selectmenu("refresh");
            $("select[name='fee']").selectmenu("refresh");
//            $("select[name='fee']")[0].selectedIndex = -1;
//            $("select[name='contractperiod']")[0].selectedIndex = -1;
//            alert($("select[name='packagename']").val());
        });  
        $("select[name='servicetype']").change(function() {  
            //被选中的option  
            var selected_value = $(this).val();  
            $("select[name='packagename']").empty();  
            $("select[name='fee']").empty();
            $("select[name='contractperiod']").empty();  
            if(selected_value == "终端活动"){  
            	for(var i = 0; i < packagename1.length; i++) {  
                    var option = $("<option>").val(packagename1[i]).text(packagename1[i]);  
                    $("select[name='packagename']").append(option);  
                } 
                  
            } else if(selected_value == "移动宽带"){ 
            	for(var i = 0; i < packagename2.length; i++) {  
                    var option = $("<option>").val(packagename2[i]).text(packagename2[i]);  
                    $("select[name='packagename']").append(option);  
                } 
                  
            }
            $("select[name='packagename']").selectmenu("refresh");
            $("select[name='contractperiod']").selectmenu("refresh");
            $("select[name='fee']").selectmenu("refresh");
            
//        	$("select[name='packagename']")[0].selectedIndex = 0;
//        	alert($("select[name='packagename']").val());
        });  
                          
    });  
	
	
		
	pdatalist = new Array();
	//url参数获取 token
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
					url:'saveSalesData',
		            dataType: "json",
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
