import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PreferenceService } from './preference.service';
import { PreferenceDto } from './dto/preference.dto';

@Controller('api/preferences')
export class PreferenceController {
    constructor(private readonly preferenceService: PreferenceService) { }

    @Get(':id')
    async getPreferencesByUser(@Param() params: any) {
        return this.preferenceService.getPreferencesByUser(params.id);
    }

    @Post(':id')
    async addPreference(@Param() params: any, @Body() dto: PreferenceDto) {
        return this.preferenceService.addPreference(params.id, dto);
    }

    @Patch(':id')
    async updatePreference(@Param() params: any, @Body() dto: PreferenceDto) {
        return this.preferenceService.updatePreference(params.id, dto);
    }

    @Get('sort/category/:id')
    async sortedCategoriesPreference(@Param() params: any) {
        return this.preferenceService.sortedCategoriesPreference(params.id);
    }

    @Get('sort/format/:id')
    async sortedFormatsPreference(@Param() params: any) {
        return this.preferenceService.sortedFormatsPreference(params.id);
    }
}
