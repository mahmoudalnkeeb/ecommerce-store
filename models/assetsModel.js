const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require('firebase/storage');
const app = require('../configs/firebase');
const storage = getStorage(app, 'gs://ecommerce-ba1ac.appspot.com');

class Asset {
  async saveAsset(file) {
    let storageRef = ref(
      storage,
      'gs://ecommerce-ba1ac.appspot.com/assets/' + file.originalname
    );
    let metadata = {
      contentType: file.mimetype,
    };
    let uploadedFile = await uploadBytes(storageRef, file.buffer, metadata);
    let url = getDownloadURL(uploadedFile.ref);
    return url;
  }
}

module.exports = Asset;
