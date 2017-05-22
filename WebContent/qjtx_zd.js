$(document).ready(function(){


	$(function(){  
		$("#package").each(function(){
			var i=$(this);
			var p=i.find("ul>li");
			p.click(function(){
				$("#fee1").find("ul>li").siblings("li").removeClass("selected");
				$("#fee2").find("ul>li").siblings("li").removeClass("selected");
				$("#contractperiod1").find("ul>li").removeClass("selected");
				$("#contractperiod2").find("ul>li").removeClass("selected");
				monthly_fee="";
				contract_period="";
				if(!!$(this).hasClass("selected")){
					$(this).removeClass("selected");
					//i.removeAttr("data-attrval");
					service_type="";
				}else{
					$(this).addClass("selected").siblings("li").removeClass("selected");
					//i.attr("data-attrval",$(this).attr("data-aid"))
					if ($(this).attr("data-aid") == "4G签约赠话费") 
					{
						service_type="contractPhone";
						$("#fee1").css('display','');
						$("#contractperiod1").css('display','');
						$("#fee2").css('display','none');
						$("#contractperiod2").css('display','none');
						package_name=$(this).attr("data-aid");
					}
					else if ($(this).attr("data-aid") == "资费签约") 
					{
						service_type="depositFee";
						$("#fee1").css('display','none');
						$("#contractperiod1").css('display','none');
						$("#fee2").css('display','');
						$("#contractperiod2").css('display','');
						package_name=$(this).attr("data-aid");
					}
				}
			})
		});
		$("#fee1").each(function(){
			var i=$(this);
			var p=i.find("ul>li");
			p.click(function(){
				if(!!$(this).hasClass("selected")){
					$(this).removeClass("selected");
					//i.removeAttr("data-attrval");
					monthly_fee="";
				}else{
					$(this).addClass("selected").siblings("li").removeClass("selected");
					//i.attr("data-attrval",$(this).attr("data-aid"))
					monthly_fee=$(this).attr("data-aid");
					
				}
			})
		});
		$("#fee2").each(function(){
			var i=$(this);
			var p=i.find("ul>li");
			p.click(function(){
				if(!!$(this).hasClass("selected")){
					$(this).removeClass("selected");
					//i.removeAttr("data-attrval");
					monthly_fee="";
				}else{
					$(this).addClass("selected").siblings("li").removeClass("selected");
					//i.attr("data-attrval",$(this).attr("data-aid"))
					monthly_fee=$(this).attr("data-aid");
					
				}
			})
		});
		$("#contractperiod1").each(function(){
			var i=$(this);
			var p=i.find("ul>li");
			p.click(function(){
				if(!!$(this).hasClass("selected")){
					$(this).removeClass("selected");
					//i.removeAttr("data-attrval");
					contract_period="";
				}else{
					$(this).addClass("selected").siblings("li").removeClass("selected");
					//i.attr("data-attrval",$(this).attr("data-aid"))
					contract_period=$(this).attr("data-aid");
				}
			})
		});
		$("#contractperiod2").each(function(){
			var i=$(this);
			var p=i.find("ul>li");
			p.click(function(){
				if(!!$(this).hasClass("selected")){
					$(this).removeClass("selected");
					//i.removeAttr("data-attrval");
					contract_period="";
				}else{
					$(this).addClass("selected").siblings("li").removeClass("selected");
					//i.attr("data-attrval",$(this).attr("data-aid"))
					contract_period=$(this).attr("data-aid");
				}
			})
		});
                         
    });  

	pdatalist = new Array();
 
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
		var index = $(this).val().lastIndexOf("\\");
		var sFileName = $(this).val().substr((index+1));
		$("#rightText").html(sFileName+'等共'+this.files.length+'个文件');
	});

	$("#clear").bind(
			"click", function() {
				pdatalist.shift();
				document.querySelector('#imageshow img').remove();
				$("#saleImg1").attr('value','');
			});
	$("#showInfoDlg").bind(
			"click", function() {
				showInfoDlg("img/4gqy.png");
			});	
	$("#showInfoDlg2").bind(
			"click", function() {
				showInfoDlg("img/zfqy.png");
			});	
	//提交
	$("#ordersubmit").bind(
		"click", function() {
			//是否是从淘宝中进入check
			if (mix_user_id == null || mix_user_id=="") 
			{	
				showInputErrorDlg("请从手机淘宝中购买套餐续约服务！");
				//alert("请从手机淘宝中购买套餐续约服务！"); 
				return;
			} 
			//套餐类型
			if (service_type == "") 
			{	
				showInputErrorDlg("请选择套餐类型");
//				alert(); 
				return;
			} 
			//套餐选择值
			if (package_name == "") 
			{	
				showInputErrorDlg("请选择套餐");
//				alert(); 
				return;
			} 

			//资费选择值
			if (monthly_fee == "") 
			{	
				showInputErrorDlg("请选择套餐档");
//				alert(); 
				return;
			} 
			//协议期
			if (contract_period == "") 
			{	
				showInputErrorDlg("请选择协议期");
//				alert("请选择协议期"); 
				return;
			} 
			//客户名称必填
			if ($("#cname").val() == "" ) 
			{	
				showInputErrorDlg("客户姓名不能为空");
//				alert("客户姓名不能为空"); 
				$("#cname").css("background","yed");
				$("#cname").focus();
				return;
			}
			else
			{
				cname=$("#cname").val();
			}
			//电话号码不能为空
			if ($("#mobile").val() == "" ) 
			{	
				showInputErrorDlg("手机号码不能为空");
				$("#mobile").focus();
//				alert("手机号码不能为空"); 
				return;
			}
			//身份证号不能空
			if ($("#id_number").val() == "" ) 
			{	
				showInputErrorDlg("身份证号不能为空");
				$("#id_number").focus();
//				alert("身份证号不能为空"); 
				return;
			}
			
			//手机号码验证
			if (!IsTel($("#mobile").val())) 
			{	
				showInputErrorDlg("非手机号码!");
				$("#mobile").focus();
//				alert("非手机号码！"); 
				$("#mobile").val("");
				return;
			}
			else
			{
				mobile=$("#mobile").val();
			}
			//联系人手机验证
			if (!IsTel($("#tel").val())) 
			{	
				showInputErrorDlg("非手机号码!");
				$("#tel").focus();
//				alert("非手机号码！"); 
				$("#tel").val("");
				return;
			}
			else
			{
				tel=$("#tel").val();
			}
			//身份证号合理验证
			if (!IdentityCodeValid($("#id_number").val())) 
			{	
//				$("#contractperiod").val("");
				$("#id_number").focus();
				return;
			}
			else
			{
				id_number=$("#id_number").val();
			}
			//身份证上传验证
			var imgvalue = $("#saleImg1").attr("value");
		    if(imgvalue == null || imgvalue==""){
		    	showInputErrorDlg("请上传身份证正反面扫描件/清晰照片！");
//		    	alert("请上传身份证正反面扫描件/清晰照片！"); 
				return;
		    }
		    if (pdatalist ==null || pdatalist.length<1){
		    	showInputErrorDlg("请上传身份证正反面扫描件/清晰照片！");
//		    	alert("请上传身份证正反面扫描件/清晰照片！"); 
				return;
		    }
		    package_details=$("#servicetype").val()+": "+package_name+" "+monthly_fee+" "+broadband_rat+" "+contract_period;
			showLoader();
			
//			alert("bingo");
			var jsondata = {"qjorderdata":{"tel":tel,"imageList":pdatalist,"item_id":item_id,"merchant_order_id":merchant_order_id,"orderprice":orderprice,"mix_user_id":mix_user_id,"ordertime":ordertime,"service_type":service_type,"package_name":package_name,"monthly_fee":monthly_fee,"broadband_rat":broadband_rat,"package_price":package_price,"contract_period":contract_period,"package_details":package_details,"mobile":mobile,"id_number":id_number,"cname":cname,"installation_address":installation_address,"instance_id":instance_id}};
			$.ajax
		    (
		        {
		        	type:"POST",
					async: true,
					url:'qjcommitOrder',
		            dataType: "json",
		            data:JSON.stringify(jsondata),
		            contentType:"application/json",
		            success: function (data)  
		            {		            	
						var div = document.getElementById("imageshow");
					    while(div.hasChildNodes()) //当div下还存在子节点时 循环继续
					    {
					        div.removeChild(div.firstChild);
					    }
						hideLoader();
//						alert('提交成功！');
						$("#saleImg1").attr('value','');
						pdatalist = new Array();
						var retMessage=data.retMessage;
						var retError=data.retError;

						if (retMessage.indexOf("err:")>=0) {
					    	showInputErrorDlg(retMessage+"\n"+retError);
//							alert(retMessage+"\n"+retError);
							
						} else {
						//	Tida.bulidOrder({tradeExToken:regMessage,tradeToken:tradeToken});
							//alert(retMessage+'---'+tradeToken);
							Tida.ready({
						        module:["customization"]
						    }, function(e){
						        var param = {tradeExToken:retMessage, tradeToken:trade_token};
						        //alert(param);
							Tida.customization.buildOrder(param);
							//Tida.customization.buildOrder({tradeExToken:regMessage,tradeToken:trade_token});
						     });
						}
						
		            }
		    });
		});
}); 

function selectFile() {  
    $("#saleImg1").trigger("click");  
} 

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

function IsTel(Tel){
    var re=new RegExp(/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/);
    var retu=Tel.match(re);
    if(retu){
        return true;
    }else{
        return false;
    }
}

/*
根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
    地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
    出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
    顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
    校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

出生日期计算方法。
    15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
    2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
下面是正则表达式:
 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i            
 15位校验规则 6位地址编码+6位出生日期+3位顺序号
 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
 
 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
                公式(1)中： 
                i----表示号码字符从由至左包括校验码在内的位置序号； 
                ai----表示第i位置上的号码字符值； 
                Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
                i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
                Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

*/
//身份证号合法性验证 
//支持15位和18位身份证号
//支持地址编码、出生日期、校验位验证
        function IdentityCodeValid(code) { 
            var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
            var tip = "";
            var pass= true;
            
            if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
                tip = "身份证号格式错误";
                pass = false;
            }
            
           else if(!city[code.substr(0,2)]){
                tip = "地址编码错误";
                pass = false;
            }
            else{
                //18位身份证需要验证最后一位校验位
                if(code.length == 18){
                    code = code.split('');
                    //∑(ai×Wi)(mod 11)
                    //加权因子
                    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                    //校验位
                    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;
                    for (var i = 0; i < 17; i++)
                    {
                        ai = code[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }
                    var last = parity[sum % 11];
                    if(parity[sum % 11] != code[17]){
                        tip = "校验位错误";
                        pass =false;
                    }
                }
            }
            if(!pass) 
            	showInputErrorDlg("身份证号:  "+tip);
//            	alert();
            return pass;
        }
        
function showInputErrorDlg(errortext) {
	$("#inputerror").text(errortext); 
	$("#errorconfirm").unbind("click").bind("click", function () {
		$("#inputerror_dialog").dialog("close");
	});
	$.mobile.changePage( "#inputerror_dialog", { role: "dialog" } );
	}
function showInfoDlg(imgsrc) {
	$("#infoimg").attr('src',imgsrc); 
	$.mobile.changePage( "#info_dialog", { role: "dialog" } );
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
