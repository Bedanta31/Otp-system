const API_URL = 'https://word-finder-9lr4.onrender.com'; // Your live backend

let sessionId = null;

// Send OTP
function sendOTP() {
  const phone = document.getElementById("phone").value;

  fetch(`${API_URL}/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("✅ OTP sent to your phone!");
      window.sessionId = data.sessionId;
    } else {
      alert("❌ Error: " + data.message);
    }
  })
  .catch((err) => {
    console.error("Request error:", err);
    alert("Server error while sending OTP.");
  });
}
// Verify OTP
function verifyOTP() {
  const otp = document.getElementById("otp").value;

  fetch(`${API_URL}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: otp, sessionId })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("🎉 OTP Verified! Welcome to Word Finder.");
    } else {
      alert("❌ Invalid OTP!");
    }
  })
  .catch((err) => {
    console.error(err);
    alert("Server error while verifying OTP.");
  });
}
