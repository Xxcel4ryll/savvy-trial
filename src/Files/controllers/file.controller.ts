/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Req,
    UseGuards,
    UploadedFiles,
  } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { FileService } from '../services/file.service';
import RoleGuard from 'src/Globals/Guards/role.guard';
import Roles from 'src/Globals/role.enum';
import { Request } from 'express';

@Controller('files')
export class FilesController {

    constructor (
        private uploadService: FileService,
    )
    {}
    
    @Post('/upload')
    @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
    @UseInterceptors(
        FileInterceptor("file")
    )
    async handleUploadedFile(@UploadedFile() file){

        const uploadedFile = await this.uploadService.handleUploadedFile(file);
        return {
            url: uploadedFile.url,
            width: uploadedFile.width,
            height: uploadedFile.height,
            format: uploadedFile.format,
            resource_type: uploadedFile.resource_type,
            created_at: uploadedFile.created_at,
        }
    }

    @Post('/upload/multiple')
    @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'files', maxCount: 3 },
          ])
    )
    uploadFiles(@UploadedFiles() {files}: { files?: Express.Multer.File[] }){        
        return this.uploadService.handleMultipleFiles(files);
    }
}
