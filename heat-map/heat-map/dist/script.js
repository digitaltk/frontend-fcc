const projectName = 'heat-map';
localStorage.setItem('example_project', 'Heat Map');

window.onload = async _ => {
  const data = await d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json");

  // set title
  d3.select('#wrapper').
  append('h1').
  text('Temperature History in Harare').
  style('text-align', 'center').
  attr('id', 'title');

  d3.select('#wrapper').
  append('h2').
  text(`1783 up to date: base temperature: ${data.baseTemperature}`).
  style('text-align', 'center').
  attr('id', 'description');

  async function createHeatMap(graphWidth = 1200, graphHeight = 600, graphPadding = 70) {
    const svg = d3.select('#wrapper').
    append('svg').
    attr('width', graphWidth + graphPadding * 2).
    attr('height', graphHeight + graphPadding * 2);

    const [xMin, xMax] = d3.extent(data.monthlyVariance.map(d => d.year)),
    [yMin, yMax] = d3.extent(data.monthlyVariance.map(d => d.month)),
    [colMin, colMax] = d3.extent(data.monthlyVariance.map(d => d.variance));
    const xDomain = [...new Set(data.monthlyVariance.map(d => d.year))],
    // Date object month range is [0, 11]
    yDomain = [...new Set(data.monthlyVariance.map(d => d.month - 1))],
    colDomain = [...new Set(data.monthlyVariance.map(d => d.variance))];
    const xTickValues = [...new Set(xDomain.filter(val => val % 10 == 0))];

    // scales
    const xScale = d3.scaleBand().
    domain(xDomain).
    range([0, graphWidth]),

    yScale = d3.scaleBand().
    domain(yDomain).
    range([graphHeight, 0]),

    colorScale = d3.scaleLinear().
    domain([colMin, colMax]).
    range([1, 0]);

    // blue-red color scheme
    const blueRed = d3.scaleDiverging(d3.interpolateRdYlBu);


    // axes
    const xAxis = svg.append('g').
    call(d3.axisBottom(xScale).tickValues(xTickValues)).
    attr('id', 'x-axis').
    attr("transform", `translate(${graphPadding}, ${graphHeight + graphPadding})`);

    const yAxis = svg.append('g').
    call(d3.axisLeft(yScale).tickFormat(d => {
      let month = new Date(null);
      month.setUTCMonth(d);
      return d3.utcFormat("%B")(month);
    })).
    attr('id', 'y-axis').
    attr("transform", `translate(${graphPadding}, ${graphPadding})`);

    // data
    svg.selectAll("rect").
    data(data.monthlyVariance).
    enter().
    append("rect").
    attr("x", d => xScale(d.year)).
    attr("y", d => yScale(d.month - 1)).
    attr("width", xScale.bandwidth()).
    attr("height", yScale.bandwidth()).
    attr('class', 'cell').
    attr('data-year', d => d.year).
    attr('data-month', d => d.month - 1).
    attr('data-temp', d => d.variance).
    style("fill", d => blueRed(colorScale(d.variance))).
    attr("transform", `translate(${graphPadding + xScale.bandwidth() / 2 - 1}, ${graphPadding})`).
    on('mouseover', d => {
      d3.select('#tooltip').
      attr('data-year', d.year).
      html(`Date: ${d.year}-${d.month}<br>variance = ${d.variance}`).
      style('visibility', 'visible').
      style('top', `${Math.floor(yScale(d.month - 1)) + graphPadding + xScale.bandwidth() + 60}px`).
      style('left', `${Math.floor(xScale(d.year)) + graphPadding + 15}px`);
    }).
    on('mouseleave', d => {
      d3.select('#tooltip').style('visibility', 'hidden');
    });

    // legend
    const legend = svg.append('svg').
    attr('id', 'legend').
    attr('width', 350).
    attr('height', 70).
    attr("x", graphPadding).
    attr('y', graphHeight + graphPadding + 30);

    const legendRange = d3.range(colMin, colMax, (colMax - colMin) / 10);
    const legendScale = d3.scaleBand().
    domain(legendRange).
    range([0, 300]);

    // create another scaleBand
    const xAxisLegend = legend.append('g').
    call(
    d3.axisBottom(legendScale).
    tickFormat(d3.format(".1f"))).

    attr("transform", `translate(0, 15)`);

    // add discret box with colors
    legend.selectAll('rect').
    data(legendRange).
    enter().
    append('rect').
    attr("width", legendScale.bandwidth()).
    attr("height", 15).
    attr("x", d => legendScale(d)).
    attr("y", d => 0).
    attr('fill', d => blueRed(colorScale(d)));


    // tooltip
    const tooltip = d3.select('#wrapper').
    append('div').
    attr('id', 'tooltip').
    attr('data-year', '') // to be filled by mousover
    .style('visibility', 'hidden').
    style('background', 'rgba(255,255,255,0.7)');

  }
  createHeatMap();
};