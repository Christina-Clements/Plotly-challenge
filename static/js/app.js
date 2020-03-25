
    // Make an API call to gather all data and then reduce to matching the sample selected
    //TODO: 

function init() {
    
    // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
    
    // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
      
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
      

      // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  });
}

var url = "samples.json";
function buildMetadata(sample) {
  d3.json(url).then((data) => {
    console.log(data);
    var metadata = data.metadata;
    var resultArray = metadata.filter(metadataSample => metadataSample.id == sample);
    var result = resultArray[0];
    var panel = d3.select("#sample-metadata");
    panel.html("");

    Object.entries(result).forEach(([key, value]) => {
      var paragraph = panel.append("p");
      paragraph.text(`${key} : ${value}`);
    });
  });
}

function buildCharts(sample) {
  d3.json(url).then((data) =>{
    console.log(data)
    var samples = data.samples;
    var resultArray = samples.filter(samplesSample => samplesSample.id == sample);
    var otuSample = resultArray[0];
    var otu_ids = otuSample.otu_ids;
    var sample_values = otuSample.sample_values;
    var otu_labels = otuSample.otu_labels;
    var bubbleTrace = {
      x: otu_ids, 
      y: sample_values,
      text: otu_labels,
      name: "OTU IDs",
      mode: "markers"
      };
    var bubbleData = [bubbleTrace];
    var layout ={
      xaxis: {title: "OTU ID"}
      };
    Plotly.newPlot("bubble", bubbleData, layout);
  });
};
  
function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
};
  
  // Initialize the dashboard
init();