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
# from db_keys import db_uri


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

# print(obesity_data)

#####################################
# Start Flask
#####################################
app = Flask(__name__)


@app.route("/")
def welcome():
    """ List all available api routes """
    return(
        f'Available Routes:</br>'
        f'/api/v1.0/testdata</br>'
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


if __name__ == '__main__':
    app.run(debug=True)
