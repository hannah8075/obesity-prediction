
// Get D3 objects
var heightSelect = d3.select("#height-select");
var sexRadio = d3.select("sex");

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

function submitToML(){
    //sex
    var ele = document.getElementsByName('sex');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        console.log(ele[i].value); 
    } 

    // var sexChosen = sexRadio.property("value");
    // console.log(`Chosen sex: ${sexChosen}`);

    // height
    var heightChosen = heightSelect.property("value");
    console.log(`Chosen height: ${heightChosen}`);
};

fetchHeightList();

// view data
console.log(heights);



