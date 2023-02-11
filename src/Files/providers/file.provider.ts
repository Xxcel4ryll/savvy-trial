import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return v2.config({
      cloud_name: 'duhx38bd0',
      api_key: '228737482825761',
      api_secret: 'f1PXE_s47Ai19xaW7YEhRxHgO_Q',
    });
  },
};
