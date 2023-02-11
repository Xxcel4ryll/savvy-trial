import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/Globals/providers/upload';
import { UserService } from 'src/Users/services/user.service';

  
  @Injectable()
  export class FileService {
    constructor(
      private cloudinaryService: CloudinaryService,
    ) {}
  
    handleUploadedFile(file) {
      return this.cloudinaryService.uploadImage(file);
    }

    async handleMultipleFiles(files) {
        const uploadedImages = [];
        for (let file of files) {
            const image = await this.cloudinaryService.uploadImage(file);
            uploadedImages.push({
                url: image.secure_url,
                size: image.bytes,
                format: image.format
            })
        }

        return uploadedImages;
      }
  }
  