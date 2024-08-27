"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = uploadFile;
exports.uploadImageFile = uploadImageFile;
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
var _reactNative = require("react-native");
async function uploadFile(filePath, perCentCallback) {
  return await new Promise(async (resolve, reject) => {
    const formData = new FormData();
    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];
    const fileType = _reactNative.Platform.OS === 'ios' ? 'image/jpeg' : 'image/jpg';
    const uri = _reactNative.Platform.OS === 'android' ? filePath : filePath.replace('file://', '');
    formData.append('files', {
      name: fileName,
      type: fileType,
      uri: uri
    });
    const {
      data: file
    } = await _tsSdkReactNative.FileRepository.uploadFile(formData, percent => {
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

async function uploadImageFile(filePath, perCentCallback, isBase64 = false) {
  return await new Promise(async (resolve, reject) => {
    const formData = new FormData();
    if (isBase64 && _reactNative.Platform.OS !== 'ios' && _reactNative.Platform.OS !== 'android') {
      const imageBlob = await base64ToBlob(filePath);
      formData.append('files', imageBlob);
    } else {
      const parts = filePath.split('/');
      const fileName = parts[parts.length - 1];
      const fileType = _reactNative.Platform.OS === 'ios' ? 'image/jpeg' : 'image/jpg';
      const uri = _reactNative.Platform.OS === 'android' ? filePath : filePath.replace('file://', '');
      formData.append('files', {
        name: fileName,
        type: fileType,
        uri: uri
      });
    }
    const {
      data: file
    } = await _tsSdkReactNative.FileRepository.uploadImage(formData, percent => {
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