// Firebase Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnKHoj2smR0z9zCZH5A9fJCsFokd9U_ag",
  authDomain: "otp-system-71b21.firebaseapp.com",
  projectId: "otp-system-71b21",
  storageBucket: "otp-system-71b21.appspot.com",
  messagingSenderId: "767014524390",
  appId: "1:767014524390:web:5ca45f8a31fbbf194af227"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Setup reCAPTCHA
window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
  size: "normal",
  callback: (response) => {
    console.log("reCAPTCHA verified ✅");
  },
  "expired-callback": () => {
    alert("reCAPTCHA expired. Please verify again.");
  }
});
recaptchaVerifier.render();

// 🔐 Send OTP
window.sendOTP = function () {
  const phoneNumber = document.getElementById("phone").value;

  signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("OTP sent to " + phoneNumber);
    })
    .catch((error) => {
      alert("Error sending OTP: " + error.message);
      console.error(error);
    });
};

// ✅ Verify OTP
window.verifyOTP = function () {
  const code = document.getElementById("otp").value;

  if (!window.confirmationResult) {
    alert("Please request OTP first!");
    return;
  }

  window.confirmationResult.confirm(code)
    .then((result) => {
      alert("Phone number verified! 🎉");
      console.log("User:", result.user);
    })
    .catch((error) => {
      alert("Invalid OTP: " + error.message);
    });
};
