import {
  firebaseConfig,
  firebaseStorageURL,
} from '@/utils/options';
import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL);

const createUniqueFileName = (file: any) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${file.name}-${timeStamp}-${randomStringValue}`;
};

export async function uploadImageToFirebase(file: any) {
  const fileName = createUniqueFileName(file);
  const storageReference = ref(storage, `fashionstore/${fileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl: any) => resolve(downloadUrl))
          .catch((error: any) => reject(error));
      }
    );
  });
}
