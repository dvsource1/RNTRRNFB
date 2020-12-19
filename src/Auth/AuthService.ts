import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { User } from '../Models/User';
import { AuthMethod } from './Auth';

class AuthService {
  Login: (user: User, method: AuthMethod) => Promise<AuthPromiseType> = (
    user: User,
    method: AuthMethod,
  ) => {
    const {email, password} = user!;
    switch (method) {
      case AuthMethod.FB_EMAIL_PASSWORD:
        return auth().signInWithEmailAndPassword(email, password);
      case AuthMethod.FB_ANONYMOUS:
        return auth().signInAnonymously();
      default:
        return Promise.reject('UNKNOWN AUTH METHOD');
    }
  };

  Logout: () => Promise<void> = () => {
    return auth().signOut();
  };
}

type AuthPromiseType =
  | FirebaseAuthTypes.UserCredential
  | FirebaseAuthTypes.ConfirmationResult;

export default AuthService;
