import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PreferenceDto } from './dto/preference.dto';

@Injectable()
export class PreferenceService {
    constructor(private prisma: PrismaService) { }

    async getPreferencesByUser(id: number) {
        try {
            const preference = await this.prisma.preference.findMany({
                where: {
                    userId: +id,
                },
            });
            return preference;
        } catch (error) {
            throw new Error('Something went wrong when fetching preferences: ' + error.message);
        }
    }

    async addPreference(id: number, dto: PreferenceDto) {
        try {
            return await this.prisma.preference.create({
                data: {
                    userId: +id,
                    categoryId: +dto.categoryId,
                    formatId: +dto.formatId,
                }
            });
        } catch (error) {
            throw new Error('Something went wrong when adding category preference: ' + error.message);
        }
    }

    async updatePreference(id: number, dto: PreferenceDto) {
        try {
            return await this.prisma.preference.update({
                where: {
                    id: +id,
                },
                data: {
                    categoryId: +dto.categoryId,
                    formatId: +dto.formatId,
                }
            });

        } catch (error) {
            throw new Error('Something went wrong when updating preference: ' + error.message);
        }
    }

    async sortedCategoriesPreference(id: number) {
        try {
            const preferences = await this.getPreferencesByUser(id);
            const categories = preferences.map(preference => preference.categoryId);
            return categories.sort((a, b) => categories.filter(v => v === a).length - categories.filter(v => v === b).length).reverse();
        } catch (error) {
            throw new Error('Something went wrong when calculating best category preference: ' + error.message);
        }
    }

    async sortedFormatsPreference(id: number) {
        try {
            const preferences = await this.getPreferencesByUser(id);
            const formats = preferences.map(preference => preference.formatId);
            return formats.sort((a, b) => formats.filter(v => v === a).length - formats.filter(v => v === b).length).reverse();
        } catch (error) {
            throw new Error('Something went wrong when calculating best format preference: ' + error.message);
        }
    }
}
