async function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  let metadataUrl = "/metadata/" + `${sample}`; // NB backticks
  const sampleMetadata = await d3.json(metadataUrl);

  // Display data in console.log for debugging.
  console.log(sampleMetadata);
  console.log(metadataUrl)
  console.log(Object.entries(sampleMetadata))

  // Use d3 to select the panel with id of `#sample-metadata`
  let panelDiv = d3.select("#sample-metadata");
  // Use `.html("") to clear any existing metadata
  
  panelDiv.html("")
  
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.
  for (const [key, value] of Object.entries(sampleMetadata)) {
    console.log(`${key}: ${value}`)
    panelDiv.append("p").append("strong").text(`${key}: ${value}`)  
  }

  // BONUS: Build the Gauge Chart
  // buildGauge(data.WFREQ);
}

async function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  let sampleUrl = "/samples/" + `${sample}`;
  let sampleData = await d3.json(sampleUrl);
  
  // Cast data to numbers/integers
  sampleData.samples_values = sampleData.sample_values.map(d => +d);
  
  console.log(sampleData);
  console.log(sampleData.otu_ids);
  console.log(sampleData.otu_ids.slice(0,10));
  console.log(sampleData.otu_labels.slice(0,10));

  // @TODO: Build a Bubble Chart using the sample data
  const bubbleTrace = {
    x: sampleData.otu_ids,
    y: sampleData.sample_values,
    mode: "markers",
    type: "scatter",
    hovertext: sampleData.otu_labels,
    hoverinfo: "text",
    marker: {
      text: sampleData.otu_labels, 
      size: sampleData.samples_values,
      color: sampleData.otu_ids
      }
    };
    const bubbleLayout = {
      // title: "Bubble Chart",
      xaxis:{title: "OTU ID"},
      text: sampleData.otu_labels
    }

  const bubbleData = [bubbleTrace]
  Plotly.newPlot("bubble", bubbleData, bubbleLayout)

  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 sample_values,
  // otu_ids, and labels (10 each).
  // slice(0,10) MAX?
  // Create a PIE chart that uses data from your samples route (/samples/<sample>) to display the top 10 samples.
  // Use sample_values as the values for the PIE chart.
  // Use otu_ids as the labels for the pie chart.
  // Use otu_labels as the hovertext for the chart.

  // 1. define pie trace
  const pieTrace = {
    values: sampleData.sample_values.slice(0,10), 
    labels: sampleData.otu_ids.slice(0,10),
    type: "pie",
    hovertext: sampleData.otu_labels.slice(0,10),
    hoverinfo: "text"
  }

  const pieData = [pieTrace]

  const pieLayout = {
    // title: "pie chart",
    height: 500,
    width: 1000,
    text: sampleData.otu_labels.slice(0,10).map(d=>d)
  }
  // Plot. "pie" is div. 
  Plotly.newPlot("pie", pieData, pieLayout)
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();