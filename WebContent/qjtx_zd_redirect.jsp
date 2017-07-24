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
		<link rel="stylesheet" href="themes/qjtx.css?v=0622" />
		<script type="text/javascript" src="themes/jquery-1.8.2.min.js"></script>
		<script type="text/javascript" src="themes/jquery.mobile-1.4.2.min.js"></script>
		<script type="text/javascript" src="qjtx_zd_redirect.js?v=0622s"></script>
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
			var package_name='<s:property value="tcType"/>';
			var monthly_fee='<s:property value="tcPrice"/>';
			var monthly_fee2='<s:property value="tcPrice2"/>';
			var monthly_fee3='<s:property value="tcPrice3"/>';
			var broadband_rat;
			var package_price='<s:property value="tcPrice"/>';
			var contract_period='<s:property value="tcPeroid"/>';
			var package_details;
			var mobile;
			var id_number;
			var cname;
			var installation_address;
		    var ischeckXY=0;
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
		<div style="position:fixed; top:0; left: 0;width: 100%; height: 40px; background: #FFFAB4;">
		
			<div class="qj_checkbox" style="margin-top:1em; margin-right:0em;" >
				<img src="img/tkbz.svg" style="width:16px; height:16px;">
			</div>
			<div class="qj_checkbox_a" style="margin-top:1.3em;" >
				<p style="color:#FF5000; text-shadow:none;">如果因系统原因等办理失败，立即全额退款</p>
			</div>
		</div>
			<!--  
			<div data-role="header" class="ui-imghk" align="center">
				<img class="ui-divheightvanke" src="themes/images/qjtxlogo.png">
			</div>
			-->
			<div role="main" class="qj_content">
				<div style="margin-top:40px; margin-bottom:1.5em;">
					<!--<a id="showInfoDlg" href="#" title="套餐详细" style="margin-left:.5em; font-size:15px;" >4G签约赠话费详情</a>
					<a id="showInfoDlg2" href="#" title="套餐详细" style="margin-left:.5em; font-size:15px;" >移动飞享套餐详情</a>-->
					<!--  <hr style="height: 1px; background-color: #ccc; border: 0; margin: 0.5em;">-->
				</div>
				<div class="qj_whitediv">
					<div class="qj_label">
						<p>手机号码</p>
					</div>
					<div class="qj_textfield">
						<input type="number" id="mobile" placeholder="请输入办理手机号码（必填）"></input>
					</div>
				</div>
				<div class="qj_whitediv">
					<div class="qj_label">
						<p>户主姓名</p>
					</div>
					<div class="qj_textfield">
						<input type="text" id="cname" placeholder="请输入办理人姓名（必填）"></input>
					</div>
				</div>
				
				<!--  <div class="qj_whitediv">
					<div class="qj_label">
						<p>联系电话</p>
					</div>
					<div class="qj_textfield">
						<input type="number" id="tel" placeholder="客服人员联系用--9:00~18:00"></input>
					</div>
				</div>-->
				<div class="qj_whitedivbottom">
					<div class="qj_label">
						<p>身份证号</p>
					</div>
					<div class="qj_textfield">
						<input type="text" id="id_number" placeholder="请输入办理人身份证（必填）"></input>
					</div>
					
				</div>
				<div class="saleImgDown" style="height:60px; padding-top:15px;">
			        <p style="margin-left:.5em">
							身份证扫描/拍摄文件:
					</p>
					<p style="font-size:12px; color:#999999; margins-bottom:0px">
							(请上传办理号主清晰无遮挡的正反面照片，可传多个文件)
					</p>
				</div>
				<div class="saleImgDown qj_file">
			        <input id="saleImg1" type="file" accept="image/* multiple" multiple = "multiple" name="saleImg1"/>
					<span class="custorm-style">
						<span class="left-button" onClick="selectFile()">上传文件</span>
						<span class="right-text" id="rightText"></span>
					</span>
				</div>
				<div class="saleImgDown" >
			        <p style="font-size:15px;">
							上传预览：<a id="clear" href="#" class="">清除文件</a>
					</p>
					
				</div>
				<div class="saleImg" id ="imageshow">
				</div>
				<!-- 按商品id自动分配套餐类型 -->
				<div class="qj_whitedivnoline">
					<div class="qj_labelselect">
						<p>套餐类型:</p>
					</div>
					<div class="qj_directSelect">
						<s:property value="tcType"/>
					</div>
				</div>
				<div class="qj_whitedivnoline">
					<div class="qj_labelselect">
						<p>业务档次:</p>
					</div>
					<div class="qj_directSelect">
						<s:property value="tcPrice"/>
					</div>
				</div>
				<div class="qj_whitedivnoline">
					<div class="qj_labelselect">
						<p>活动内容:</p>
					</div>
					<div class="qj_directSelect">
						<s:property value="tcPrice2"/>
					</div>
				</div>
				<div class="qj_whitedivnoline">
					<div class="qj_labelselect">
						<p>每月返还:</p>
					</div>
					<div class="qj_directSelect">
						<s:property value="tcPrice3"/>
					</div>
				</div>
				<div class="qj_whitedivnoline">
					<div class="qj_labelselect">
						<p>合约期:</p>
					</div>
					<div class="qj_directSelect">
						<s:property value="tcPeroid"/>
					</div>
				</div>
				<div class="qj_checkboxdiv">
					<div class="qj_checkbox" style="margin-top:1em; margin-right:0em;" >
						<img id = "chcbox1" src="img/unagree.svg" style="width:16px; height:16px;">
						<img id = "chcbox2" src="img/agree.svg" style="width:16px; height:16px; display:none;">
					</div>
					<div class="qj_checkbox_a" style="margin-top:1.1em;" >
						我已阅读并同意<a id="showXYDlg" href="#" title="用户协议" style="margin-left:.1em; font-size:12px;" >《合约协议》</a>
					</div>
				</div>


				<div class="qj_normal">
					<p>
						注：为确保订单签约成功，请仔细填写，提交的信息真实有效！请保持联系电话畅通，您的专属客服会联系到您。
					</p>
				</div>
				
			</div>
			<div style="position:fixed; bottom:0px; left: 0;width: 100%; height: 60px; background: #FFF;">
			
				<div class="qj_next" >
					<img src="img/wangwang.svg" style="width:25px; height:25px; margin:auto;">
				</div>
				<div class="qj_next_a">
					<a id="ordersubmit" style="font-weight:normal; padding:0px; margin:0px" href="#"
						class="qj_button ui-btn-corner-all ui-btn">立即办理</a>
				</div>
			</div>
		</div>
		<div data-role="dialog" id="info_dialog" class="qj_infodialog">
			<div data-role="header">
				<h1 style="height:20px; font-size:16px;" id="infodialog">
					提示信息
				</h1>	
			</div>
			<div data-role="content">
				<img src="" id="infoimg" style="width:100%"></img>
			</div>
		</div>
		<div data-role="dialog" id="inputerror_dialog" class="qj_dialog">
			<div data-role="header">
				<h1 style="height:20px; font-size:16px;">
					提交信息验证失败
				</h1>	
			</div>
			<div data-role="content">
				<p id="inputerror" style="height:45px; font-size:16px;text-align: center;margin-top:5px;">
					数据提交错误！
				</p>
				<a href="#" id="errorconfirm" class="qj_button ui-btn-corner-all ui-btn ui-shadow">确认</a>
			</div>
		</div>
	</body>

</html>
