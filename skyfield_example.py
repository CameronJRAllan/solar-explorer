from skyfield.api import load, now, JulianDate
import sys
import json

# Load ephemeris
planets = load('de421.bsp')

# Define planets
earth = planets['earth']
jupiter = planets['jupiter barycenter']
mars = planets['mars']
mercury = planets['mercury']
moon = planets['moon']
pluto = planets['pluto barycenter']
sun = planets['sun']
saturn = planets['saturn barycenter']
venus = planets['venus']
uranus = planets['uranus barycenter']

# Set arguments to variables
hour = int(sys.argv[4])
day = int(sys.argv[3])
month = int(sys.argv[2])
year = int(sys.argv[1])

# Date format is YEAR, MONTH, DAY
date = JulianDate(utc=(year, month, day, hour))

# Declare dictionary
information={}

# Store 3 dimensional vector
information[0,1] = earth.at(date).position.au
information[1,1] = jupiter.at(date).position.au
information[2,1] = mars.at(date).position.au
information[3,1] = mercury.at(date).position.au
information[4,1] = moon.at(date).position.au
information[5,1] = pluto.at(date).position.au
information[6,1] = sun.at(date).position.au
information[7,1] = saturn.at(date).position.au
information[8,1] = venus.at(date).position.au
information[9,1] = uranus.at(date).position.au

print(json.dumps(information))
# Print positions
print information[0, 1]