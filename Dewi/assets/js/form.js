
// Get D3 objects
var ageInput = d3.select("#age-input");
var heightSelect = d3.select("#height-select");
var weightInput = d3.select("#weight-input");
var mealsInput = d3.select("#meal-count");
var snacksSelect = d3.select("#between-meals");
var waterInput = d3.select("#water-input");
var activityInput = d3.select("#phys-activity-input");
var techUseInput = d3.select("#tech-use-input");
var alcolholSelect = d3.select("#alcohol");
var transportSelect = d3.select("#transportation");

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

    // validate free form boxes


    // sex
    var ele = document.getElementsByName('sex');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) {
        var sexChoice = ele[i].value;
        console.log(`Chosen sex: ${sexChoice}`);
        } 
    } 

    // age
    var ageEntered = ageInput.property("value");
    console.log(`Age: ${ageEntered}`);

    // height
    var heightChosen = heightSelect.property("value");
    console.log(`Chosen height: ${heightChosen}`);

    // weight
    var weightEntered = weightInput.property("value");
    console.log(`Weight: ${weightEntered}`);

    // family history
    var ele = document.getElementsByName('familyHistory');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked){ 
        var historyChoice = ele[i].value;
        console.log(`Family History: ${historyChoice}`);
        } 
    } 

    // main meals per day
    var mealsEntered = mealsInput.property("value");
    console.log(`Main Meals: ${mealsEntered}`);

    // food between meals
    var snacksChosen = snacksSelect.property("value");
    console.log(`Snacks: ${snacksChosen}`)

    // high calorie foods
    var ele = document.getElementsByName('highCalorie');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked){ 
        var highCalChoice = ele[i].value;
        console.log(`High Calorie Foods: ${highCalChoice}`);
        } 
    } 

    // monitor calories
    var ele = document.getElementsByName('calories');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked){ 
        var monitorCaloriesChoice = ele[i].value;
        console.log(`Monitor Calories: ${monitorCaloriesChoice}`);
        } 
    } 

    // smoke
    var ele = document.getElementsByName('smoker');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) {
        var smokerChoice = ele[i].value;
        console.log(`Smoker: ${smokerChoice}`);
        } 
    } 

    // water intake
    var waterEntered = waterInput.property("value");
    console.log(`Water Intake: ${waterEntered}`)

    // physical activity
    var activityEntered = activityInput.property("value");
    console.log(`Activity: ${activityEntered}`)

    // technology use
    var techUseEntered = techUseInput.property("value");
    console.log(`Tech Use: ${techUseEntered}`)

    // alcohol use
    var alcoholChoice = alcolholSelect.property("value");
    console.log(`Alcohol: ${alcoholChoice}`)

    // transportation
    var transportChoice = transportSelect.property("value");
    console.log(`Transportation: ${transportChoice}`)
};

fetchHeightList();

// view data
console.log(heights);



