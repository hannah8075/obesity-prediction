
// Initialize emtpy array but not sure it's needed
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
            var heightSelect = d3.select("#height-select");
            var newHeight = heightSelect.append("option");
            newHeight.text(height)
        });
        // console.log(data)
    })

}
    
fetchHeightList();

// view data
console.log(heights);



