<!doctype html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>七宝万科商场销售数据管理</title>
	
	<script type="text/javascript" src="report/js/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="report/js/jquery-ui-11.4/jquery-ui.min.js"></script>
	<link rel="stylesheet" href="report/js/jquery-ui-11.4/jquery-ui.theme.min.css"/>
	<link rel="stylesheet" type="text/css" href="report/css/normalize.css" />
	<link rel="stylesheet" href="distlight/css/lightbox.min.css"/>

	<script type="text/javascript">
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
		var selectDate = new Date().Format("yyyy-MM-dd");
		var username = '<s:property value="userdisplayname"/>';
	</script>
	<script type="text/javascript" src="report/js/tabulator.js"></script>
	<script type="text/javascript" src="report/js/report.js"></script>
	<link rel="stylesheet" type="text/css" href="report/css/default.css"/>

	<style type="text/css">
	body{
		padding:20px 20px;
		margin:10px;
		font-family: 'Montserrat', sans-serif !important;
	}

	section:first-of-type header{
		font-size: 50px;
	}

	section{
		margin:0px;
	}

	ul>li{
		margin-bottom:2px;
	}

	button, select{
		margin-right:20px;
	}

	input{
		font-family: 'Montserrat', sans-serif !important;

	}
	.dateSelect {
		float: left;
		color: #FFFFFF;
		width: 100%;
		margin-bottom:10px;
	}
	
	.dateSelect1{
		float: left;
		margin-right:10px;
	}
	.dateSelect1 #saleday{
		float: left;
		background-color:#fff;
		margin-right:10px;
	}
	.dateSelect2{
		float: left;
		color: #FFFFFF;
		width: 150px;
		margin-right:10px;
	}
	</style>
	<script type="text/javascript">
	//sample data to be used in all tabulators
	
	</script>
	<!--[if IE]>
		<script src="http://libs.useso.com/js/html5shiv/3.7/html5shiv.min.js"></script>
	<![endif]-->
</head>
<body>
		<header class="htmleaf-header">
			<h1>七宝万科销售数据管理报表<span>运营管理专用</span></h1>
			<div class="htmleaf-links">
				<!--  <a class="htmleaf-icon icon-htmleaf-home-outline" href="http://www.htmleaf.com/" title="jQuery之家" target="_blank"><span> jQuery之家</span></a>
				<a class="htmleaf-icon icon-htmleaf-arrow-forward-outline" href="http://www.htmleaf.com/jQuery/Table/201512262954.html" title="返回下载页" target="_blank"><span> 返回下载页</span></a>
			-->
			</div>
		</header>
		<div class="dateSelect">
			<div class="dateSelect1">
				<input type="date" id="saleday"></input>
			</div>
			<div class="dateSelect2">
				<input type="checkbox" id="isReview">已提交未审核</input>
			</div>
			<div class="dateSelect2">
				<input type="checkbox" id="isSubmit">未提交</input>
			</div>
			<div class="dateSelect2">
				<select name="live" id="floorSelect">
						<option value="">
							所有楼层
						</option>
						<option value="B1">
							B1
						</option>
						<option value="B2">
							B2
						</option>
						<option value="L1">
							L1
						</option>
						<option value="L2">
							L2
						</option>
						<option value="L3">
							L3
						</option>
						<option value="L4">
							L4
						</option>
						<option value="L5">
							L5
						</option>
						<option value="L6">
							L6
						</option>
						
					</select>
			</div>
			
			
		</div>
<section>
	<div id="qbvk-table"></div>
</section>
		<script type="text/javascript" src="distlight/js/lightbox.js"></script>
</body>
</html>