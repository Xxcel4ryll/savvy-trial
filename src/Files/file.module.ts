import { Module } from '@nestjs/common';
import { FilesController } from './controllers/file.controller';
import { CloudinaryProvider } from './providers/file.provider';
import { FileService } from './services/file.service';
// import { UserProviders } from './providers/user.provider';

@Module({
  controllers: [FilesController],
  providers: [FileService, CloudinaryProvider],
  exports: [FileService, CloudinaryProvider],
})
export class FileModule {}
