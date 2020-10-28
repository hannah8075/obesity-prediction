#####################################
# Dependencies
#####################################

# SQLAlchemy
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import os

# Flask
from flask import Flask, jsonify, render_template
from flask_cors import CORS, cross_origin

# DB credentials for Postgres
# from db_keys import db_uri

# ML
from sklearn.linear_model import LinearRegression
import pickle



# from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')
#  or "sqlite:///db.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


#####################################
# Dependencies
#####################################

# print(db_uri)

# Set up, Connect and Reflect database
engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
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
model_file = '/models/saved_models/obesity_linear_reg.sav'
# with open(model_file, 'rb') as file:
loaded_model = pickle.load(open(model_file, 'rb'))


#####################################
# Start Flask
#####################################

CORS(app)


@app.route("/")
def welcome():
    # """ List all available api routes """
    return render_template("index.html")
    # return(
    #     f'Available Routes:</br>'
    #     f'/api/v1.0/testdata</br>'
    #     f'/api/v1.0/heightdata</br>'
    #     f'/api/v1.0/heightwithmeters</br>'
    # )


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


if __name__ == '__main__':
    app.run(debug=True)
