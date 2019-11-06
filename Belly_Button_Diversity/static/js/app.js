async function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  // ${route}
  // Use `d3.json` to fetch the metadata for a sample
    let metadataUrl = "/metadata/" + `${sample}`; // NB backticks
    const sampleMetadata = await d3.json(metadataUrl);    
    console.log(sampleMetadata);
    console.log(metadataUrl)
    // console.log(sampleMetadata.length)
    console.log(Object.entries(sampleMetadata))
    // Use d3 to select the panel with id of `#sample-metadata`
    let panelDiv = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    panelDiv.html("")
    for (const [key, value] of Object.entries(sampleMetadata)) {
      console.log(`${key}: ${value}`)
      panelDiv.append("p").append("strong").text(`${key}: ${value}`)  
    }
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

async function buildCharts(sample) {
  let sampleUrl = "/samples/" + `${sample}`;
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  let sampleData = await d3.json(sampleUrl);
  console.log(sampleData)
  console.log(sampleData.otu_ids)
  console.log(sampleData.otu_ids.slice(0,10))

  // @TODO: Build a Bubble Chart using the sample data
  const bubbleTrace = {
    x: sampleData.otu_ids,
    y: sampleData.sample_values,
      mode: "markers",
      type: "scatter",
      // name: "Bubble Chart",
      marker: {
        size: sampleData.samples_values,
        color: sampleData.otu_ids
      }
    };
    const bubbleLayout = {
      title: "Bubble Chart",  
    }

  const bubbleData = [bubbleTrace]
  Plotly.newPlot("bubble", bubbleData, bubbleLayout)

  // data = [trace, xx]
  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 sample_values,
  // otu_ids, and labels (10 each).
  // slice(0,10)

  const pieTrace = {
    values: sampleData.otu_ids.slice(0,10), 
    labels: sampleData.otu_ids,
    type: "pie"
  }

  const pieData = [pieTrace]

  const pieLayout = {
    title: "pie chart",
    height: 400,
    width: 500,
    hovertext: sampleData.otu_labels
  }
  Plotly.newPlot("pie", pieData, pieLayout)
}

// Create a PIE chart that uses data from your samples route (/samples/<sample>) to display the top 10 samples.
// Use sample_values as the values for the PIE chart.
// Use otu_ids as the labels for the pie chart.
// Use otu_labels as the hovertext for the chart.

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