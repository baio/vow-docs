import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
@Injectable()
export class CameraService {
  async getPhoto(): Promise<{
    format: string;
    base64String: string;
    dataString: string;
  }> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        // allowEditing: true,
        resultType: CameraResultType.Base64,
        saveToGallery: false,
        preserveAspectRatio: true,
        width: 1500,
        promptLabelHeader: 'Фото',
        promptLabelCancel: 'Отмена',
        promptLabelPhoto: 'Из Фото Галереи',
        promptLabelPicture: 'Сделать фото',
      });

      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

      const dataString = `data:image/${image.format};base64,${image.base64String}`;
      return {
        format: image.format,
        base64String: image.base64String,
        dataString,
      };
    } catch (err) {
      console.warn(err);
      return null;
    }
  }
}
