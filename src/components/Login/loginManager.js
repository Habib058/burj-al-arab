import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
}

export const handleSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(provider)
        .then(result => {
            const { displayName, email } = result.user;
            const signedInUser = {
                name: displayName,
                email: email,
                success:true
            }
            // setLoggedInUser(signedInUser);
            // history.replace(from);
            return signedInUser;

            // ...
        }).catch(error => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
        });
}

export const createUserWithEmailAndPassword = (email,password) => {
    return firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch(err => {
            const newUserInfo = { };
            newUserInfo.error = err.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const signInWithEmailAndPassword = (email,password)=>{
     return firebase.auth().signInWithEmailAndPassword(email,password)
                .then(res => {
                    // Signed in
                    const newUserInfo = res.user;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    return newUserInfo;
                })
                .catch(err => {
                    const newUserInfo = {};
                    newUserInfo.error = err.message;
                    newUserInfo.success = false;
                    return newUserInfo;
                });
}
export const getToken = ()=>{
    return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
               return sessionStorage.setItem('token',idToken);
            }).catch(function (error) {
                // Handle error
            });
}

