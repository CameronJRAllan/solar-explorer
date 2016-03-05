from skyfield.api import load, now, JulianDate
import sys
import json

# Load ephemeris
planets = load('de421.bsp')

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
if len(sys.argv) == 1:
  date = JulianDate(utc=now())
else:
  hour = int(sys.argv[4])
  day = int(sys.argv[3])
  month = int(sys.argv[2])
  year = int(sys.argv[1])
  date = JulianDate(utc=(year, month, day, hour))

# Declare dictionary
information=[]

information.append({
  "name":     "Earth",
  "vector":   earth.at(date).position.au.tolist(), 
  "diameter": 12756,
  "colour":   ["0E1D54","7A8452"]
})

information.append({
  "name":     "Jupiter",
  "vector":   jupiter.at(date).position.au.tolist(),
  "diameter": 142984,
  "colour":   ["A99781","CFB091"]
})

information.append({
  "name":     "Mars",
  "vector":   mars.at(date).position.au.tolist(),
  "diameter": 142984,
  "colour":   ["A99781","CFB091"]
})

information.append({
  "name":     "Mercury",
  "vector":   mercury.at(date).position.au.tolist(),
  "diameter": 5427
  "colour":   ["757B93","5C6A90"]
})

information.append({
  "name":     "Moon",
  "vector":   moon.at(date).position.au.tolist(),
  "diameter": 3475,
  "colour":   ["292728","66563"]
})

information.append({
  "name":     "Pluto",
  "vector":   pluto.at(date).position.au.tolist(),
  "diameter": 2370,
  "colour":   ["5F271D","BFB9AA"]
})

information.append({
  "name":     "Sun",
  "vector":   sun.at(date).position.au.tolist(),
  "diameter": 1391000,
  "colour":   ["410102","C20E00"]
})

information.append({
  "name":     "Saturn",
  "vector":   saturn.at(date).position.au.tolist(),
  "diameter": 120536,
  "colour":   ["B09E69","797864"]
})
information.append({
  "name":     "Venus",
  "vector":   venus.at(date).position.au.tolist(),
  "diameter": 12104,
  "colour":   ["AE618","BB7921"]
})
information.append({
  "name":     "Uranus",
  "vector":   uranus.at(date).position.au.tolist(),
  "diameter": 50724,
  "colour":   ["C8EEF1","02AAEA"]
})






print json.dumps(information)









#i = 0
## Store name
#information[i] = "Earth"
#i+=1; information[i] = earth.at(date).position.au
#i+=1; information[i] = 12756
#i+=1; information[i] = "#0E1D54,#7A8452"
#
#i+=1; information[i] = "Jupiter"
#i+=1; information[i] = jupiter.at(date).position.au
##i+=1; information[i] = 142984
#i+=1; information[i] = "#A99781,#CFB091"
#  
#i+=1; information[i] = "Mars"
#i#+=1; information[i] = mars.at(date).position.au
#i#+=1; information[i] = 6792
#i#+=1; information[i] = "#CF865D,#89624D"
#

#i+=1; information[i] = "Mercury"
#i+=1; information[i] = mercury.at(date).position.au
#i+=1; information[i] = 5427
#i+=1; information[i] = "#757B93,#5C6A9D"
#
#i+=1; information[i] = "Moon"
#i+=1; information[i] = moon.at(date).position.au
#i+=1; information[i] = 3475
#i+=1; information[i] = "#292728,#666563"
#
#i+=1; information[i] = "Pluto"
#i+=1; information[i] = pluto.at(date).position.au
#i+=1; information[i] = 2370
#i+=1; information[i] = "#5F271D,#BFB9AA"
#
#i+=1; information[i] = "Sun"
#i+=1; information[i] = sun.at(date).position.au
#i+=1; information[i] = 1391000
#i+=1; information[i] = "#410102,#C20E00"
#
#i+=1; information[i] = "Saturn"
#i+=1; information[i] = saturn.at(date).position.au
#i+=1; information[i] = 120536
#i+=1; information[i] = "#B09E69,#797864"
#
#i+=1; information[i] = "Venus"
#i+=1; information[i] = venus.at(date).position.au
#i+=1; information[i] = 12104
#i+=1; information[i] = "#AE6418,#BB7921"
#
#i+=1; information[i] = "Uranus"
#i+=1; information[i] = uranus.at(date).position.au
#i+=1; information[i] = 50724
#i+=1; information[i] = "#C8EEF1,#02AAEA"
#
##print information
#for key in information:
#	value = information[key]
#	print str(value)
#	if key < len(information)-1:
#		print ","
#############################################
