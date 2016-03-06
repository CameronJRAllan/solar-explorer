from skyfield.api import load, now, JulianDate
import sys
import json

# Load ephemeris
planets = load('de422.bsp')

# Define planets
earth   = planets['earth barycenter']
jupiter = planets['jupiter barycenter']
mars    = planets['mars barycenter']
mercury = planets['mercury barycenter']
moon    = planets['moon']
pluto   = planets['pluto barycenter']
sun     = planets['sun']
saturn  = planets['saturn barycenter']
venus   = planets['venus barycenter']
uranus  = planets['uranus barycenter']

# Set arguments to variables
hour = int(sys.argv[4])
day = int(sys.argv[3])
month = int(sys.argv[2])
year = int(sys.argv[1])
date = JulianDate(utc=(year, month, day, hour))

# Declare list
information=[]

# load the data into the list
information.append({
  "name":     "Earth",
  "vector":   earth.at(date).position.au.tolist(), 
  "diameter": 12756,
  "colour":   ["0E1D54","7A8452"],
  "planetType": "earth"
})

information.append({
  "name":     "Jupiter",
  "vector":   jupiter.at(date).position.au.tolist(),
  "diameter": 142984,
  "colour":   ["A99781","CFB091"],
  "planetType": "solid"
})

information.append({
  "name":     "Mars",
  "vector":   mars.at(date).position.au.tolist(),
  "diameter": 6729,
  "colour":   ["CF865D","89624D"],
  "planetType": "solid"
})

information.append({
  "name":     "Mercury",
  "vector":   mercury.at(date).position.au.tolist(),
  "diameter": 5427,
  "colour":   ["757B93","5C6A90"],
  "planetType": "solid"
})

information.append({
  "name":     "Moon",
  "vector":   moon.at(date).position.au.tolist(),
  "diameter": 3475,
  "colour":   ["292728","66563"],
  "planetType": "solid"
})

information.append({
  "name":     "Pluto",
  "vector":   pluto.at(date).position.au.tolist(),
  "diameter": 2370,
  "colour":   ["5F271D","BFB9AA"],
  "planetType": "solid"
})

information.append({
  "name":     "Sun",
  "vector":   sun.at(date).position.au.tolist(),
  "diameter": 1391000,
  "colour":   ["410102","C20E00"],
  "planetType": "gas"
})

information.append({
  "name":     "Saturn",
  "vector":   saturn.at(date).position.au.tolist(),
  "diameter": 120536,
  "colour":   ["B09E69","797864"],
  "planetType": "solid"
})
information.append({
  "name":     "Venus",
  "vector":   venus.at(date).position.au.tolist(),
  "diameter": 12104,
  "colour":   ["AE618","BB7921"],
  "planetType": "solid"
})
information.append({
  "name":     "Uranus",
  "vector":   uranus.at(date).position.au.tolist(),
  "diameter": 50724,
  "colour":   ["C8EEF1","02AAEA"],
  "planetType": "solid"
})

#dump the json
print json.dumps(information)
