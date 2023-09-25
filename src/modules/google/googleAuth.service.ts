import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { Auth, GoogleAuthProvider, UserCredential, getAuth, signInWithPopup } from 'firebase/auth';
import { ResponseGoogleAuth } from './googleAuth.interface';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_GOOGLE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_GOOGLE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_GOOGLE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID,
};
class gooleAuthService {
  auth: Auth;

  constructor() {
    this.auth = getAuth(initializeApp(firebaseConfig));
  }

  signInWithGoogle = (): Promise<ResponseGoogleAuth> => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const response = await signInWithPopup(this.auth, provider);
          const result = {
            ...response,
          } as UserCredential & ResponseGoogleAuth;
          resolve(result);
        } catch (error) {
          reject(error);
        }
      })();
    });
  };
}

export default new gooleAuthService();
