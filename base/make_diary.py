# -*- encoding: utf-8 -*-

from netCDF4 import Dataset
import numpy as np


PRECIP = 'precipitacao'

ds_by_hour = Dataset('./spGIS_horario.nc4', 'r+', format="NETCDF4")
ds_by_date = Dataset('./spGIS_diario.nc4', 'r+', format="NETCDF4")

precip_by_day = []
for time_slice_index in xrange(0, len(ds_by_hour[PRECIP]), 24):

    lat_list = ds_by_hour[PRECIP][time_slice_index: time_slice_index + 24]

    curr_day = []
    for lat_index, long_list in enumerate(lat_list):
        curr_day.append([])
        for long_index, value_list in enumerate(long_list[lat_index]):
            curr_day[lat_index].append(np.mean([
                ds_by_hour[PRECIP][hour][lat_index][long_index] for hour in xrange(time_slice_index, time_slice_index + 24)
            ]))
    precip_by_day.append(curr_day)

ds_by_date = Dataset('./spGIS_diario.nc4', 'r+', format="NETCDF4")
precipitacao = ds_by_date.createVariable('precipitacao', 'f4', ['time', 'latitude', 'longitude'])

precipitacao.units = "mm"
precipitacao.long_name = '** Precipitation Tax [kg/m^2/h]'

precipitacao[:] = precip_by_day
