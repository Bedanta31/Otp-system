let phoneNumber = "";

function sendOTP() {
  const phone = document.getElementById("phone").value;

  fetch("https://word-finder-9lr4.onrender.com/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ phone: phone })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("OTP sent!");
      } else {
        alert("Failed: " + data.error);
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Failed: " + err.message);
    });
}

function verifyOTP() {
  const phone = document.getElementById("phone").value;
  const otp = document.getElementById("otp").value;

  fetch("https://word-finder-9lr4.onrender.com/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ phone: phone, code: otp })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("✅ Phone Verified!");
      } else {
        alert("❌ Verification Failed: " + data.error);
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Failed: " + err.message);
    });
}

// Expose to global scope for onclick to work
window.sendOTP = sendOTP;
window.verifyOTP = verifyOTP;
console.log("Sending OTP to:", phone);
.then((data) => {
  console.log("Server Response:", data);
  if (data.success) {
    alert("OTP sent successfully!");
  } else {
    alert("Failed: " + (data.error || data.message || "Unknown error"));
  }
})
