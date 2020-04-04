function build Gauge(sample) {
    d3.json("samples.json").then((data)=> {
        var values = data.metadata
        var place;
        for (var i=0; i<values.length;i++) {
            if (values[i].id===+sample){
                place = i;
                break;
            }
        }
        var foundSample = values[place].wfreq;
        console.log(`positve sample ${foundSample}`);
        var data = [
            {domain: { x: [0, 1], y: [0, 1] },
            value: foundSample,
            title: { text: "Belly Button Scrubs per Week" },
            type: "indicator",
            mode: "gauge+number+delta",
            delta: { reference: foundSample },
            gauge: 
                {axis: { range: [null, 9] },
                steps: [
                    { range: [0,1], color: "#ecdcd5"},
                    { range: [1,2], color: "#e2cbc0" },
                    { range: [2,3], color: "#d9baab" },
                    { range: [3,4], color: "#d0a896" },
                    { range: [4,5], color: "#c69781" },
                    { range: [5,6], color: "#bc866c" },
                    { range: [6,7], color: "#b37557" },
                    { range: [7,8], color: "#aa6342" },
                    { range: [8,9], color: "#a0522d" }],
                threshold: {
                    line: { color: "black", width: 5 },
                    thickness: 1,
                    value: foundSample
                }
            }
     
        }
    ];

        var layout = {width: 600, height: 500, margin(t:0, B:0}};
        Plotly.newPlot("gauge", data, layout);
    });
};