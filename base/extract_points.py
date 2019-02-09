# -*- encoding: utf-8 -*-

from netCDF4 import Dataset
import numpy as np
import json


ds_by_date = Dataset('./spGIS_diario.nc4', 'r+', format="NETCDF4")

maxlat = -19.74827
minlat = -25.4562

maxlon = -44.16656
minlon = -53.42064

ycellsize = (maxlat - minlat) / len(ds_by_date['latitude'])
xcellsize = (maxlon - minlon) / len(ds_by_date['longitude'])

locale_list = json.load(open('./locales.json'))
output = {}

for locale in locale_list:
    y = locale['latitude']
    x = locale['longitude']

    py = abs(int((y - minlat) / ycellsize))
    px = abs(int((x - minlon) / xcellsize))

    lat_index = ds_by_date['latitude'][py]
    long_index = [ds_by_date['longitude'][px]]

    output[locale['id']] = {}
    for date_index, date in enumerate(ds_by_date['time']):
        output[locale['id']][date] = {
            "type": "Point",
            "coordinates": [y, x],
            "properties": {
                "precipitacao": float(ds_by_date['precipitacao'][:][date_index][py][px]),
                "tmin": float(ds_by_date["tmin"][:][date_index][py][px]),
                "tmax": float(ds_by_date["tmax"][:][date_index][py][px]),
                "rhmax": float(ds_by_date["rhmax"][:][date_index][py][px]),
                "rhmin": str(ds_by_date["rhmin"][:][date_index][py][px])
            }
        }

json.dump(output, "spGIS_diario.json")

print("hgeuueh")
