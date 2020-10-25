

var heights = [];

function fetchHeightList() {
    console.log('Fetching height list...')
    
    response = fetch('http://127.0.0.1:5000/api/v1.0/heightdata', {
        method: 'GET'
    }).then(function (response){
        return response.json()
    }).then((data)=> {
        data.map(function (height) {
            if (!heights.includes(height)) {
                heights.push(height);
            }
        });
        // console.log(data)
    })

}
    
fetchHeightList();

// this output works
console.log(heights);

// no output from here
heights.forEach((height) => {
    console.log(height)
})

var heightSelect = d3.select("#height-select");
// console.log(heightSelect);
heights.forEach((height) => {
    var newHeight = heightSelect.append("option");
    newHeight.text(height)
});
