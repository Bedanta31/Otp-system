// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnKHoj2smR0z9zCZH5A9fJCsFokd9U_ag",
  authDomain: "otp-system-71b21.firebaseapp.com",
  projectId: "otp-system-71b21",
  storageBucket: "otp-system-71b21.firebasestorage.app",
  messagingSenderId: "767014524390",
  appId: "1:767014524390:web:5ca45f8a31fbbf194af227"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize reCAPTCHA
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  'size': 'normal',
  'callback': (response) => {
    console.log("reCAPTCHA verified");
  },
  'expired-callback': () => {
    alert("reCAPTCHA expired, try again.");
  }
});

// Send OTP
window.sendOTP = () => {
  const phoneNumber = document.getElementById('phone').value;
  signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("OTP sent successfully!");
    }).catch((error) => {
      console.error(error);
      alert("Error sending OTP");
    });
};

// Verify OTP
window.verifyOTP = () => {
  const otp = document.getElementById('otp').value;
  window.confirmationResult.confirm(otp).then((result) => {
    alert("Phone verified! 🎉");
    console.log("User:", result.user);
  }).catch((error) => {
    console.error(error);
    alert("Invalid OTP!");
  });
};