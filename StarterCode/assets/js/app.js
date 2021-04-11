// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  // Append an SVG group
  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //Load data drom data.csv
  d3.csv("/StarterCode/assets/data/data.csv").then(function(data){
      //Create Scale functions
      var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d=>d.poverty), d3.max(data, d=>d.poverty)])
      .range([0,width])

      var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d=>d.healthcare), d3.max(data, d=>d.healthcare)])
      .range([height, 0])

      //Create axis functions
      var bottomAxis = d3.axisBottom(xLinearScale)
      var leftAxis = d3.axisLeft(yLinearScale)

      //Append Axes to the chart
      chartGroup.append("g")
        .attr("transform",`translate(0, ${height})`)
        .call(bottomAxis)

      chartGroup.append('g')
        .call(leftAxis)

      //Create circles
      var circlesGroup = chartGroup.selectAll("circles")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d=> {
          //return xLinearScale(d.poverty)
          return d.poverty
        })
        .attr("cy", d=> {
          //console.log(yLinearScale(d.healthcare))
          return d.healthcare
        })
        .attr("r", 10)
        .attr("fill", "blue")
        .attr("opacity", ".5")
      
        .append('text')
        .text(d => d.abbr)

        //How to put state abbr inside of the circles?
      d3.selectAll('.stateText').each(function() {
        d3.select(this).attr('dx', d => {
          return xLinearScale(d.poverty)
        })
      })
     
        // Create axes labels
      chartGroup.append("text")
        .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)");

      chartGroup.append("text")
       .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
      }).catch(function(error) {
        console.log(error);
  })
