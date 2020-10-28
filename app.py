#####################################
# Dependencies
#####################################

# SQLAlchemy
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

# Flask
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS, cross_origin

# DB credentials for Postgres
from db_keys import db_uri

# ML

from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import pickle

#####################################
# Dependencies
#####################################

# print(db_uri)

# Set up, Connect and Reflect database
engine = create_engine(f'{db_uri}')
Base = automap_base()
Base.prepare(engine, reflect=True)

# Save references to each table
obesity_data = Base.classes.obesity
height_data = Base.classes.height_form


# Get Height Data first
session = Session(engine)
heightDataMeters = session.query(
    height_data.height_label,
    height_data.meters
).order_by(height_data.meters
           ).all()
session.close
# convert to dataframe
height_data_meters_df = pd.DataFrame(heightDataMeters)

# Load model file
model_file = 'models/saved_models/obesity_random_forest.sav'
# with open(model_file, 'rb') as file:
loaded_model = pickle.load(open(model_file, 'rb'))


#####################################
# Start Flask
#####################################
app = Flask(__name__)
CORS(app)


@app.route("/")
def welcome():
    """ List all available api routes """
    # return render_template("../../dewi/index.html")
    return(
        f'Available Routes:</br>'
        f'/api/v1.0/testdata</br>'
        f'/api/v1.0/heightdata</br>'
        f'/api/v1.0/heightwithmeters</br>'
    )


@app.route("/api/v1.0/testdata")
def returnAll():
    """ Returns all detail data for vehicles."""
    # Open session
    session = Session(engine)
    allData = session.query(
        obesity_data.gender,
        obesity_data.age,
        obesity_data.height,
        obesity_data.weight
    ).all()
    session.close
    return(jsonify(allData))


@app.route("/api/v1.0/heightdata", methods=['GET'])
def returnHeights():
    """ Returns height data for form. """
    return(jsonify(height_data_meters_df['height_label'].values.tolist()))


@app.route("/api/v1.0/heightwithmeters", methods=['GET'])
def returnFeetAndMeters():
    """ Returns hight data in feet/inches and meters. """
    session = Session(engine)
    heightDataMeters = session.query(
        height_data.height_label,
        height_data.meters
    ).order_by(height_data.meters).all()
    session.close
    return(jsonify(heightDataMeters))

@app.route("/api/v1.0/obesityml", methods=['GET', 'POST'])
def run_models():
    if request.method == 'POST':   
        model_param = request.json
        print(model_param)
        print(model_param["Age"])
    
    #load model and decoder for obesity
    loaded_model = pickle.load(open("models/saved_models/obesity_random_forest.sav", 'rb'))
    loaded_decoder = pickle.load(open('models/saved_models/obesity_decoder.sav', 'rb'))

    weight = model_param["Weight"]/2.205 
    print(weight)
    prediction = loaded_model.predict([[model_param["Age"], model_param["Height"], weight, model_param["vegetables"], model_param["main_meals"], model_param["water"], model_param["physical_activity"], 
                            model_param["technology_use"], model_param["Gender_Male"], model_param["family_history_with_overweight_yes"], model_param["high_caloric_food_yes"], 
                            model_param["food_between_meals_Frequently"], model_param["food_between_meals_Sometimes"], model_param["food_between_meals_no"], 
                            model_param["SMOKE_yes"], model_param["monitor_calories_yes"], model_param["alcohol_Frequently"], model_param["alcohol_Sometimes"], model_param["alcohol_no"], 
                            model_param["transportation_Bike"], model_param["transportation_Motorbike"], model_param["transportation_Public_Transportation"], 
                            model_param["transportation_Walking"]]])
    int_predict = [int(prediction[0])]

    # decode label
    outcome_array = loaded_decoder.inverse_transform(int_predict)
    obesity_status = outcome_array[0]
    obesity_status_clean = obesity_status.replace("_"," ")
    print(obesity_status_clean)

    print(f'Our prediction for your health status: {obesity_status_clean}')

    # load the model for medical cost
    loaded_model = pickle.load(open('models/saved_models/insurance_random_forest.sav', 'rb'))
    bmi = weight/model_param["Height"]**2
    prediction = loaded_model.predict([[model_param["Age"], bmi, model_param["children"], model_param["Gender_Male"], model_param["SMOKE_yes"], 
                                        model_param["region_northwest"], model_param["region_southeast"], model_param["region_southwest"]]])
    medical_cost =round(prediction[0],2)
    print(f'Our prediction for your annual medical cost: ${medical_cost}')
    
    # result = str("Our prediction for obesity status is " , obesity_status , "and your annual medical cost will be " , medical_cost , ".")
    result = f'Our prediction for obesity status is {obesity_status_clean} and your annual medical cost will be ${medical_cost}'

    return jsonify(result)

    
if __name__ == '__main__':
    app.run(debug=True)
