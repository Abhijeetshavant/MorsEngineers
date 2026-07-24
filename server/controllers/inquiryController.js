import Inquiry from "../models/Inquiry.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create inquiry from contact form
export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message, company, requirement } =
      req.body;

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create inquiry in database
    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      subject,
      message,
      company: company || "",
      requirement: requirement || "General Inquiry",
    });

    // Send notification email (optional)
    await sendInquiryNotification(inquiry);

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      data: inquiry,
    });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all inquiries (admin only)
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: inquiries,
    });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get inquiry by ID
export const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }
    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    console.error("Error fetching inquiry:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update inquiry status
export const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry status updated successfully",
      data: inquiry,
    });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete inquiry
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Send email notification
const sendInquiryNotification = async (inquiry) => {
  try {
    // Only send email if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.log(
        "Email credentials not configured. Skipping email notification.",
      );
      return;
    }

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Email to Admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Inquiry: ${inquiry.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f4f4f4; border-radius: 10px;">
          <h2 style="color: #FF5722;">📩 New Inquiry Received</h2>
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>Name:</strong> ${inquiry.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${inquiry.phone}">${inquiry.phone}</a></p>
            <p><strong>Company:</strong> ${inquiry.company || "N/A"}</p>
            <p><strong>Requirement:</strong> ${inquiry.requirement}</p>
            <p><strong>Subject:</strong> ${inquiry.subject}</p>
          </div>
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h3>📝 Message:</h3>
            <p style="background: #f9f9f9; padding: 10px; border-radius: 5px; border-left: 3px solid #FF5722;">${inquiry.message}</p>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
            <p>📱 <a href="https://wa.me/${process.env.WHATSAPP_NUMBER || "919773774716"}">Reply via WhatsApp</a></p>
            <p>🕐 Received at: ${new Date(inquiry.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(adminMailOptions);
    console.log("Email notification sent successfully");
  } catch (error) {
    console.error("Email sending error:", error);
    // Don't throw error - email failure shouldn't break the inquiry
  }
};
