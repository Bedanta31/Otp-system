let phoneNumber = "";

function sendOTP() {
  const phone = document.getElementById("phone").value;
  console.log("Sending OTP to:", phone);

  fetch("https://word-finder-9lr4.onrender.com/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ phone: phone })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Server Response:", data);
      if (data.success) {
        alert("✅ OTP sent!");
      } else {
        alert("❌ Failed: " + data.error);
      }
    })
    .catch((err) => {
      console.error(err);
      alert("❌ Failed: " + err.message);
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
      console.log("Verification Response:", data);
      if (data.success) {
        alert("✅ Phone Verified!");
      } else {
        alert("❌ Verification Failed: " + data.error);
      }
    })
    .catch((err) => {
      console.error(err);
      alert("❌ Failed: " + err.message);
    });
}

// ✅ Make available to your HTML <button onclick="...">
window.sendOTP = sendOTP;
window.verifyOTP = verifyOTP;
