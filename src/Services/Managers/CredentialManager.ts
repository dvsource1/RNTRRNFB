import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { AuthMethod } from '../../Auth/Auth';
import { User } from '../../Models/User';

export namespace CredentialManager {
  export const GetCredential: (
    token: string | null,
    authMethod: AuthMethod,
  ) => FirebaseAuthTypes.AuthCredential | null = (
    token: string | null,
    authMethod: AuthMethod,
  ): FirebaseAuthTypes.AuthCredential | null => {
    switch (authMethod) {
      case AuthMethod.FB_GOOGLE:
        return auth.GoogleAuthProvider.credential(token);
      default:
        return null;
    }
  };

  export const GetUser: (
    userCredential: FirebaseAuthTypes.UserCredential,
  ) => User = (userCredential: FirebaseAuthTypes.UserCredential): User => {
    const user: User = {
      uid: userCredential.user.uid,
      username: userCredential.user.displayName,
      email: userCredential.user.email,
      phone: userCredential.user.phoneNumber,
      credential: null,
    };
    return user;
  };

  export const GetAuthMethod: (
    userCredential: FirebaseAuthTypes.UserCredential,
  ) => AuthMethod = (
    userCredential: FirebaseAuthTypes.UserCredential,
  ): AuthMethod => {
    // TODO: replace with switch case
    if (userCredential.additionalUserInfo?.providerId === 'google.com') {
      return AuthMethod.FB_GOOGLE;
    } else {
      return AuthMethod.FB_EMAIL_PASSWORD;
    }
  };
}
