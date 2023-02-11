/// <reference types="multer" />
import { FileService } from '../services/file.service';
export declare class FilesController {
    private uploadService;
    constructor(uploadService: FileService);
    handleUploadedFile(file: any): Promise<{
        url: any;
        width: any;
        height: any;
        format: any;
        resource_type: any;
        created_at: any;
    }>;
    uploadFiles({ files }: {
        files?: Express.Multer.File[];
    }): Promise<any[]>;
}
