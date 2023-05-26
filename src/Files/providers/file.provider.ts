import { v2 } from 'cloudinary';
const config = require('../../../core/config');

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return v2.config({
      cloud_name: config.file.cloud_name,
      api_key: config.file.api_key,
      api_secret: config.file.api_secret,
    });
  },
};
