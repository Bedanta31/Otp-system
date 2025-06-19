// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// 🔧 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDnKHoj2smR0z9zCZH5A9fJCsFokd9U_ag",
  authDomain: "otp-system-71b21.firebaseapp.com",
  projectId: "otp-system-71b21",
  storageBucket: "otp-system-71b21.appspot.com",
  messagingSenderId: "767014524390",
  appId: "1:767014524390:web:5ca45f8a31fbbf194af227"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Setup reCAPTCHA
window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
  size: "normal",
  callback: () => {
    document.getElementById("sign-in-button").disabled = false;
  },
  "expired-callback": () => {
    document.getElementById("sign-in-button").disabled = true;
  }
});
recaptchaVerifier.render();

// Sign In Button Click
document.getElementById("sign-in-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const phoneNumber = document.getElementById("phone-number").value;

  signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("OTP sent!");
    })
    .catch((error) => {
      alert("Error: " + error.message);
      console.error(error);
    });
});

// Verify OTP
document.getElementById("verification-code-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const code = document.getElementById("verification-code").value;

  confirmationResult
    .confirm(code)
    .then((result) => {
      alert("Phone number verified!");
      document.getElementById("sign-in-status").innerText = "Signed In";
      document.getElementById("account-details").innerText = JSON.stringify(result.user, null, 2);
    })
    .catch((error) => {
      alert("Invalid OTP.");
      console.error(error);
    });
});

// Cancel Verification
document.getElementById("cancel-verify-code-button").addEventListener("click", () => {
  document.getElementById("verification-code").value = "";
});

// Sign Out
document.getElementById("sign-out-button").addEventListener("click", () => {
  signOut(auth).then(() => {
    document.getElementById("sign-in-status").innerText = "Signed Out";
    document.getElementById("account-details").innerText = "null";
  });
});

// Update Auth Status Live
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("sign-in-status").innerText = "Signed In";
    document.getElementById("account-details").innerText = JSON.stringify(user, null, 2);
  } else {
    document.getElementById("sign-in-status").innerText = "Signed Out";
    document.getElementById("account-details").innerText = "null";
  }
});
