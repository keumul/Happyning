import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CityDto } from './dto/city.dto';
import { CountryDto } from './dto/country.dto';
import { LocationDto } from './dto/location.dto';
import { log } from 'console';

@Injectable()
export class LocationService {
    constructor(private prisma: PrismaService) { }

    //CITY
    async createCity(id: number, dto: CityDto) {
        try {
            const city = await this.prisma.city.create({
                data: {
                    cityName: dto.cityName,
                    country: {
                        connect: {
                            id: +id
                        }
                    }
                }
            }
            );
            return city;
        } catch (error) {
            throw new ForbiddenException('Something went wrong when creating city: ', error.message)
        }
    }

    async getAllCities() {
        try {
            return await this.prisma.city.findMany({
                include: {
                    country: true
                }
            });
        } catch (error) {
            throw new ForbiddenException('Something went wrong when fetching cities: ', error.message)
        }
    }

    async getCitiesByCountry(id: number) {
        try {
            return await this.prisma.city.findMany({
                where: {
                    countryId: +id
                }
            });
        } catch (error) {
            throw new ForbiddenException('Something went wrong when fetching cities: ', error.message)
        }
    }

    async getCityById(id: number) {
        try {
            return await this.prisma.city.findUnique({
                where: {
                    id: +id
                }
            });
        } catch (error) {
            throw new ForbiddenException('Something went wrong when fetching city: ', error.message)
        }
    }

    async updateCity(id: number, dto: CityDto) {
        try {
            return await this.prisma.city.update({
                where: {
                    id: +id
                },
                data: {
                    cityName: dto.cityName
                }
            });
        } catch (error) {
            throw new ForbiddenException('Something went wrong when updating city: ', error.message)
        }
    }

    async deleteCity(id: number) {
        try {
            return await this.prisma.city.delete({
                where: {
                    id: +id
                }
            });
        } catch (error) {
            throw new ForbiddenException('Something went wrong when deleting city: ', error.message)
        }
    }

    //COUNTRY
    async createCountry(dto: CountryDto) {
        try {
            return await this.prisma.country.create({
                data: {
                    countryName: dto.countryName
                }
            })

        } catch (error) {
            throw new ForbiddenException('Something went wrong when creating country: ', error.message)
        }
    }

    async getCountryById(id: number) {
        try {
            return await this.prisma.country.findUnique({
                where: {
                    id: +id
                }
            });
        } catch (error) {
            throw new ForbiddenException('Something went wrong when fetching country: ', error.message)
        }
    }

    async getAllCountries() {
        try {
            return await this.prisma.country.findMany();
        } catch (error) {
            throw new ForbiddenException('Something went wrong when fetching countries: ', error.message)
        }
    }

    async updateCountry(id: number, dto: CountryDto) {
        try {
            return await this.prisma.country.update({
                where: {
                    id: +id
                },
                data: {
                    countryName: dto.countryName
                }
            });
        } catch (error) {
            throw new ForbiddenException('Something went wrong when updating country: ', error.message)
        }
    }

    async deleteCountry(id: number) {
        try {
            return await this.prisma.country.delete({
                where: {
                    id: +id
                }
            });
        } catch (error) {
            throw new ForbiddenException('Something went wrong when deleting country: ', error.message)
        }
    }

    //LOCATION
    async createLocation(id: number, dto: LocationDto) {
        try {
            const location = await this.prisma.location.create({
                data: {
                    details: dto.details,
                    cityId: +id
                }
            })

            return await location;

        } catch (error) {
            throw new ForbiddenException('Something went wrong when creating location: ', error.message)
        }
    }

    async getLocationById(id: number) {
        try {
            return await this.prisma.location.findUnique({
                where: {
                    id: +id
                }
            });
        } catch (error) {
            throw new ForbiddenException('Something went wrong when fetching location: ', error.message)
        }
    }

    async getAllLocations() {
        try {
            return await this.prisma.location.findMany();
        } catch (error) {
            throw new ForbiddenException('Something went wrong when fetching locations: ', error.message)
        }
    }

    async getLocationsByCity(id: number) {
        try {
            return await this.prisma.location.findMany({
                where: {
                    cityId: +id
                }
            });
        } catch (error) {
            throw new ForbiddenException('Something went wrong when fetching locations: ', error.message)
        }
    }

    async updateLocation(id: number, dto: LocationDto) {
        try {
            return await this.prisma.location.update({
                where: {
                    id: +id
                },
                data: {
                    details: dto.details,
                    cityId: dto.cityId
                }
            });
        } catch (error) {
            throw new ForbiddenException('Something went wrong when updating location: ', error.message)
        }
    }

    async deleteLocation(id: number) {
        try {
            return await this.prisma.location.delete({
                where: {
                    id: +id
                }
            });
        } catch (error) {
            throw new ForbiddenException('Something went wrong when deleting location: ', error.message)
        }
    }
}
