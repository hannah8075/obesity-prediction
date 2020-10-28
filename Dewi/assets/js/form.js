
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
var veggieInput = d3.select("#veggie-input");
var childrenSelect = d3.select("#children");
var regionSelect = d3.select("#region");


// Initialize emtpy array but not sure it's needed
var heights = [];

function fetchHeightList() {
    console.log('Fetching height list...')
    
    response = fetch('http://127.0.0.1:5000/api/v1.0/heightwithmeters', {
        method: 'GET'
    }).then(function (response){
        return response.json()
    }).then((data)=> {
        data.map(function (height) {
            // var heightList = []
            var heightSelect = d3.select("#height-select");
            var newHeight = heightSelect.append("option");
            newHeight.text(height[0]).attr("value", height[1])
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
    var weightKilos = weightEntered / 2.2;
    console.log(`Weight: ${weightKilos}`);

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
    var snackNo = 0;
    var snackSometimes = 0;
    var snackFrequently = 0;
    if (snacksChosen != 3){
        switch(snacksChosen){
            case "1":
                snackNo = 1;
                break;
            case "2":
                snackSometimes = 1;
                break;
            default:
                snackFrequently = 1;
        }
    }

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

    // veggies
    var veggiesEntered = veggieInput.property("value");
    console.log(`Veggies: ${veggiesEntered}`)

    // physical activity
    var activityEntered = activityInput.property("value");
    console.log(`Activity: ${activityEntered}`)

    // technology use
    var techUseEntered = techUseInput.property("value");
    console.log(`Tech Use: ${techUseEntered}`)

    // alcohol use
    var alcoholChoice = alcolholSelect.property("value");
    console.log(`Alcohol: ${alcoholChoice}`)
    var alcoNo = 0;
    var alcoSometimes = 0;
    var alcoFrequently = 0;
    if (alcoholChoice != 3) {
        switch(alcoholChoice){
            case "1":
                alcoNo = 1;
                break;
            case "2":
                alcoSometimes = 1;
                break;
            default:
                alcoFrequently = 1;
        }
    }

    // transportation
    var transportChoice = transportSelect.property("value");
    console.log(`Transportation: ${transportChoice}`)
    var transBike = 0;
    var transMotorBike = 0;
    var transPublicTrans = 0;
    var transWalking = 0;
    if (transportChoice != 1){
        switch(transportChoice){
            case "2":
                transBike = 1;
                break;
            case "3":
                transMotorBike = 1;
                break;
            case "4":
                transPublicTrans = 1
                break;
            default:
                transWalking = 1;
        }
    }

    // children
    var childrenChoice = childrenSelect.property("value");
    console.log(`Children: ${childrenChoice}`)

    //region
    var regionChoice = regionSelect.property("value");
    console.log(`Region: ${regionChoice}`)
    var northwest = 0;
    var southeast = 0;
    var southwest = 0;
    if (regionChoice != 4){
        switch(regionChoice){
            case "1":
                northwest = 1
                break;
            case "2":
                southeast = 1;
                break;
            case "3":
                southwest = 1;
                break;
        }
    }   

    // build parameter list for linear regression model
    // model_data = [];
    // model_data.push(ageEntered, heightChosen, weightKilos, veggiesEntered, mealsEntered, waterEntered
    //     , activityEntered, techUseEntered, sexChoice, historyChoice, highCalChoice
    //     , snackFrequently, snackSometimes, snackNo, smokerChoice, monitorCaloriesChoice
    //     , alcoFrequently, alcoSometimes, alcoNo
    //     , transBike, transMotorBike, transPublicTrans, transWalking
    //     , childrenChoice, regionChoice)
    // console.log(`model data: ${model_data}`)

    
    model_param = {
        Age : parseInt(ageEntered),
        Height : parseFloat(heightChosen), 
        Weight : parseInt(weightKilos), 
        vegetables : parseInt(veggiesEntered), 
        main_meals : parseInt(mealsEntered), 
        water : parseInt(waterEntered), 
        physical_activity : parseInt(activityEntered),
        technology_use : parseInt(techUseEntered),
        Gender_Male : parseInt(sexChoice), 
        family_history_with_overweight_yes : parseInt(historyChoice), 
        high_caloric_food_yes : parseInt(highCalChoice),
        food_between_meals_Frequently : parseInt(snackFrequently), 
        food_between_meals_Sometimes : parseInt(snackSometimes), 
        food_between_meals_no : parseInt(snackNo),
        SMOKE_yes : parseInt(smokerChoice),
        monitor_calories_yes : parseInt(monitorCaloriesChoice),
        alcohol_Frequently : parseInt(alcoFrequently), 
        alcohol_Sometimes : parseInt(alcoSometimes),
        alcohol_no : parseInt(alcoNo), 
        transportation_Bike : parseInt(transBike),
        transportation_Motorbike : parseInt(transMotorBike), 
        transportation_Public_Transportation : parseInt(transPublicTrans), 
        transportation_Walking : parseInt(transWalking),
        children : parseInt(childrenChoice),
        region_northwest : parseInt(northwest),
        region_southeast : parseInt(southeast),
        region_southwest : parseInt(southwest)
    }
    console.log(model_param)
    
   
    fetch('http://127.0.0.1:5000/api/v1.0/obesityml', {
        method: 'POST',
        body: JSON.stringify(model_param),
        headers: new Headers({
            "content-type": "application/json"
            })
        }).then(function (res) {
            return res.json()
            })

            // .then(function (res2) {
            //     d3.select('.ml-result')
            //     .append("p").text("Your results here");
            // })

};

fetchHeightList();

// view data
console.log(heights);



