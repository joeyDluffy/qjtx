var options = {
  		useEasing : true, 
  		useGrouping : true, 
  		separator : '', 
  		decimal : '', 
  		prefix : '', 
  		suffix : '' 
		};
var carin;
var carout;
var cartotal;
var carin_data;
var carout_data;
var car_tick;
var pin;
var pout;
var ptotal;
var pin_data;
var pout_data;
var p_tick;
var car_plot;
var carNum=1;
var carMax=0;
var p_plot;
var pNum=1;
var pMax=0;
var repPData;
function startvk() 
	{ 
	flushdata();
	window.setInterval(flushdata, 30000); 
		//window.setInterval(flushdata, 3000000); 
	} 
function flushdata() 
	{ 

		$.ajaxSettings.async = true;
		
		$.getJSON("getPflowInfo", function(data){
			if(data.success) {	
				
				updatePflow(data);
				
			}
		});
		$.getJSON("getCarInfo", function(data){
			if(data.success) {	
				updateCar(data);
			}
		});
	} 
function updateCar(data) 
{ 		carNum=0;
		carMax=data.max;
	  carin = new CountUp("carin", data.carInfoDay.carin-data.carInfoDay.carin/5, data.carInfoDay.carin, 0, 2.5, options);
	  carout = new CountUp("carout", data.carInfoDay.carout-data.carInfoDay.carout/5, data.carInfoDay.carout, 0, 2.5, options);
	  cartotal = new CountUp("cartotal", (data.carInfoDay.carin - data.carInfoDay.carout)/2, data.carInfoDay.carin - data.carInfoDay.carout, 0, 2.5, options);

		carin.start();
		carout.start();
		cartotal.start();
	//carin.update(data.carInfoDay.carin);
	//carout.update(data.carInfoDay.carout);
	if(data.responseList != null && data.responseList.length > 0) {
		carin_data = new Array();
		carout_data = new Array();
		car_tick = new Array();
		$.each(data.responseList,function(i,value){
			carin_data.push([i, value.carin]);
			carout_data.push([i, value.carout]);
			car_tick.push([i, value.carhour]);
		});

//	    if($("#car_chart").length > 0){
//
//	        car_plot = $.plot($("#car_chart"), [ { data: carin_data.slice(0,12), label: "入场车流", color:"#009AD7"}, {data: carout_data.slice(0,12), label: "离场车流", color:"#198522"} ], {
//	            
//	                series: {lines: { show: true, fill: true}, points: { show: true }},
//	        		//series: {bars: { show: true,align:"center" }, points: { show: false }},
//	                grid: { borderWidth: 0.5, hoverable: true, clickable: true, show:true, color: "#fff" },
//	                yaxis: { min: 0, max: data.max, tickColor: "#919191", color: "#fff"},
//	                xaxis: { labelWidth: 30, tickLength: 0 ,ticks: car_tick, color: "#fff"},
//	        });

	        refreshCar();
	    }    
	}
  

function refreshCar()
{
	if (carNum < 12) 
	{	
		$.plot($("#car_chart"), [ { data: carin_data.slice(carNum,carNum+12), label: "入场车流", color:"#009AD7"}, {data: carout_data.slice(carNum,carNum+12), label: "离场车流", color:"#198522"} ], {
            
            series: {lines: { show: true, fill: true}, points: { show: true }},
    		//series: {bars: { show: true,align:"center" }, points: { show: false }},
            grid: { borderWidth: 0.5, hoverable: true, clickable: true, show:true, color: "#fff" },
            yaxis: { min: 0, max: carMax*1.05, tickColor: "#919191", color: "#fff"},
            xaxis: { labelWidth: 30, tickLength: 0 ,ticks: car_tick, color: "#fff"},
		});
		//car_plot.setData([carin_data.slice(carNum,carNum+12), carout_data].slice(carNum, carNum+12));
		//car_plot.setupGrid();
		//car_plot.draw();
		carNum++;
		setTimeout(refreshCar, 1500);
	}

}
function aaa()
{
	  pin = new CountUp("pin", repPData.pflowInfoDay.pin-repPData.pflowInfoDay.pin/5, repPData.pflowInfoDay.pin, 0, 2.5, options);
	  pout = new CountUp("pout", repPData.pflowInfoDay.pout-repPData.pflowInfoDay.pout/5, repPData.pflowInfoDay.pout, 0, 2.5, options);
	  ptotal = new CountUp("ptotal", (repPData.pflowInfoDay.pin-repPData.pflowInfoDay.pout)/2, repPData.pflowInfoDay.pin-repPData.pflowInfoDay.pout, 0, 2.5, options);

	  pin.start();
		pout.start();
		ptotal.start();
	}
function updatePflow(data) 
{ 		pNum=0;
		pMax=data.max;
		repPData=data;
		setTimeout(aaa, 5000);
	if(data.responseList != null && data.responseList.length > 0) {
		pin_data = new Array();
		pout_data = new Array();
		p_tick = new Array();
		$.each(data.responseList,function(i,value){
			pin_data.push([i, value.pin]);
			pout_data.push([i, value.pout]);
			p_tick.push([i, value.phour]);
		});
		//alert(pin_data.slice(0, 12)[2]);
	    if($("#pflow_chart").length > 0){

//	        p_plot=$.plot($("#pflow_chart"), [ { data: pin_data.slice(0, 12), label: "入场客流", color: "#D53F26"}, {data: pout_data.slice(0, 12), label: "离场客流", color:"#198522"} ], {
//	            
//                //series: {lines: { show: true ,fill: true}, points: { show: true }},
//        		series: {bars: { show: true,align:"center" }, points: { show: false }},
//	                grid: { borderWidth: 0.5, hoverable: true, clickable: true, show:true, color: "#fff"},
//	                yaxis: { min: 0, max: pMax, tickColor: "#919191", color: "#fff"},
//	                xaxis: { labelWidth: 30, tickLength: 0 ,ticks: p_tick, color: "#fff"},
//	        });
	        refreshP();
	    }    
	} 
} 


function refreshP()
{
	if (pNum < 12) 
	{
		p_plot=$.plot($("#pflow_chart"), [ { data: pin_data.slice(pNum, pNum+12), label: "入场客流", color: "#D53F26"}, {data: pout_data.slice(pNum, pNum+12), label: "离场客流", color:"#198522"} ], {
            
            series: {lines: { show: true ,fill: true}, points: { show: true }},
    		//series: {bars: { show: true,align:"center"}, points: { show: false }},
                grid: { borderWidth: 0.5, hoverable: true, clickable: true, show:true, color: "#fff"},
                yaxis: { min: 0, max: pMax*1.05, tickColor: "#919191", color: "#fff"},
                xaxis: { labelWidth: 30, tickLength: 0 ,ticks: p_tick, color: "#fff"},
                
        });
		setTimeout(refreshP, 1500);
		pNum++;
	}

}
$(window).load(function(){


	window.setTimeout(startvk,1000);
    

    function showTooltip(x, y, contents) {
        $('<div class="ct">' + contents + '</div>').css( {
            position: 'absolute',
            display: 'none',
            top: y,
            left: x + 10,
            border: '1px solid #000',
            padding: '3px',
            opacity: '0.7',
            'background-color': '#000',            
            color: '#fff'            
        }).appendTo("body").fadeIn(200);
    }    

    var previousPoint = null;
    
    $("#car_chart").bind("plotclick", function (event, pos, item) {
        
        $("#x").text(pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));

        $(".ct").remove();
        var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2);

        showTooltip(item.pageX, item.pageY,
                    item.series.label + " : " + Math.round(y));

    });
    
    $("#pflow_chart").bind("plotclick", function (event, pos, item) {
        
        $("#x").text(pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));
        $(".ct").remove();
        var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2);

        showTooltip(item.pageX, item.pageY,
        		item.series.label + " : " + Math.round(y));


    });
    
});

