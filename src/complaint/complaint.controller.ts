import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { ComplaintsCategoryDto } from './dto/complaintsCategory.dto';
import { MessageComplaintDto } from './dto/messageComplaint.dto';
import { EventComplaintDto } from './dto/eventComplaint.dto';

@Controller('api/complaint')
export class ComplaintController {
    constructor(private complaintService: ComplaintService) {}

    @Get('message')
    findAllMessageComplaints() {
        return this.complaintService.getAllMessageComplaints();
    }

    @Get('event')
    findAllEventComplaints() {
        return this.complaintService.getAllEventComplaints();
    }

    @Get('event/:id')
    findEventComplaint(@Param() params: any) {
        return this.complaintService.getEventComplaint(params.id);
    }

    @Get('message/:id')
    findMessageComplaint(@Param() params: any) {
        return this.complaintService.getMessageComplaint(params.id);
    }

    @Get('message/user/:userId')
    findUserMessageComplaints(@Param() params: any) {
        return this.complaintService.getUserMessageComplaints(params.userId);
    }

    @Get('event/user/:userId')
    findUserEventComplaints(@Param() params: any) {
        return this.complaintService.getUserEventComplaints(params.userId);
    }

    @Post('message/:messageId/:categoryId')
    createMessageComplaint(@Param() params: any) {
        return this.complaintService.createMessageComplaint(params.messageId, params.categoryId);
    }

    @Post('event/:eventId/:categoryId')
    createEventComplaint(@Param() params: any) {
        return this.complaintService.createEventComplaint(params.eventId, params.categoryId);
    }

    @Get('categories')
    findAllComplaintsCategories() {
        return this.complaintService.getAllComplaintsCategories();
    }

    @Post('categories')
    createComplaintsCategory(@Body() dto: ComplaintsCategoryDto) {
        return this.complaintService.createComplaintsCategory(dto);
    }

    @Get('categories/:id')
    findComplaintsCategory(@Param() params: any) {
        return this.complaintService.getComplaintsCategory(params.id);
    }

    @Patch('categories/:id')
    updateComplaintsCategory(@Param() params: any, @Body() dto: ComplaintsCategoryDto) {
        return this.complaintService.updateComplaintsCategory(params.id, dto);
    }

    @Delete('categories/:id')
    removeComplaintsCategory(@Param() params: any) {
        return this.complaintService.deleteComplaintsCategory(params.id);
    }
}
