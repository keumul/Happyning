import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDto } from './dto/location.dto';
import { CityDto } from './dto/city.dto';
import { CountryDto } from './dto/country.dto';
import { AdminGuard, JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('api/locations')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    //CITY
    @Post("city/:id")
    @UseGuards(AdminGuard)
    createCity(@Param() params: any, @Body() dto: CityDto) {
      return this.locationService.createCity(params.id, dto);
    }

    @Get("city")
    findAllCities() {
        return this.locationService.getAllCities();
    }

    
    @Get("city/:id")
    findCityById(@Param() params: any) {
        return this.locationService.getCityById(params.id);
    }

    @Get("city/country/:id")
    findCitiesByCountry(@Param() params: any) {
        return this.locationService.getCitiesByCountry(params.id);
    }

    @Patch("city/:id")
    @UseGuards(AdminGuard)
    updateCity(@Param() params: any, @Body() dto: CityDto) {
        return this.locationService.updateCity(params.id, dto);
    }

    @Delete("city/:id")
    @UseGuards(AdminGuard)
    deleteCity(@Param() params: any) {
        return this.locationService.deleteCity(params.id);
    }

    //COUNTRY
    @Post("country")
    @UseGuards(AdminGuard)
    createCountry(@Body() dto: CountryDto) {
      return this.locationService.createCountry(dto);
    }

    @Get("country")
    findAllCountries() {
        return this.locationService.getAllCountries();
    }

    @Get("country/:id")
    findCountryById(@Param() params: any) {
        return this.locationService.getCountryById(params.id);
    }

    @Patch("country/:id")
    @UseGuards(AdminGuard)
    updateCountry(@Param() params: any, @Body() dto: CountryDto) {
        return this.locationService.updateCountry(params.id, dto);
    }

    @Delete("country/:id")
    @UseGuards(AdminGuard)
    deleteCountry(@Param() params: any) {
        return this.locationService.deleteCountry(params.id);
    }

    //LOCATION
    @Post("location/:id")
    createLocation(@Param() params: any, @Body() dto: LocationDto) {
      return this.locationService.createLocation(params.id, dto);
    }

    @Get("location")
    findAllLocations() {
        return this.locationService.getAllLocations();
    }

    @Get("location/:id")
    findLocationById(@Param() params: any) {
        return this.locationService.getLocationById(params.id);
    }

    @Get("location/city/:id")
    findLocationsByCity(@Param() params: any) {
        return this.locationService.getLocationsByCity(params.id);
    }

    @Patch("location/:id")
    updateLocation(@Param() params: any, @Body() dto: LocationDto) {
        return this.locationService.updateLocation(params.id, dto);
    }

    @Delete("location/:id")
    deleteLocation(@Param() params: any) {
        return this.locationService.deleteLocation(params.id);
    }
}
