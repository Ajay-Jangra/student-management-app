import firebase from 'firebase/compat/app' ;
import 'firebase/compat/database';
import "firebase/compat/auth";
  
const firebaseConfig = {
    apiKey:  `${process.env.React_App_ApiKey}`,
    authDomain: `${process.env.React_App_AuthDomain}`,
    projectId: `${process.env.React_App_ProjectId}`,
    storageBucket: `${process.env.React_App_StorageBucket}`,
    messagingSenderId: `${process.env.React_App_MessagingSenderId}`,
    appId: `${process.env.React_App_AppId}`,
    measurementId: `${process.env.React_App_measurementID}`,
};


// Initialize Firebase
const firebaseDB = firebase.initializeApp(firebaseConfig);

export default firebaseDB.database().ref();
 


const auth = firebase.auth();

// google authantication 
const googleProvider = new firebase.auth.GoogleAuthProvider();


const signInWithGoogle = (e) => {
    e.preventDefault();
    auth.signInWithPopup(googleProvider).then((res) => {
        console.log(res.user);
    }).catch((error) => {
        console.log(error.message);
    })
}

export { auth, signInWithGoogle };