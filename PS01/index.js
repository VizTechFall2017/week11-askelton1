var width = document.getElementById('svg') .clientWidth;
var height = document.getElementById('svg') .clientHeight;

console.log(width,height);

document.body.style.backgroundImage = "url('http://www.freeiconspng.com/uploads/smoke-png-transparent-smoke-png-image-smokes-25.png')";

var marginLeft = 0;
var marginTop = 0;

var nestedData = [];

//var sortOrder ="Recreational";
//var currentYear = 1933;

var dataRec;
var dataMed;
var state;

//var clicked = true;

var svg = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var albersProjection = d3.geoAlbersUsa()
    .scale(1100)
    .translate([(width/2) , (height/2)]);

path = d3.geoPath()
    .projection(albersProjection);

var stateLookup = d3.map();
var colorScale = d3.scaleLinear().range(['#eaffe6','#0d4d00']);

var path = d3.geoPath()
    .projection(albersProjection);

d3.queue()
    .defer(d3.json, "./cb_2016_us_state_20m.json")
    .defer(d3.csv, "./finalData.csv")
    .await(function(err, mapData, finalData){

        finalData.forEach(function(d){console.log(d);
            //stateLookup.set(d.state, +d.dataMed);
            stateLookup.set(d.state, +d.dataRec);
        });

        console.log(finalData);

        //colorScale.domain([2002, d3.max(finalData.map(function(d){return +d.dataMed}))]);
        colorScale.domain([1933, d3.max(finalData.map(function(d){return +d.dataRec}))]);

        svg.selectAll("path")
            .data(mapData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "feature")
            .attr('fill',function(d){console.log(d,stateLookup.get(d.properties.STUSPS));
                return colorScale(stateLookup.get(d.properties.STUSPS));
            })
            .attr('stroke','lightGrey')
            .attr('stroke-width',2)
            //.on('mouseover', function(d){console.log(d.properties.NAME)})
            .on('mouseover',function(d){console.log(d.properties.STUSPS)})
            .on('mouseover',function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 1);
                div.html(d.properties.NAME)
                    .style("left", (d3.event.pageX) + "800");
                    //.style("top", (d3.event.pageY - 28) + "10");
            })
             .on("mouseout", function(d){
                 div.transition()
                     .duration(500)
                     .style("opacity",0);
                });

                console.log(finalData);
        console.log(stateLookup);

    });

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 100);

svg.append('rect')
    .attr("x", 300)
    .attr("y", 65)
    .attr("width", 475)
    .attr("height", 75)
    .attr("fill", "white")
    .attr('stroke','green')
    .attr('fill','lightGrey')
    .attr('stroke-width', 5)
    .attr("id", "rectLabel");

svg.append('rect')
    .attr("x", 300)
    .attr("y", 5)
    .attr("width", 475)
    .attr("height", 50)
    .attr("fill", "white")
    .attr('stroke','green')
    .attr('fill','lightGrey')
    .attr('stroke-width', 5)
    .attr("id", "rectLabel");

svg.append('text')
    .text('Hover over states to see how marijuana laws vary across the U.S. ')
    //.text(function(d){return d.properties.STATE;})
    .attr('x', 325)
    .attr('y', 100)
    .attr('fill', 'green')
    .on('mouseover',function(d){
        div.transition()
            .duration(500)
            .style("opacity", 1);
        div.html(d.properties.dataRec)
            .style("left", (d3.event.pageX) + "800");
        //.style("top", (d3.event.pageY - 28) + "10");
    })
    .on("mouseout", function(d){
        div.transition()
            .duration(500)
            .style("opacity",0);
    });

svg.append('text')
    .text('Marijuana Laws Across the US')
    .attr('transform','translate(310, 40)')
    .attr('stroke-width','.25')
    //.style('text-anchor','middle')
    .style('fill','green')
    .attr('font-size','36');

/*function updateData(selectedYear){
    return nestedData.filter(function(d){return d.key == selectedYear})[0].values;
}

function sliderMoved(value){
    newData = updateData(value);
}*/








//var colorScale = d3.scaleLinear().range([d3.schemeBlues[9]]);

/*var color = d3.scale.threshold()
    .domain([1933,1950,1970,1990,2010, 2020])
    .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);*/


/*function buttonClicked(){
    console.log('here');
}*/

/*d3.csv('./finalData.csv', function(dataIn) {


    dataRec = dataIn.filter(function (d) {
        return d.dataRec == dataRec;
    });

    dataMed = dataIn.filter(function (d) {
        return d.dataMed == dataMed;


    });
});*/

//console.log('tooltip');

/*var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#000")
    .text("a simple tooltip");

d3.select("body")
    .selectAll("div")
    .data()
    .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .text(function(d) { return d; })
    .on("mouseover", function(d){tooltip.text(d.properties.NAME); return tooltip.style("visibility", "visible");})
    //.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});*/

//d3.json('./cb_2016_us_state_20m.json', function(dataIn){

//console.log(dataIn);

/*svg.selectAll('path')
    .data(dataIn.features)
    .enter()
    .append('path')
    .attr('d',path)
    .attr('fill','green')
    .attr('stroke','darkGreen')
    .attr('stroke-width','3')
    .on('mouseover', function(d){console.log(d.properties.NAME)});*/

/*    svg.selectAll('circle1')
        .data([{lat:58.301598,long:-134.420212 }])
        .enter()
        .append('circle')
        .attr('cx', function (d){return albersProjection([d.long, d.lat])[0]})
        .attr('cy', function (d){return albersProjection([d.long, d.lat])[1]})
        .attr('r', 5)
        .attr('fill','greenYellow')
        .attr('stroke','black');

    svg.selectAll('circle2')
        .data([{lat:32.377716,long:-86.300568 }])
        .enter()
        .append('circle')
        .attr('cx', function (d){return albersProjection([d.long, d.lat])[0]})
        .attr('cy', function (d){return albersProjection([d.long, d.lat])[1]})
        .attr('r', 5)
        .attr('fill','greenYellow')
        .attr('stroke','black');

    svg.selectAll('circle3')
        .data([{lat:34.746613,long:-92.288986 }])
        .enter()
        .append('circle')
        .attr('cx', function (d){return albersProjection([d.long, d.lat])[0]})
        .attr('cy', function (d){return albersProjection([d.long, d.lat])[1]})
        .attr('r', 5)
        .attr('fill','greenYellow')
        .attr('stroke','black');

    svg.selectAll('circle4')
        .data([{lat:33.448143,long:-112.096962 }])
        .enter()
        .append('circle')
        .attr('cx', function (d){return albersProjection([d.long, d.lat])[0]})
        .attr('cy', function (d){return albersProjection([d.long, d.lat])[1]})
        .attr('r', 5)
        .attr('fill','greenYellow')
        .attr('stroke','black');

    svg.selectAll('circle5')
        .data([{lat:38.576668,long:-121.493629 }])
        .enter()
        .append('circle')
        .attr('cx', function (d){return albersProjection([d.long, d.lat])[0]})
        .attr('cy', function (d){return albersProjection([d.long, d.lat])[1]})
        .attr('r', 5)
        .attr('fill','greenYellow')
        .attr('stroke','black');

            /*svg.selectAll('circle21')
        .data([{lat:42.3601,long:-71.0589 }])
        .enter()
        .append('circle')
        .attr('cx', function (d){return albersProjection([d.long, d.lat])[0]})
        .attr('cy', function (d){return albersProjection([d.long, d.lat])[1]})
        .attr('r', 3)
        .attr('fill','greenYellow')
        .attr('stroke','black');*/

    /*svg.selectAll('button')
        .attr('fill','green');*/

    /*svg.selectAll('circle')
        .data([{lat:42.3601,long:-71.0589 }])
        .enter()
        .append('circle')
        .attr('cx', function (d){return albersProjection([d.long, d.lat])[0]})
        .attr('cy', function (d){return albersProjection([d.long, d.lat])[1]})
        .attr('r', 5)
        .attr('fill','greenYellow')
        .attr('stroke','black');*/

    /*svg.append('text')
        .text('Marijuana Laws Across the U.S.')
        .attr('transform','translate(300, 100)')
        .style('text-anchor','middle')
        .style('fill','green')
        .attr('font-size','36'); */

//});

/*    console.log(dataIn);

    svg.selectAll('circles')
        .data(dataMed)
        .enter()
        .append('circle')
        .attr('class','Medical')
        .attr('r', 6)
        .attr('fill', "white");

    svg.selectAll('circles')
        .data(dataRec)
        .enter()
        .append('circle')
        .attr('class','Recreational')
        .attr('r', 3)
        .attr('fill', "white");

    /*svg.selectAll('circles')
        .data(state)
        .enter()
        .append('circle')
        .attr('class','state')
        .attr('r', 5)
        .attr('fill','white');*/

    //drawPoints(dataRec);
    //drawPoints(dataMed);

    //drawPoints(state);

//.attr('data-toggle','tooltip')
//.attr('title',function(d){
//return d.properties.STUSPS

//.append
//.attr('tooltip', function(d){tooltip(d.properties.NAME)});
//.on('mouseover', function(d){tooltip(d.properties.NAME)});
/*.on("mouseover", function(d) {
    div.transition()
        .duration(200)
        .style("opacity", .9);
    div.html(finalData(d.date) + "<br/>"  + d.close)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
})
.on("mouseout", function(d) {
    div.transition()
        .duration(500)
        .style("opacity", 0);*/
