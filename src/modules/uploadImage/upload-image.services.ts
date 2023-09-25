import httpService from 'services/httpService';
import { ResponseUploadMultipleImage } from './upload-image.interface';
import apiUrls from 'constants/apiUrls';

class UploadImageServices {
  uploadMultipleImage(body: FormData): Promise<ResponseUploadMultipleImage> {
    return httpService.axios.post(apiUrls.UPLOAD.MULTIPLE, body);
  }
}

export default new UploadImageServices();
