<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>七宝万科销售数据收集</title>
		<script type="text/javascript" src="//g.alicdn.com/tmapp/tida/3.2.51/tida.js?appkey=23759189"></script>
    	<link rel="stylesheet" href="src/lib/bootstrap.min.css?v=1e35cd1"/>
		<link rel="stylesheet" href="themes/jquery.mobile.icons.min.css" />
		<link rel="stylesheet" href="themes/jquery.mobile.structure-1.4.2.css" />
		<link rel="stylesheet" href="themes/hotline.css" />
		<script src="themes/jquery-1.8.2.min.js"></script>
		<script src="themes/jquery.mobile-1.4.2.min.js"></script>
		<script src="sc.js?1"></script>
		<script src="dist/lrz.bundle.js?v=2"></script>
		<script>
			var saleid = '<s:property value="saleid"/>';
			var storename = '<s:property value="storename"/>';
			var floor = '<s:property value="floor"/>';
			var productid = '<s:property value="productid"/>';
			var pdata1;
			var pdata2;
			var pdata3;
			var pdata4;
			var pdatalist;

		</script>

	</head>
	<body>
		<!-- 热线拨打页 -->
		<div data-role="page" data-theme="a" id="confInfo">

			<div data-role="header" class="ui-imghk" align="center">
				<img class="ui-divheightvanke" src="themes/images/vankelogo55.png">
			</div>
			<div role="main" class="ui-content">
				<div>
					<p>
						七宝万科广场商铺销售数据更新（日）
					</p>
					<hr
						style="height: 1px; background-color: #ccc; border: 0; margin-top: 4px; margin-bottom: 4px;">
						<p class = "storename" id="storename">
						</p>
						<p id="floor">
						</p>
						<p id="">
						</p>
				</div>


				<div class="ui-text-vanketime">
					<p>
						填报日期：
					</p>
					<input type="date" id="saleday"></input>
				</div>
				<div class="ui-text-vanke">
					<div class="ui-text-vankesaletotal">
						<p>
							商铺代号：
						</p>
						<input type="number" id="saleid"></input>
					</div>
				</div>
				<div class="ui-text-vanke">
					<div class="ui-text-vankesaletotal">
						<p>
							销售额：
						</p>
						<input type="number" id="total"></input>
					</div>
					<div class="ui-text-vankesaleqty">
						<p>
							成交笔数：
						</p><input type="number" id="qty"></input>
					</div>	
				</div>
				<div class="saleImg">
			        <p>
							销售凭据：
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
<!-- 				<div class="saleImg">
			        <input id="saleImg2" type="file" accept="image/* multiple" name="saleImg2"/>
				</div>
				<div class="saleImg">
			        <input id="saleImg3" type="file" accept="image/* multiple" name="saleImg3"/>
				</div>
				<div class="saleImg">
			        <input id="saleImg4" type="file" accept="image/* multiple" name="saleImg4"/>
				</div> -->
				
				<div class="ui-text-vanke">
					<a id="salesubmit" href="#"
						class="ui-btn-corner-all ui-btn ui-shadow">提交销售额信息</a>
				</div>

				<div class="ui-text-vankezhu">
					<p>
						注：重复提交只取当日最后更新数据
					</p>
				</div>
				
				<div class="ui-text-vanke">
					<hr
						style="height: 1px; background-color: #ccc; border: 0; margin-top: 4px; margin-bottom: 4px;">
					<p>
						Design&Dev by JZ(祝君) - 上海万科运营与目标管理
					</p>
				</div>
			</div>
		</div>
	</body>
</html>