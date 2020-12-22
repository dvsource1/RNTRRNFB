import { GoogleSignin } from '@react-native-community/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { AuthMethod } from '../Auth/Auth';
import { AuthUser } from '../Models/AuthUser';
import { User } from '../Models/User';
import { CredentialManager } from './Managers/CredentialManager';
import { UserManager } from './Managers/UserManager';

class AuthService {
  static ConfigureGoogleSignin = (webClientId: string) => {
    GoogleSignin.configure({webClientId});
  };

  static password: string | undefined;

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
    AuthService.password = password;
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.HandleUserCredential)
      .catch(this.HandleCredentialErrors);
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
            .then(this.HandleUserCredential)
            .catch(this.HandleCredentialErrors);
        } else {
          return Promise.reject('NULL AUTH CREDENTIAL');
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  private HandleUserCredential: (
    userCredential: FirebaseAuthTypes.UserCredential,
  ) => Promise<AuthUser> = (
    userCredential: FirebaseAuthTypes.UserCredential,
  ): Promise<AuthUser> => {
    const user: User = CredentialManager.GetUser(userCredential)!;
    // FIX: implement better solution
    if (user && AuthService.password) {
      user.credential = {password: AuthService.password};
    }
    AuthService.password = undefined;
    const authMethod = CredentialManager.GetAuthMethod(userCredential)!;
    const authUser: AuthUser = {user, authMethod};
    return Promise.resolve<AuthUser>(authUser);
  };

  private HandleCredentialErrors = (error: any) => Promise.reject(error);
}

export default AuthService;
