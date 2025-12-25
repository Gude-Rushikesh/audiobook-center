import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import EmailToken from "../models/EmailToken.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";


const router = express.Router();

// // -------- REGISTER --------
      router.post("/register", async (req, res) => {
        try {
          const { name, email, password } = req.body;

          const existingUser = await User.findOne({ email });
          if (existingUser)
            return res.status(400).json({ error: "Email already exists" });

          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = new User({
            name,
            email,
            password: hashedPassword,
          });
          await newUser.save();

          const token = crypto.randomBytes(32).toString("hex");

          await EmailToken.create({
            userId: newUser._id,
            token,
            expiresAt: Date.now() + 24 * 60 * 60 * 1000,
          });

          await sendVerificationEmail(newUser.email, token);

          res.json({ message: "User registered successfully. Please verify your email." });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });

        router.get("/verify-email", async (req, res) => {
          try {
            const { token } = req.query;

            const record = await EmailToken.findOne({ token });
            if (!record) {
              return res.status(400).json({ error: "Invalid or expired link" });
            }

            if (record.expiresAt < Date.now()) {
              return res.status(400).json({ error: "Link expired" });
            }

            await User.findByIdAndUpdate(record.userId, {
              isVerified: true,
            });

            await EmailToken.deleteOne({ _id: record._id });

            res.json({ message: "Email verified successfully" });
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
        });



// -------- LOGIN --------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    if (!user.isVerified) {
    return res.status(403).json({
      error: "Please verify your email before logging in",
    });
  }


    // compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    // create JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
