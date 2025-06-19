let phoneNumber = "";

function sendOTP() {
  phoneNumber = document.getElementById("phone").value.trim();

  if (!phoneNumber.startsWith("+")) {
    alert("Use international format like +91...");
    return;
  }

  fetch("https://word-finder-9lr4.onrender.com/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: phoneNumber })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("OTP sent to " + phoneNumber);
      } else {
        alert("Failed: " + data.message);
      }
    })
    .catch(err => {
      console.error("Error sending OTP:", err);
      alert("Send error. Check console.");
    });
}

function verifyOTP() {
  const otp = document.getElementById("otp").value.trim();

  fetch("https://word-finder-9lr4.onrender.com/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: phoneNumber, code: otp })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("✅ Verified!");
      } else {
        alert("❌ " + data.message);
      }
    })
    .catch(err => {
      console.error("Error verifying OTP:", err);
      alert("Verify error. Check console.");
    });
}
