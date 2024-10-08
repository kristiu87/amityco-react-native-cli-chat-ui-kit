import { FileRepository } from '@amityco/ts-sdk-react-native';
import { Platform } from 'react-native';
export async function uploadFile(filePath, perCentCallback) {
  return await new Promise(async (resolve, reject) => {
    const formData = new FormData();
    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];
    const fileType = Platform.OS === 'ios' ? 'image/jpeg' : 'image/jpg';
    const uri = Platform.OS === 'android' ? filePath : filePath.replace('file://', '');
    formData.append('files', {
      name: fileName,
      type: fileType,
      uri: uri
    });
    const {
      data: file
    } = await FileRepository.uploadFile(formData, percent => {
      perCentCallback && perCentCallback(percent);
    });
    if (file) {
      resolve(file);
    } else {
      reject('Upload error');
    }
  });
}
async function base64ToBlob(base64) {
  const response = await fetch(base64);
  const blob = await response.blob();
  return blob;
}
// Convert the base64 string to a Blob

export async function uploadImageFile(filePath, perCentCallback, isBase64 = false) {
  return await new Promise(async (resolve, reject) => {
    const formData = new FormData();
    if (isBase64 && Platform.OS !== 'ios' && Platform.OS !== 'android') {
      const imageBlob = await base64ToBlob(filePath);
      formData.append('files', imageBlob);
    } else {
      const parts = filePath.split('/');
      const fileName = parts[parts.length - 1];
      const fileType = Platform.OS === 'ios' ? 'image/jpeg' : 'image/jpg';
      const uri = Platform.OS === 'android' ? filePath : filePath.replace('file://', '');
      formData.append('files', {
        name: fileName,
        type: fileType,
        uri: uri
      });
    }
    const {
      data: file
    } = await FileRepository.uploadImage(formData, percent => {
      perCentCallback && perCentCallback(percent);
    });
    if (file) {
      resolve(file);
    } else {
      reject('Upload error');
    }
  });
}
//# sourceMappingURL=file-provider.js.map