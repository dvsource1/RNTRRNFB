import { GoogleSignin } from '@react-native-community/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { AuthMethod } from '../Auth/Auth';
import { AuthUser } from '../Models/AuthUser';
import { User } from '../Models/User';
import { CredentialManager } from './Managers/CreadentialManager';
import { UserManager } from './Managers/UserManager';

class AuthService {
  static ConfigureGoogleSignin = (webClientId: string) => {
    GoogleSignin.configure({webClientId});
  };

  Login: (authUser: AuthUser) => Promise<AuthUser> = (
    authUser: AuthUser,
  ): Promise<AuthUser> => {
    switch (authUser?.authMethod) {
      case AuthMethod.FB_EMAIL_PASSWORD:
        return this.SignInWithEmailAndPassword(authUser.user);
      case AuthMethod.FB_GOOGLE:
        return this.SignInWithGoogle();
      default:
        return Promise.reject('UNKNOWN AUTH METHOD');
    }
  };

  Logout: () => Promise<void> = (): Promise<void> => {
    return auth().signOut();
  };

  private SignInWithEmailAndPassword: (user: User) => Promise<AuthUser> = (
    user: User,
  ): Promise<AuthUser> => {
    // TODO: check null or undefined email password
    const email = UserManager.GetEmail(user)!;
    const password = UserManager.GetPassword(user)!;
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.HandleUserCreadential)
      .catch(this.HandleCreadentialErrors);
  };

  private SignInWithGoogle: () => Promise<AuthUser> = async (): Promise<AuthUser> => {
    return GoogleSignin.signIn()
      .then(({idToken}) => {
        const googleCredential = CredentialManager.GetCredential(
          idToken,
          AuthMethod.FB_GOOGLE,
        );
        if (googleCredential) {
          return auth()
            .signInWithCredential(googleCredential)
            .then(this.HandleUserCreadential)
            .catch(this.HandleCreadentialErrors);
        } else {
          return Promise.reject('NULL AUTH CREDENTIAL');
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  private HandleUserCreadential: (
    userCredential: FirebaseAuthTypes.UserCredential,
  ) => Promise<AuthUser> = (
    userCredential: FirebaseAuthTypes.UserCredential,
  ): Promise<AuthUser> => {
    const user: User = CredentialManager.GetUser(userCredential)!;
    const authMethod = CredentialManager.GetAuthMethod(userCredential)!;
    const authUser: AuthUser = {user, authMethod};
    return Promise.resolve<AuthUser>(authUser);
  };

  private HandleCreadentialErrors = (error: any) => Promise.reject(error);
}

export default AuthService;
