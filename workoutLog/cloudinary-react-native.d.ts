
import Cloudinary from 'cloudinary-react-native';

declare module 'cloudinary-react-native' {
  type CloudinaryConfig = {
    cloud: {
      cloudName: string;
    };
    url?: {
      secure?: boolean;
    };
  };

  type UploadOptions = {
    upload_preset: string;
    unsigned: boolean;
  };

  type UploadCallback = (error: any, response: any) => void;

  export function upload(
    cld: CloudinaryConfig,
    options: {
      file: string;
      options: UploadOptions;
      callback: UploadCallback;
    }
  ): void;
  export default Cloudinary;
}

