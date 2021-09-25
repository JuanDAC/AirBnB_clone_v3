#!/usr/bin/python3
""" Test link Many-To-Many Place <> Amenity
"""
from models import *
from models.state import State
from models.city import City
from models.user import User
from models.place import Place
from models.amenity import Amenity
from random import seed
from random import random
seed(1)

# creation of a State
state = State(name="Cundinamarca")
state.save()

# creation of a City
city = City(state_id=state.id, name="Bogotá")
city.save()

# creation of a User
user = User(email="johnsteven@gmail.com", password="johnpwd")
user.save()

print("OK")
# creation of 3 various Amenity
amenities = ["Lavadora", "Desayunito", "Almuercito", "Comidita", "Juegos de Mesa", "Televisor"]
i = 0
for nameAmenity in amenities:
    amenities[i] = Amenity(name=nameAmenity)
    amenities[i].save()


for i in range(int(100 * random())):
    place = Place(user_id=user.id, city_id=city.id, name="House ".format(i))
    place.save()
    for j in range(int((len(amenities) - 1) * random())):
        place.amenities.append(amenities[int(j)])


storage.save()

print("OK")
