//Width and height
var width = 500;
var height = 500;

// Define projection
var projection = d3.geoAlbers()
//https://stackoverflow.com/questions/14492284/center-a-map-in-d3-given-a-geojson-object
	.fitSize([width, height]);

//Define path generator
var path = d3.geoPath(projection)

//Create SVG element
var svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height);

//Load in GeoJSON data
d3.json("israel.json", function(json) {
	
	//Bind data and create one path per GeoJSON feature
	svg.selectAll("path")
	   .data(json.features)
	   .enter()
	   .append("path")
	   .attr("d", path);
});