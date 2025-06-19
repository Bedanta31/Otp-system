let phoneNumber = "";

// Send OTP
function sendOTP() {
  phoneNumber = document.getElementById("phone").value.trim();

  if (!phoneNumber || !phoneNumber.startsWith("+")) {
    alert("Please enter a valid phone number with country code (e.g., +91XXXXXXXXXX)");
    return;
  }

  fetch("https://word-finder-9lr4.onrender.com/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ phone: phoneNumber })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("✅ OTP sent to " + phoneNumber);
      } else {
        alert("❌ Failed to send OTP: " + data.message);
      }
    })
    .catch((err) => {
      console.error(err);
      alert("❌ Error sending OTP. Please try again.");
    });
}

// Verify OTP
function verifyOTP() {
  const otp = document.getElementById("otp").value.trim();

  if (!otp || otp.length < 4) {
    alert("Please enter the OTP you received.");
    return;
  }

  fetch("https://word-finder-9lr4.onrender.com/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      phone: phoneNumber,
      code: otp
    })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("🎉 Phone verified successfully!");
      } else {
        alert("❌ Invalid OTP: " + data.message);
      }
    })
    .catch((err) => {
      console.error(err);
      alert("❌ Error verifying OTP. Please try again.");
    });
}
