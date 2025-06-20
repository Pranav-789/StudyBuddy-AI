import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email, emailType, userId})=>{
   try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    }

    var transport = nodemailer.createTransport({
      // host: "sandbox.smtp.mailtrap.io",
      // port: 2525,
      service: "gmail",
      auth: {
        user: process.env.TRANSPORT_USER,
        pass: process.env.TRANSPORT_PASSWORD,
      },
    });

    const resetUrl = `${process.env.DOMAIN}/reset-password?token=${hashedToken}`;

    const mailOptions = {
      from: "pranavzambare2006@gmail.com",
      to: email,
      subject: emailType === "RESET" ? "Reset your password" : "",
      html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Reset Your Password</h2>
          <p>Hello,</p>
          <p>We received a request to reset your password for your StudyBuddy AI account.</p>
          <p>If you didn't request this, you can safely ignore it. Otherwise, click the button below to reset your password:</p>
          <a href="${resetUrl}" style="
              display: inline-block;
              padding: 10px 20px;
              margin: 20px 0;
              font-size: 16px;
              color: #ffffff;
              background-color: #6366f1;
              text-decoration: none;
              border-radius: 5px;
            ">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>Best regards,<br/>The StudyBuddy AI Team</p>
        </div>
        `,
    };
    console.log("Mailtrap user:", process.env.TRANSPORT_USER);
    console.log("Mailtrap pass:", process.env.TRANSPORT_PASSWORD);

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
   } catch (error) {
    throw new Error((error?.message || error || "Unknown error").toString());
   }
}