import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ComplaintsCategoryDto } from './dto/complaintsCategory.dto';
import { MessageComplaintDto } from './dto/messageComplaint.dto';
import { EventComplaintDto } from './dto/eventComplaint.dto';

@Injectable()
export class ComplaintService {
    constructor(private readonly prisma: PrismaService) { }

    async createMessageComplaint(messageId: number, categoryId: number) {
        try {
            const complaint = await this.prisma.messageComplaint.create({
                data: {
                    messageId: +messageId,
                    categoryId: +categoryId
                },
            });
            return complaint;
        } catch (error) {
            throw new Error("Something went wrong with creating the complaint");
        }
    }

    async createEventComplaint(eventId: number, categoryId: number) {
        try {
            const complaint = await this.prisma.eventComplaint.create({
                data: {
                    eventId: +eventId,
                    categoryId: +categoryId
                },
            });
            return complaint;
        } catch (error) {
            throw new Error("Something went wrong with creating the complaint");
        }
    }

    async getAllMessageComplaints() {
        try {
            const complaints = await this.prisma.messageComplaint.findMany();
            return complaints;
        } catch (error) {
            throw new Error("Something went wrong with getting the complaints");
        }
    }

    async getUserMessageComplaints(userId: number) {
        try {
            const messageComplaints = await this.prisma.messageComplaint.findMany({
                where: {
                    message: {
                        userId: +userId
                    }
                }, include: {
                    message: true,
                    category: true
                }
            });
            return messageComplaints;
        } catch (error) {
            throw new Error("Something went wrong with getting the complaints");
        }
    }

    async getUserEventComplaints(userId: number) {
        try {
            const eventComplaints = await this.prisma.eventComplaint.findMany({
                where: {
                    event: {
                        organizerId: +userId
                    }
                }, include: {
                    category: true,
                    event: true
                }
            });
            return eventComplaints;
        } catch (error) {
            throw new Error("Something went wrong with getting the complaints");
        }
    }

    async getAllEventComplaints() {
        try {
            const complaints = await this.prisma.eventComplaint.findMany();
            return complaints;
        } catch (error) {
            throw new Error("Something went wrong with getting the complaints");
        }
    }

    async getMessageComplaint(id: number) {
        const complaint = await this.prisma.messageComplaint.findFirst({
            where: {
                id: +id,
            },
        });

        if (!complaint) {
            throw new Error("Complaint does not exist");
        }

        return complaint;
    }

    async getEventComplaint(id: number) {
        const complaint = await this.prisma.eventComplaint.findFirst({
            where: {
                id: +id,
            },
        });

        if (!complaint) {
            throw new Error("Complaint does not exist");
        }

        return complaint;
    }

    async createComplaintsCategory(dto: ComplaintsCategoryDto) {
        try {
            const complaint = await this.prisma.complaintsCategory.create({
                data: {
                    title: dto.title,
                    description: dto.description,
                },
            });
            return complaint;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllComplaintsCategories() {
        try {
            const complaints = await this.prisma.complaintsCategory.findMany();
            return complaints;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getComplaintsCategory(id: number) {
        const complaint = await this.prisma.complaintsCategory.findFirst({
            where: {
                id: +id,
            },
        });

        if (!complaint) {
            throw new Error("Complaint does not exist");
        }

        return complaint;
    }

    async updateComplaintsCategory(id: number, dto: ComplaintsCategoryDto) {
        try {
            const complaint = await this.prisma.complaintsCategory.update({
                where: {
                    id: +id,
                },
                data: {
                    title: dto.title,
                    description: dto.description,
                },
            });
            return complaint;
        } catch (error) {
            throw new Error("Something went wrong with updating the complaint");
        }
    }

    async deleteComplaintsCategory(id: number) {
        try {
            const complaint = await this.prisma.complaintsCategory.delete({
                where: {
                    id: +id,
                },
            });
            return complaint;
        } catch (error) {
            throw new Error("Something went wrong with deleting the complaint");
        }
    }


}
