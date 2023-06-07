const initializeApp = require("firebase/app")
const getAnalytics = require("firebase/analytics")
const { getAuth } = require("firebase/auth")
const { signInWithPhoneNumber } = require("firebase/auth")
const { RecaptchaVerifier } = require("firebase/auth")

const firebaseConfig = {
    apiKey: "AIzaSyD6W14JWMlx9lVD7YpvMm1z_bWa_NlOCp8",
    authDomain: "velzonwhatsapp.firebaseapp.com",
    projectId: "velzonwhatsapp",
    storageBucket: "velzonwhatsapp.appspot.com",
    messagingSenderId: "904191185377",
    appId: "1:904191185377:web:654a2b1bc16214c40282a0",
    measurementId: "G-7Z86ZZ6622"
};
const firebase_app = initializeApp.initializeApp(firebaseConfig);
const analytics = getAnalytics.getAnalytics(firebase_app);

const auth = getAuth();
window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
    }
}, auth);

const appVerifier = window.recaptchaVerifier;
signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
    }).catch((error) => {
        // Error; SMS not sent
        // ...
    });

module.exports = { signInWithPhoneNumber };