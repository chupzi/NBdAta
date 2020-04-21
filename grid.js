//Nikhil Deo, Almaze Lema, Mathew Levine, Alan Lu

function onYearChanged() {
    var select = d3.select('#scaleSelect').node();
    // Get current value of select element, save to global currentYear
    currentYear = select.options[select.selectedIndex].value
    slider.value = sliderHelper[currentYear];
    // Update chart
    updateChart();
}

function updateChart(){
    console.log(dataset[currentYear]["Season"]);
    
    //data[0] is 2019-2020 season. data[40] is that last (1979-1980).

    //3s made
    made = dataset[currentYear]["3P"];

    //3s taken. 
    threeAttempts = dataset[currentYear]["3PA"];

    //total shots taken
    totalShots = dataset[currentYear]["FGA"];

    //total twos taken. 
    totalTwosTaken = totalShots - threeAttempts;

    // Ratio:  3s made / total shots taken
    threeToShotRatio = made / totalShots;

    //how many blocks should be made for threes made.
    ThreeMadeBlocks = Math.round(threeToShotRatio * 600) // 600 = total amount of blocks.

    //how many threes were attempted  to  how many total shots taken
    threeAttemptsToShotAttemptsRatio = threeAttempts / totalShots;

    //how many blocks should represent threes attempted. Here it doesn't account for overlap of threes made and three
    //take. Check line 103 to 110 for that logic
    threeAttemptsBlocks = Math.round(threeAttemptsToShotAttemptsRatio * 600);

    //How many left over that need to be colored (total twos attempted). This isn;t neccesary to calculate,
    //because in lines 103-110ish, we could just color what ever is left over grey, but this helps prove our
    //scale system works, becayse the total of all blocks equals 600.  
    totalFGBlocks = Math.round(totalTwosTaken / totalShots * 600);

    //Update Statistics Displayed on Screen
    document.getElementById("3PMStat").innerHTML = made;
    document.getElementById("3PAStat").innerHTML = threeAttempts;
    document.getElementById("FGAStat").innerHTML = totalShots;
    document.getElementById("3PA_FGAStat").innerHTML = threeAttemptsToShotAttemptsRatio.toFixed(3);

    updateGraph(false);
}

var svg = d3.select('svg');
var xScale;

// Get layout parameters
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = {t: 40, r: 40, b: 40, l: 40};

// Compute chart dimensions
var chartWidth = svgWidth - padding.l - padding.r;
var chartHeight = svgHeight - padding.t - padding.b;

var grid = svg.append('g')
    .attr('transform', 'translate('+[padding.l, padding.t]+')')
    .attr("class", "grid");


//This is the graph legend, on right side of screen.
var legend = d3.select("#legendSVG");

//This adds the green circle representing 3s made to the legend
legend.append('circle')
    .attr("cx", 25)
    .attr("cy", 20)
    .attr("r", 7)
    .style("fill", "#44b32e")
    .style("stroke", "#000000");

//This adds the red circle representing 3s missed to the legend
legend.append('circle')
    .attr("cx", 25)
    .attr("cy", 70)
    .attr("r", 7)
    .style("fill", "#e3372b")
    .style("stroke", "#000000");

//This adds the grey circle representing total 2s taken to the legend
legend.append('circle')
    .attr("cx", 25)
    .attr("cy", 120)
    .attr("r", 7)
    .style("fill", "#575a5e")
    .style("stroke", "#000000");

//This adds the green circle at the end of the legend 
legend.append('circle')
    .attr("cx", 25)
    .attr("cy", 170)
    .attr("r", 7)
    .style("fill", "#44b32e")
    .style("stroke", "#000000");


//This adds the red circle at the end of the legend
legend.append('circle')
    .attr("cx", 55)
    .attr("cy", 170)
    .attr("r", 7)
    .style("fill", "#e3372b")
    .style("stroke", "#000000");

//This is text for the first legend entry (3s made)
legend.append("text")
    .attr("x", 40)
    .attr("y", 21)
    .text("3 pointers made")
    .style("font-size", "15px")
    .attr("alignment-baseline","middle")

//This is text for the second legend entry (3s missed)
legend.append("text")
    .attr("x", 40)
    .attr("y", 71)
    .text("3 pointers missed")
    .style("font-size", "15px")
    .attr("alignment-baseline","middle")

//This is text for the third legend entry (total 2s taken)
legend.append("text")
    .attr("x", 40)
    .attr("y", 121)
    .text("Total 2 pointers taken")
    .style("font-size", "15px")
    .attr("alignment-baseline","middle")

//This is the plus sign for the last legend entry
legend.append("text")
    .attr("x", 35)
    .attr("y", 170)
    .text("+")
    .style("font-size", "15px")
    .attr("alignment-baseline","middle")

//The text for the last legend entry with (green circle) + (red circle) = total 3s taken
legend.append("text")
    .attr("x", 70)
    .attr("y", 170)
    .text(" = Total 3 pointers taken")
    .style("font-size", "15px")
    .attr("alignment-baseline","middle")


function updateGraph(first) {
    // if (!first) {
    //     grid.selectAll(".row").remove();
    // }

    var gridDat = gridData();

    var row = grid.selectAll(".row")
        .data(gridDat);
    
    row.enter().append("g")
        .attr("class", "row");

    var circles = row.selectAll(".circle")
        .data(function(d) { return d; });
    
    circles.enter().append("circle")
        .attr("class", "circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return 7; })
        //this is where the coloring gets done. threes made, then threes attempted, accounting for overlap,
        //then total shots taken
        .style("fill", function(d) {
            if (ThreeMadeBlocks > 0) {
                ThreeMadeBlocks--;
                threeAttemptsBlocks--;
                return "#44b32e";
            } else if (ThreeMadeBlocks == 0 && threeAttemptsBlocks > 0) {
                threeAttemptsBlocks--;
                return "#e3372b";
            } else if (ThreeMadeBlocks == 0 && threeAttemptsBlocks == 0 && totalFGBlocks > 0) {
                totalFGBlocks--;
                return "#575a5e";
            } else {
                return "fff";
            }
        })
        .style("stroke", "#000000");
        // .transition().duration(750);

    circles.style("fill", function(d) {
        if (ThreeMadeBlocks > 0) {
            ThreeMadeBlocks--;
            threeAttemptsBlocks--;
            return "#44b32e";
        } else if (ThreeMadeBlocks == 0 && threeAttemptsBlocks > 0) {
            threeAttemptsBlocks--;
            return "#e3372b";
        } else if (ThreeMadeBlocks == 0 && threeAttemptsBlocks == 0 && totalFGBlocks > 0) {
            totalFGBlocks--;
            return "#575a5e";
        } else {
            return "fff";
        }
    })
}

function gridData() {
    console.log("test");
    var data = new Array();
    var xpos = 10; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = chartHeight;
    var width = 17; //size of cells
    var height = 20; //size of cells

    // iterate for rows	
    for (var column = 0; column < 30; column++) {
        data.push(new Array());

        // iterate for cells/columns inside rows
        for (var row = 0; row < 20; row++) {
            data[column].push({
                    x: xpos,
                    y: ypos,
                    width: width,
                    height: height,
                })
                // increment the x position. I.e. move it over by 50 (width variable)
            ypos -= height;
        }
        // reset the x position after a row is complete
        ypos = chartHeight;
        // increment the y position for the next row. Move it down 50 (height variable)
        xpos += height;
    }
    return data;
}

d3.csv("NBData.csv", function(error, data) {
    if (error) throw error;

    //Creating global instance of the dataset for functions outside this
    dataset = data;

    xScale = d3.scaleLinear()
    .range([0, chartWidth]);


    // format the data
    data.forEach(function(d) {
        d["3P"] = +d["3P"];
        d["3PA"] = +d["3PA"];
    })
    //Global variable for the current year
    currentYear = 0

    chartScales = {x: '1'};
    sliderHelper = new Array();
    currentYearHelper = 0;
    for (var i = 0; i < dataset.length; i++) {
        str = dataset[i]["Season"]
        sliderHelper.push(str.substring(0,str.length-3));
    }
    updateChart();
    updateGraph(true);
});

var slider = document.getElementById("yearRange");
//var output = document.getElementById("yearSliderValue");
//output.innerHTML = slider.value;

slider.oninput = function() {
  //output.innerHTML = this.value;
  currentYear = 2019 - slider.value;
  select = d3.select('#scaleSelect').node();
  select.value = currentYear;
  updateChart()
}