import { auth } from './firebase';

//Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
}

//Log In
export const doLogInWithEmailAndPassword = (email, password) => {
       return  auth.signInWithEmailAndPassword(email, password);
}

//Sign Out
export const doLogOut = () => auth.signOut();

// Password Reset
export const doPasswordReset = (email) => auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) => auth.currentUser.updatePassword(password);
