//Width and height
var width = 800;
var height = 500;

//Create SVG element
var svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height);

var colorDomain = [];
for (var i=0; i<8;i+=.3){
	colorDomain.push(i);
}

//Define quantize scale to sort data values into buckets of color
var color = d3.scaleThreshold()
	.domain(colorDomain)
    //.range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);
    .range(d3.schemeReds[9]);


//Load in csv data
d3.csv("pop_dense.csv", function(data) {

	/*
	//Set input domain for color scale
	color.domain([
		d3.min(data, function(d) { return ((d.population/d.area)*1000); }), 
		d3.max(data, function(d) { return ((d.population/d.area)*1000); })
	]);
	*/



	//Load in GeoJSON data
	d3.json("israel.json", function(error, json) {
		if (error) throw error;


		var projection = d3.geoMercator()
			.fitSize([width, height], json);

		var path = d3.geoPath()
			.projection(projection);


		//Merge the population data and GeoJSON
		for (var i = 0; i < data.length; i++) {
			//Grab district name
			var dataDistrict = data[i].district;
			
			//Grab population value, and convert from string to float
			var dataPopulation = parseFloat(data[i].population);
			//Grab area value, and convert from string to float
			var dataArea = parseFloat(data[i].area);
			var density = (dataPopulation/dataArea)*1000;


			//Find the corresponding district inside the GeoJSON
			for (var j = 0; j < json.features.length; j++) {
				var jsonDistrict = json.features[j].properties.name;

				if (dataDistrict == jsonDistrict) {
					//Copy the data value into the JSON
					json.features[j].properties.value = density;
					//Stop looking through the JSON
					break;		
				}
			}	
		}


		//Bind data and create one path per GeoJSON feature
		svg.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			.attr("d", path)
			.style("fill", function(d) {
				//Get data value
				var value = d.properties.value;

				if (value) {
					//If value exists…
					console.log("value exists")
					console.log(value)
					return color(value);
				} else {
					//If value is undefined…
					return "#ccc";
				}
			});



	});

});
