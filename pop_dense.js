//Width and height
var width = 500;
var height = 500;

//Create SVG element
var svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height);

//Load in GeoJSON data
d3.json("israel.json", function(error, json) {
	if (error) throw error;

	var conus = topojson.feature(json, {
		type: "GeometryCollection"
	});


	// Define projection
	var projection = d3.geoAlbers()
		.fitSize([width,height], conus);

	//Define path generator
	var path = d3.geoPath(projection)


	//Bind data and create one path per GeoJSON feature
	svg.selectAll("path")
	   .data(json.features)
	   .enter()
	   .append("path")
	   .attr("d", path);
});