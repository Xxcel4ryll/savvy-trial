import { CloudinaryService } from 'src/Globals/providers/upload';
export declare class FileService {
    private cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    handleUploadedFile(file: any): Promise<import("cloudinary").UploadApiResponse | import("cloudinary").UploadApiErrorResponse>;
    handleMultipleFiles(files: any): Promise<any[]>;
}
