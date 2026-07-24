import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter
const createTransporter = () => {
  // For Gmail
  if (process.env.EMAIL_SERVICE === "gmail") {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // Use App Password, not regular password
      },
    });
  }

  // For other services (SendGrid, Mailgun, etc.)
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export const sendInquiryEmail = async (inquiryData) => {
  try {
    const transporter = createTransporter();

    // Email to Admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL || "mors.engineers@gmail.com",
      subject: `New Inquiry: ${inquiryData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0A192F; color: #F8FAFC; border-radius: 10px;">
          <h2 style="color: #FF5722; border-bottom: 2px solid #00E5FF; padding-bottom: 10px;">📩 New Inquiry Received</h2>
          
          <div style="background: #1E293B; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong style="color: #00E5FF;">Name:</strong> ${inquiryData.name}</p>
            <p><strong style="color: #00E5FF;">Email:</strong> <a href="mailto:${inquiryData.email}" style="color: #FF5722;">${inquiryData.email}</a></p>
            <p><strong style="color: #00E5FF;">Phone:</strong> <a href="tel:${inquiryData.phone}" style="color: #FF5722;">${inquiryData.phone}</a></p>
            <p><strong style="color: #00E5FF;">Company:</strong> ${inquiryData.company || "N/A"}</p>
            <p><strong style="color: #00E5FF;">Requirement:</strong> ${inquiryData.requirement}</p>
            <p><strong style="color: #00E5FF;">Subject:</strong> ${inquiryData.subject}</p>
          </div>
          
          <div style="background: #1E293B; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h3 style="color: #00E5FF;">📝 Message:</h3>
            <p style="background: #0A192F; padding: 10px; border-radius: 5px; border-left: 3px solid #FF5722;">${inquiryData.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #1E293B; text-align: center; color: #94A3B8; font-size: 12px;">
            <p>📱 <a href="https://wa.me/${process.env.WHATSAPP_NUMBER}" style="color: #25D366;">Reply via WhatsApp</a> | 
            ✉️ <a href="mailto:${inquiryData.email}" style="color: #00E5FF;">Reply via Email</a></p>
            <p>🕐 Received at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
          </div>
        </div>
      `,
    };

    // Auto-reply to User
    const userMailOptions = {
      from: process.env.EMAIL_FROM,
      to: inquiryData.email,
      subject: `Thank you for contacting MORS ENGINEERS`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0A192F; color: #F8FAFC; border-radius: 10px;">
          <h2 style="color: #FF5722;">🏭 MORS ENGINEERS</h2>
          <h3 style="color: #00E5FF;">Thank you for reaching out!</h3>
          
          <p>Dear ${inquiryData.name},</p>
          
          <p>We have received your inquiry regarding:</p>
          <div style="background: #1E293B; padding: 10px; border-radius: 5px; border-left: 3px solid #FF5722;">
            <p><strong>Subject:</strong> ${inquiryData.subject}</p>
            <p><strong>Requirement:</strong> ${inquiryData.requirement}</p>
          </div>
          
          <p>Our team will review your request and get back to you <strong>within 24 hours</strong>.</p>
          
          <div style="background: #1E293B; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="text-align: center;">📞 <a href="tel:+919773774716" style="color: #FF5722;">+91 9773774716</a> | 
            💬 <a href="https://wa.me/919773774716" style="color: #25D366;">WhatsApp</a></p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #1E293B; text-align: center; color: #94A3B8; font-size: 12px;">
            <p>MORS ENGINEERS - Your Trusted MRO & Engineering Goods Supply Partner</p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error: error.message };
  }
};
