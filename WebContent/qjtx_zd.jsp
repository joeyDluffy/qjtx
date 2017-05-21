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
		<title>终端服务</title>
		<script type="text/javascript" src="//g.alicdn.com/tmapp/tida2/2.2.16/tida.js?appkey=23759189"></script>

		<link rel="stylesheet" href="themes/jquery.mobile.icons.min.css" />
		<link rel="stylesheet" href="themes/jquery.mobile.structure-1.4.2.css?v=1" />
		<link rel="stylesheet" href="themes/qjtx.css?v=a1a1aa" />
		<script type="text/javascript" src="themes/jquery-1.8.2.min.js"></script>
		<script type="text/javascript" src="themes/jquery.mobile-1.4.2.min.js"></script>
		<script type="text/javascript" src="qjtx_zd.js?v=aaaa"></script>
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
			var instance_id='<s:property value="instance_id"/>';
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
			var tel;
			
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
					选择套餐：
				</p>
					<hr style="height: 1px; background-color: #ccc; border: 0; margin: 0.6em; ">
				</div>
				
 				<div class="sys_item_spec"> 
				        
						<dl id="package" class="clearfix iteminfo_parameter sys_item_specpara">
							<dt>套餐类型</dt>
							<dd>
								<ul class="sys_spec_text">
									<li data-aid="4G签约赠话费"><a href="javascript:;" title="4G签约赠话费">4G签约赠话费</a><i></i></li>
									<li data-aid="资费签约"><a href="javascript:;" title="资费签约">资费签约</a><i></i></li>
								</ul>
				
							</dd>
						</dl>
						<dl id="fee1" class="clearfix iteminfo_parameter sys_item_specpara" style="display: none;">
							<dt>资费标准</dt>
							<dd>
								<ul class="sys_spec_text">
									<li data-aid="58元"><a href="javascript:;" title="58元">58元</a><i></i></li>
									<li data-aid="88元"><a href="javascript:;" title="88元">88元</a><i></i></li>
									<li data-aid="108元"><a href="javascript:;" title="108元">108元</a><i></i></li>
									<li data-aid="128元"><a href="javascript:;" title="128元">128元</a><i></i></li>
									<li data-aid="158元"><a href="javascript:;" title="158元">158元</a><i></i></li>
									<li data-aid="188元"><a href="javascript:;" title="188元">188元</a><i></i></li>
									<li data-aid="228元"><a href="javascript:;" title="228元">228元</a><i></i></li>
									<li data-aid="288元"><a href="javascript:;" title="288元">288元</a><i></i></li>
								</ul>
				
							</dd>
						</dl>
						<dl id="fee2" class="clearfix iteminfo_parameter sys_item_specpara" style="display: none;">
							<dt>资费标准</dt>
							<dd>
								<ul class="sys_spec_text">
									<li data-aid="58元"><a href="javascript:;" title="58元">58元</a><i></i></li>
									<li data-aid="88元"><a href="javascript:;" title="88元">88元</a><i></i></li>
									<li data-aid="108元"><a href="javascript:;" title="108元">108元</a><i></i></li>
									<li data-aid="138元"><a href="javascript:;" title="138元">138元</a><i></i></li>
									<li data-aid="158元"><a href="javascript:;" title="158元">158元</a><i></i></li>
								</ul>
				
							</dd>
						</dl>
						<dl id="contractperiod1" class="clearfix iteminfo_parameter sys_item_specpara" style="display: none;">
							<dt>签约周期</dt>
							<dd>
								<ul class="sys_spec_text">
									<li data-aid="18个月"><a href="javascript:;" title="18个月">18个月</a><i></i></li>
								</ul>
				
							</dd>
						</dl>
						<dl id="contractperiod2" class="clearfix iteminfo_parameter sys_item_specpara"style="display: none;">
							<dt>签约周期</dt>
							<dd>
								<ul class="sys_spec_text">
									<li data-aid="12个月"><a href="javascript:;" title="12个月">12个月</a><i></i></li>
								</ul>
				
							</dd>
						</dl>
				</div>
				<div class="qj_whitediv">
					<div class="qj_label">
						<p>客户姓名</p>
					</div>
					<div class="qj_textfield">
						<input type="text" id="cname"></input>
					</div>
				</div>
				<div class="qj_whitediv">
					<div class="qj_label">
						<p>套餐号码</p>
					</div>
					<div class="qj_textfield">
						<input type="number" id="mobile"></input>
					</div>
				</div>
				<div class="qj_whitediv">
					<div class="qj_label">
						<p>联系电话</p>
					</div>
					<div class="qj_textfield">
						<input type="number" id="tel"></input>
					</div>
				</div>
				<div class="qj_whitediv">
					<div class="qj_label">
						<p>身份证号</p>
					</div>
					<div class="qj_textfield">
						<input type="text" id="id_number"></input>
					</div>
					
				</div>
				<div class="saleImg" style="height:60px; padding-top:30px;">
			        <p style="margin-left:.5em">
							身份证扫描/拍摄文件
					</p>
					<p style="font-size:15px; color:#999999; margins-bottom:0px">
							(正反面、可传多个文件)
					</p>
				</div>
				<div class="saleImg qj_file">
			        <input id="saleImg1" type="file" accept="image/* multiple" multiple = "multiple" name="saleImg1"/>
					<span class="custorm-style">
						<span class="left-button" onClick="selectFile()">上传文件</span>
						<span class="right-text" id="rightText"></span>
					</span>
				</div>
				<div class="saleImg" >
			        <p style="font-size:15px; margin-left:1em">
							上传预览：<a id="clear" href="#" class="">清除文件</a>
					</p>
					
				</div>
				<div class="saleImg" id ="imageshow">
				
				</div>
				
				<div class="saleImg">
					<a id="ordersubmit" style="font-weight:normal;" href="#"
						class="qj_button ui-btn-corner-all ui-btn ui-shadow">确认下单</a>
				</div>

				<div class="qj_normal">
					<p>
						注：为确保订单签约成功，请仔细填写，提交的信息真实有效！请保持联系电话畅通，您的专属客服会联系到您。
					</p>
				</div>
				
				<div class="qj_normal">
					<hr style="height: 1px; background-color: #ccc; border: 0; margin: 0.6em; ">
					<p>
						 奇杰通信专营店
					</p>
				</div>
			</div>
		</div>
		<div data-role="dialog" id="inputerror_dialog">
			<div data-role="header">
				<h1 style="height:45px">
					提交信息验证失败
				</h1>
			</div>
			<div data-role="content">
				<p id="inputerror">
					数据提交错误！
				</p>
				<a href="#" id="errorconfirm" class="qj_button ui-btn-corner-all ui-btn ui-shadow">确认</a>
			</div>
		</div>
	</body>

</html>
