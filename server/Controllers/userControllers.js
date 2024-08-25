require("dotenv").config();
const User = require("../Modals/users");
const PasswordReset = require("../Modals/PasswordResetUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Generate a random secret key for JWT signing
const tokenSecretKey = crypto.randomBytes(64).toString("hex");

// Create transporter for nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "587",
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

//3. cofigure mail and send it
const sendVerifyEmail = async (name, email, _id) => {
  try {
    //2.configure email content.
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "For Email Verification",
      // html:
      //   "<p>Hi " +
      //   name +
      //   ',</br>please click here to <a href="' +
      //   process.env.VERIFY_URL +
      //   _id +
      //   '">verify</a> your email.</p>',
      html:
        "<!DOCTYPE html>" +
        "<html><head><style>" +
        ".email-container { font-family: Arial, sans-serif; color: #333333; width: 100%; max-width: 600px; margin: auto; }" +
        ".header { background-color: #000000; color: #ffffff; padding: 20px; text-align: center; }" +
        ".body { background-color: #ffffff; padding: 20px; text-align: left; }" +
        ".verification-code { color: #ff0000; font-size: 24px; margin-top: 20px; margin-bottom: 20px; text-align: center; }" +
        "</style></head><body>" +
        '<div class="email-container">' +
        '<div class="header"><h1>Baskan Digital</h1></div>' +
        '<div class="body">' +
        "<p>Dear " +
        name +
        ",</p>" +
        "<p>Welcome to Baskan Digital!</p>" +
        '<p class="verification-code"> Please click <a href="' +
        process.env.VERIFY_URL +
        _id +
        '">here</a> to verify your email.</p>' +
        "<p>The verification link is only valid for 1 day. Please do not share this link with anyone.</p>" +
        "<p>If you did not initiate this request, please disregard this email.</p>" +
        '<p>If you encounter any issues or have questions about Baskan Services, our support team is here to assist you. Simply reach out to us at <a href="mailto:support@baskanco.com">support@baskanco.com</a>.</p>' +
        "</div></div></body></html>",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      console.log("sent");
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent");
        res.status("Email has been sent");
      }
    });
  } catch (error) {
    res.status(error.message);
  }
};

// Send Reset Password Email
const sendResetPasswordEmail = async (email, resetToken) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      // html: `<p>You requested a password reset. Please click on the link below to reset your password:</p>
      // <p>The link will expire in 1 hour</p>
      //        <a href="${process.env.RESET_PASSWORD_URL}/${resetToken}">Reset Password</a>`,
      html: `<!DOCTYPE html>
<html>
<head>
<style>
  .email-container {
    font-family: Arial, sans-serif;
    color: #333333;
    width: 100%;
    max-width: 600px;
    margin: auto;
  }
  .header {
    background-color: #000000;
    color: #ffffff;
    padding: 20px;
    text-align: center;
  }
  .body {
    background-color: #ffffff;
    padding: 20px;
    text-align: left;
  }
  .verification-code {
    color: #ff0000; /* Red */
    font-size: 24px; /* Larger Font Size */
    margin-top:20px; /* Spacing from top */
   margin-bottom :20px; /* Spacing from bottom */
   text-align:center; /* Center align*/
    
}
</style>
</head>
<body>

<div class="email-container">
  
<div class="header">
<h1>Baskan Technologies</h1>
<!-- Add patterned line here -->
</div>

<div class="body">
<p>Dear User,</p>

<p>Welcome to Baskan Services! This is your reset password link:</p>

<a class="verification-code" href="${process.env.RESET_PASSWORD_URL}/${resetToken}">Reset Password</a>
<p>The reset link is only valid for 60 minutes. Please do not share this link with anyone.</p>

<p>If you did not initiate this request, please disregard this email.</p>

<p>If you encounter any issues or have questions about services, our support team is here to assist you. Simply reach out to us at <a href="mailto:info@baskanco.com">support@baskanco.com</a>.</p>
</div>

</div>

</body>
</html>
`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Reset password email sent");
  } catch (error) {
    console.error("Error sending reset password email:", error);
  }
};

// register api
exports.SignUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.log(name, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    // console.log("saved");
    const savedUser = await newUser.save();
    // console.log("saved", savedUser);
    sendVerifyEmail(savedUser.name, savedUser.email, savedUser._id);
    res
      .status(201)
      .json({ message: "Be sure to check your email and verify it" });
    // const token = jwt.sign({ id: savedUser._id }, tokenSecretKey);

    // res
    //   .status(201)
    //   .json({ message: "User registered successfully", token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login api

exports.SignInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(401).json({ error: "User is not verified" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const loginToken = jwt.sign({ user_id: user._id }, tokenSecretKey);

    const userDetails = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: loginToken,
    };

    res.status(200).json({ message: "Login successful", user: userDetails });
  } catch (error) {
    if (!res.headersSent) {
      res.status(400).json({ error: error.message });
    } else {
      console.error(error);
    }
  }
};

// Verify Email API
exports.verifyNow = async (req, res) => {
  try {
    const updateInfo = await User.updateOne(
      { _id: req.query.id },
      { $set: { isVerified: true } }
    );
    if (updateInfo.nModified == 0) {
      res.status(300).json({ message: "No documents were updated" });
    }
    res.status(201).json({ message: "User verified successfully" });
  } catch (error) {
    res.status(error.message);
  }
};

// Forgot Password API
exports.ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedResetToken = await bcrypt.hash(resetToken, 10);

    const resetEntry = new PasswordReset({
      userId: user._id,
      resetToken: hashedResetToken,
      expiresAt: Date.now() + 3600000, // 1 hour
    });
    await resetEntry.save();

    await sendResetPasswordEmail(user.email, resetToken);

    res.status(200).json({ message: "Reset password email has been sent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reset Password API

exports.ResetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { newPassword } = req.body;

    console.log("Received resetToken:", resetToken); // Backend
    console.log("Received newPassword:", req.body.newPassword);

    if (!resetToken || !newPassword) {
      return res.status(400).json({ message: "Missing token or password" });
    }

    const resetEntry = await PasswordReset.findOne({
      resetToken: { $exists: true },
      expiresAt: { $gt: Date.now() },
    });

    if (!resetEntry) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(resetEntry.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isTokenValid = await bcrypt.compare(
      resetToken,
      resetEntry.resetToken
    );
    if (!isTokenValid) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    await PasswordReset.deleteOne({ _id: resetEntry._id });

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
