import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { ComplaintsCategoryDto } from './dto/complaintsCategory.dto';
import { JwtGuard, ModeratorGuard, UserGuard } from 'src/auth/guard';


@UseGuards(JwtGuard)
@Controller('api/complaints')
export class ComplaintController {
    constructor(private complaintService: ComplaintService) {}

    @Get('message')
    @UseGuards(ModeratorGuard)
    findAllMessageComplaints() {
        return this.complaintService.getAllMessageComplaints();
    }

    @Get('event')
    @UseGuards(ModeratorGuard)
    findAllEventComplaints() {
        return this.complaintService.getAllEventComplaints();
    }

    @Get('event/:id')
    @UseGuards(ModeratorGuard)
    findEventComplaint(@Param() params: any) {
        return this.complaintService.getEventComplaint(params.id);
    }

    @Get('message/:id')
    @UseGuards(ModeratorGuard)
    findMessageComplaint(@Param() params: any) {
        return this.complaintService.getMessageComplaint(params.id);
    }

    @Get('message/user/:userId')
    @UseGuards(ModeratorGuard)
    findUserMessageComplaints(@Param() params: any) {
        return this.complaintService.getUserMessageComplaints(params.userId);
    }

    @Get('event/user/:userId')
    @UseGuards(ModeratorGuard)
    findUserEventComplaints(@Param() params: any) {
        return this.complaintService.getUserEventComplaints(params.userId);
    }

    @Post('message/:messageId/:categoryId')
    @UseGuards(UserGuard)
    createMessageComplaint(@Param() params: any) {
        return this.complaintService.createMessageComplaint(params.messageId, params.categoryId);
    }

    @Post('event/:eventId/:categoryId')
    @UseGuards(UserGuard)
    createEventComplaint(@Param() params: any) {
        return this.complaintService.createEventComplaint(params.eventId, params.categoryId);
    }

    @Get('categories')
    findAllComplaintsCategories() {
        return this.complaintService.getAllComplaintsCategories();
    }

    @Post('categories')
    @UseGuards(ModeratorGuard)
    createComplaintsCategory(@Body() dto: ComplaintsCategoryDto) {
        return this.complaintService.createComplaintsCategory(dto);
    }

    @Get('categories/:id')
    findComplaintsCategory(@Param() params: any) {
        return this.complaintService.getComplaintsCategory(params.id);
    }

    @Patch('categories/:id')
    @UseGuards(ModeratorGuard)
    updateComplaintsCategory(@Param() params: any, @Body() dto: ComplaintsCategoryDto) {
        return this.complaintService.updateComplaintsCategory(params.id, dto);
    }

    @Delete('categories/:id')
    @UseGuards(ModeratorGuard)
    removeComplaintsCategory(@Param() params: any) {
        return this.complaintService.deleteComplaintsCategory(params.id);
    }
}
