import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5R4QmVYuOzbNzoqI8O5eOh5THbas6Xjo",
    authDomain: "datavisual-a1691.firebaseapp.com",
    projectId: "datavisual-a1691",
    storageBucket: "datavisual-a1691.appspot.com",
    messagingSenderId: "647909641070",
    appId: "1:647909641070:web:732878ea6a9045d792cf7f"
  };


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default app;
