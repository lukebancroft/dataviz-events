import React from 'react';
import moment from 'moment';

export default class heatMapCal extends React.Component {

  componentDidMount() {
    this.drawCal();
  }

  componentDidUpdate() {
    this.drawCal();
  }

  render() {
    return (
        <div id="heatMap">
        </div>
    );
  }
  
  drawCal() {
    //Empty div in case grap needs redrawing
    document.getElementById("heatMap").innerHTML = "";

    var title="Number of events per day";
    var units=" events";
    var breaks=[1,25,50,100,150];
    var colours=["#ffefb6","#FEC269","#fe9929","#d95f0e","#993404"];
    
    //general layout information
    var cellSize = 17;
    var xOffset=20;
    var yOffset=60;
    var calY=50;//offset of calendar in each group
    var calX=25;
    var width = 960;
    var height = 163;
    
    var data = this.props.eventsPerDate;
        //set up an array of all the dates in the data which we need to work out the range of the data
        var dates = [];
        var values = [];

        //parse the data
        Object.keys(data).forEach(function(key) {
            dates.push(moment(key).format("YYYY-MM-DD"));
            values.push(data[key]);
        });
        
        //dates.sort((a,b)=> new Date(b).getTime() - new Date(a).getTime());
        
        var yearlyData = window.d3.nest()
            .key(function(d){return moment(d).year();})
            .entries(dates);

        yearlyData.sort(function(a,b){
            return b.key - a.key;
        });
        
        var svg = window.d3.select("#heatMap").append("svg")
            .attr("width","90%")
            .attr("viewBox","0 0 "+(xOffset+width)+" " +(250*yearlyData.length));
            
        //title
        svg.append("text")
        .attr("x",xOffset)
        .attr("y",20)
        .attr("font-size", "1.5em")
        .text(title);
        
        //create an SVG group for each year
        var cals = svg.selectAll("g")
            .data(yearlyData)
            .enter()
            .append("g")
            .attr("id",function(d){
                return d.key;
            })
            .attr("transform",function(d,i){
                return "translate(0,"+(yOffset+(i*(height+calY)))+")";  
            });
        
        cals.append("text")
            .attr("class","yearLabel")
            .attr("fill", "#000000")
            .attr("font-size", "1.5em")
            .attr("x",xOffset)
            .attr("y",15)
            .text(function(d){return d.key});
        
        //create a daily rectangle for each year
        cals.append("g")
            .attr("id","alldays")
            .selectAll(".day")
            .data(function(d) { return window.d3.timeDays(moment(d.key+"-01-01").toDate(), moment((parseInt(d.key) + 1)+"-01-01").toDate()); })
            .enter().append("rect")
            .attr("id",function(d) {
                return "_"+moment(d).format("YYYY-MM-DD");
            })
            .attr("class", "day")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("fill", "#ffffff")
            .attr("stroke", "#ccc")
            .attr("x", function(d) {
                return xOffset+calX+(window.d3.timeWeek.count( window.d3.timeYear( d ), d ) * cellSize);
            })
            .attr("y", function(d) { return calY+(moment(d, "YYYY-MM-DD").day() * cellSize); })
            .datum(window.d3.timeFormat("%d-%m-%Y"));
        
        //create day labels
        var days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
        var dayLabels=cals.append("g").attr("id","dayLabels")
        days.forEach(function(d,i)    {
            dayLabels.append("text")
            .attr("class","dayLabel")
            .attr("fill", "#aaaaaa")
            .attr("font-size", "0.8em")
            .attr("x",xOffset)
            .attr("y",function(d) { return calY+(i * cellSize); })
            .attr("dy","0.9em")
            .text(d);
        })
        
        //let's draw the data on
        var dataRects = cals.append("g")
            .attr("id","dataDays")
            .selectAll(".dataday")
            .data(function(d){
                return d.values;   
            })
            .enter()
            .append("rect")
            .attr("id",function(d) {
                return d+":"+data[d];
            })
            .attr("stroke","#ccc")
            .attr("width",cellSize)
            .attr("height",cellSize)
            .attr("x", function(d){ return xOffset+calX+(window.d3.timeWeek.count( window.d3.timeYear( moment(d, "YYYY-MM-DD").toDate() ), moment(d, "YYYY-MM-DD").toDate() ) * cellSize);})
            .attr("y", function(d) { return calY+(moment(d, "YYYY-MM-DD").day() * cellSize); })
            .attr("fill", function(d) {
                if (data[d]<breaks[0]) {
                    return colours[0];
                }
                for (i=0;i<breaks.length+1;i++){
                    if (data[d]>=breaks[i]&&data[d]<breaks[i+1]){
                        return colours[i];
                    }
                }
                if (data[d]>breaks.length-1){
                    return colours[breaks.length - 1]   
                }
            });
        
        //append a title element to give basic mouseover info
        dataRects.append("title")
            .text(function(d) { return d+":\n"+data[d]+units; });
        
        //add montly outlines for calendar
        cals.append("g")
        .attr("id","monthOutlines")
        .selectAll(".month")
        .data(function(d) { 
            return window.d3.timeMonths(moment(d.key+"-01-01", "YYYY-MM-DD").toDate(),
            moment((parseInt(d.key)+1)+"-01-01", "YYYY-MM-DD").toDate()); 
        })
        .enter().append("path")
        .attr("class", "month")
        .attr("fill", "none")
        .attr("stroke", "#000000")
        .attr("stroke-width", "2px")
        .attr("transform","translate("+(xOffset+calX)+","+calY+")")
        .attr("d", monthPath);
        
        //retreive the bounding boxes of the outlines
        var BB = [];
        var mp = document.getElementById("monthOutlines").childNodes;
        for (var i=0;i<mp.length;i++){
            BB.push(mp[i].getBBox());
        }
        
        var monthX = [];
        BB.forEach(function(d,i){
            var boxCentre = d.width/2;
            monthX.push(xOffset+calX+d.x+boxCentre);
        });

        //create centred month labels around the bounding box of each month path
        //create day labels
        var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
        var monthLabels=cals.append("g").attr("id","monthLabels")
        months.forEach(function(d,i)    {
            monthLabels.append("text")
            .attr("class","monthLabel")
            .attr("text-anchor", "middle")
            .attr("font-size", "0.8em")
            .attr("fill", "#aaaaaa")
            .attr("x",monthX[i])
            .attr("y",calY/1.2)
            .text(d);
        });
        
         //create key
        var key = svg.append("g")
            .attr("id","key")
            .attr("class","key")
            .attr("transform",function(d){
                return "translate("+xOffset+","+(yOffset-(cellSize*1.5))+")";
            });
        
        key.selectAll("rect")
            .data(colours)
            .enter()
            .append("rect")
            .attr("width",cellSize)
            .attr("height",cellSize)
            .attr("x",function(d,i){
                return i*130;
            })
            .attr("fill",function(d){
                return d;
            });
        
        key.selectAll("text")
            .data(colours)
            .enter()
            .append("text")
            .attr("font-size", "1.2em")
            .attr("x",function(d,i){
                return cellSize+5+(i*130);
            })
            .attr("y","0.8em")
            .text(function(d,i){
                if (i<colours.length-1){
                    return breaks[i] + " to " + (breaks[i+1] - 1);
                }   else    {
                    return "over "+breaks[i];   
                }
            });
       //end data load

    //pure Bostock - compute and return monthly path data for any year
    function monthPath(t0) {
        var t1 = new Date( t0.getFullYear(), t0.getMonth() + 1, 0 ),
            d0 = t0.getDay(), w0 = window.d3.timeWeek.count( window.d3.timeYear( t0 ), t0 ),
            d1 = t1.getDay(), w1 = window.d3.timeWeek.count( window.d3.timeYear( t1 ), t1 );
        return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
            + "H" + w0 * cellSize + "V" + 7 * cellSize
            + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
            + "H" + (w1 + 1) * cellSize + "V" + 0
            + "H" + (w0 + 1) * cellSize + "Z";
      }
  }
}