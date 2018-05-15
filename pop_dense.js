//Width and height
var w = 500;
var h = 500;

//Define path generator
var path = d3.geoPath()

//Create SVG element
var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

//Load in GeoJSON data
d3.json("israel.json", function(json) {
	
	//Bind data and create one path per GeoJSON feature
	svg.selectAll("path")
	   .data(json.features)
	   .enter()
	   .append("path")
	   .attr("d", path);
});