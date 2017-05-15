<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<meta name="format-detection" content="telephone=no">
		<meta name="spm-id" content="a1z51.23759189"/>
		<title>奇杰通信天猫营业厅</title>
		<script type="text/javascript" src="//g.alicdn.com/tmapp/tida2/2.2.16/tida.js?appkey=23759189"></script>
	    <link rel="stylesheet" href="src/lib/bootstrap.min.css?v=1e35cd1"/>
		<link rel="stylesheet" href="themes/jquery.mobile.icons.min.css" />
		<link rel="stylesheet" href="themes/jquery.mobile.structure-1.4.2.css" />
		<link rel="stylesheet" href="themes/qjtx.css" />
		<script type="text/javascript" src="themes/jquery-1.8.2.min.js"></script>
		<script type="text/javascript" src="themes/jquery.mobile-1.4.2.min.js"></script>
		<script type="text/javascript" src="qjtx_zd.js?v=123"></script>
		<script type="text/javascript" src="dist/lrz.bundle.js"></script>
		<script>
			var tida=Tida.ready({
			
	    		module: ['customization']
			}, function(e){
				});
			var pdatalist;
			var item_id='<s:property value="itemId"/>';
			var mix_user_id='<s:property value="mixUserId"/>';
			var trade_token='<s:property value="tradeToken"/>';
			
			var merchant_order_id="23759189";
			var orderprice="0.01";
			var ordertime;
			var service_type;
			var package_name;
			var monthly_fee;
			var broadband_rat;
			var package_price;
			var contract_period;
			var package_details;
			var mobile;
			var id_number;
			var cname;
			var installation_address;
			
			//function GetQueryString(name) {
			//	   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
			//	   var r = window.location.search.substr(1).match(reg);
			//	   if (r!=null) return (r[2]); return null;
			//}
			//mix_user_id = GetQueryString("mixUserId");
			//item_id = GetQueryString("itemId");
			//tradeToken = GetQueryString("tradeToken");
			//alert(GetQueryString("mixUserId"));
			//alert(GetQueryString("itemId"));
			//alert(GetQueryString("tradeToken"));
			
		</script>

	</head>
	<body>

		
		<div data-role="page" data-theme="a" id="qjOrderPage">

			<!--  
			<div data-role="header" class="ui-imghk" align="center">
				<img class="ui-divheightvanke" src="themes/images/qjtxlogo.png">
			</div>
			-->
			<div role="main" class="qj_content">
				<div>
					<p>
						奇杰通信移动套餐续约服务
					</p>
					<hr style="height: 1px; background-color: #ccc; border: 0; margin: 0.5em; ">
				</div>


				<div class="ui-text-vanketime">	
						<p id="">
						</p>
						<p id="saleday">
						</p>
				</div>
 				<div class="ui-text-vanke">
						<p>
							选择续约套餐类型：
						</p>
						<select id="servicetype" name="servicetype">  
				            <option value="select">请选择..</option>     
				            <option value="终端活动">终端活动</option>     
				            <option value="移动宽带">移动宽带</option>          
				        </select>  
				        <p>
							选择套餐：
						</p>
				        <select id="packagename" name="packagename"> 
				        <option value="select">请选择..</option>   
				        </select>
				        <select id="fee" name="fee">  
				        <option value="select">请选择..</option>  
				        </select>
				        <select id="contractperiod" name="contractperiod"> 
				        <option value="select">请选择..</option>   
				        </select>
				</div>
				<div class="qj_whitediv">
					<label class="qj_label">客户姓名：</label>
					<div class="qj_textfield">
						<input type="text" id="cname"></input>
					</div>
					<label>手机号：</label>
					<div class="qj_textfield">
						<input type="number" id="mobile"></input>
					</div>
					<label>身份证号：</label>
					<div class="qj_textfield">
						<input type="text" id="id_number"></input>
					</div>	
					
				</div>
	
				<div class="saleImg">
			        <p>
							身份证扫描／拍摄文件(正反面、可传多个文件)：
					</p>
				</div>
				<div class="saleImg">
			        <input id="saleImg1" type="file" accept="image/* multiple" multiple = "multiple" name="saleImg1"/>
			        
				</div>
				<div class="saleImg">
			        <p>
							上传预览：<a id="clear" href="#" class="">清除文件</a>
					</p>
					
				</div>
				<div class="saleImg" id ="imageshow">
				
				</div>
				
				<div class="ui-text-vanke">
					<a id="ordersubmit" href="#"
						class="ui-btn-corner-all ui-btn ui-shadow">确认下单</a>
				</div>

				<div class="ui-text-vankezhu">
					<p>
						注：为确保订单签约成功，请仔细填写，提交的信息真实有效！
					</p>
				</div>
				
				<div class="ui-text-vanke">
					<hr
						style="height: 1px; background-color: #ccc; border: 0; margin-top: 4px; margin-bottom: 4px;">
					<p>
						 奇杰通信专营店
					</p>
				</div>
			</div>
		</div>
	</body>

</html>
