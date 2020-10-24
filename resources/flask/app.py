#####################################
# Dependencies
#####################################
# SQLAlchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
# Flask
from flask import Flask, jsonify
# DB credentials for Postgres
from db_keys import db_uri
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

# print(obesity_data)

#####################################
# Start Flask
#####################################
app = Flask(__name__)


# Get Height Data first
session = Session(engine)
heightDataMeters = session.query(
    height_data.height_label,
    height_data.meters
).all()
session.close
height_data_meters_df = pd.DataFrame(heightDataMeters)
print(height_data_meters_df['height_label'])


@app.route("/")
def welcome():
    """ List all available api routes """
    return(
        f'Available Routes:</br>'
        f'/api/v1.0/testdata</br>'
        f'/api/v1.0/heightdata</br>'
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


@app.route("/api/v1.0/heightdata")
def returnHeights():
    """ Returns height data for form. """
    # session = Session(engine)
    # heightData = session.query(
    #     height_data.height_label
    # ).all()
    # heightDataMeters = session.query(
    #     height_data.height_label,
    #     height_data.meters
    # ).all()
    # session.close
    return(jsonify(heightDataMeters))


if __name__ == '__main__':
    app.run(debug=True)
