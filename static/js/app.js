function handleSubmit() {
    // Make an API call to gather all data and then reduce to matching the sample selected
    //TODO: 
  d3.event.preventDefault();
  var sample_values= d3.select("#sample-metadata").node().value;
  console.log(sample);
  d3.select("#stockInput").node().value = "";
  buildMetaData(sample);
}
function buildMetadata(sample) { 
  var url = `http://robdunnlab.com/projects/belly-button-biodiversity/`;
  d3.json(url).then((sample) => {
    var name = sample.names;
    var otu_ids = sample.metadata.id;
    var ethnicity = sample.metadata.ethnicity;
    var gender = sample.metadata.gender;
    var age = sample.metadata.age;
    var location = sample.metadata.location;
    var bbtype = sample.metadata.bbtype;
    var wfreq = sample.metadata.wfreq;

    var trace1 = {
      x: otu_ids,
      y: sample_values,
      type: "bar",
      mode: "horizontal"
      };
    var bubbledata = [trace1];
    var layout = {
        xaxis: { title: "OTU ID"}
      };
    Plotly.newPlot("bubble", bubbledata, layout);
    d3.json(url).then((data)=>{
      var sValues = data.sample_values.slice(0,9);
      var sLabels = data.otu_ids.slice(0,9);
      var sText = data.otu_labels.slice(0,9);
      var trace2 = {
        labels : sLabels,
        values : sValues,
        hovertext : sText,
        hoverinfo: "hovertext",
        type: "pie" 
      };
      var data2 = [trace2];
      var layout2 = {
        title: "Top 10 Samples",
        autosize: true
      };
      Plotly.newPlot("pie", data2, layout2);
    });
  });
  d3.select("#submit").on("click", handleSubmit);
};


    // Make an API call to gather all data and then reduce to matching the sample selected
    //TODO: 
  
  d3.json(URL).then((sample) =>{
    var panel = d3.select("#sample-metadata");
    panel.html("");
    console.log(data);
      
    Object.entries(sample).forEach(([key, value]) => {
      var paragraph = panel.append("p");
      paragraph.text(`${key} : ${value}`);
    });
  });

function init() {
    
    // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
    
    // Use the list of sample names to populate the select options
    // d3.json("samples.json").then((data) => {
    //   var sampleNames = data.names;
      
    //   // Use the first sample from the list to build the initial plots
    //   var firstSample = sampleNames[0];
    //   buildCharts(firstSample);
    //   buildMetadata(firstSample);
    d3.json("names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
}

// function optionChanged(newSample) {
//       // Loop through sampleNames to add "option" elements to the selector
//       //TODO: 


//   };
  
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();