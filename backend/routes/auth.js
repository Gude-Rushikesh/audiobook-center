import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const router = express.Router();

const ACCESS_EXPIRE = "15m";
const REFRESH_EXPIRE = "7d";

        /* -------- TOKEN HELPERS -------- */
        const signAccess = (user) =>
          jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: ACCESS_EXPIRE }
          );

        const signRefresh = (user) =>
          jwt.sign(
            { id: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: REFRESH_EXPIRE }
          );


/* -------- REGISTER -------- */
 router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: true,
    });

    await newUser.save();

    // ✅ SEND RESPONSE FIRST
    res.json({message: "User registered successfully."});
      } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ error: "Registration failed" });
      }
    });





// -------- LOGIN --------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });


    // compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong password" });


    const accessToken = signAccess(user);
    const refreshToken = signRefresh(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ token: accessToken, user });
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
  });

    // create JWT token
    //   const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "2h" });

    //   res.json({ message: "Login successful", token, user });
    //   } catch (err) {
    //     res.status(500).json({ error: err.message });
    //   }
    // });


    // -------- REFRESH --------
    router.post("/refresh", (req, res) => {
      const token = req.cookies.refreshToken;
      if (!token) return res.sendStatus(401);

      jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
        if (err) return res.sendStatus(403);

        const user = await User.findById(decoded.id);
        if (!user) return res.sendStatus(401);

        const newAccess = signAccess(user);
        res.json({ token: newAccess });
      });
    });


    // -------- LOGOUT --------
    router.post("/logout", (req, res) => {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.json({ message: "Logged out" });
    });

export default router;
















































// import crypto from "crypto";
// import EmailToken from "../models/EmailToken.js";
// import { sendVerificationEmail } from "../utils/sendEmail.js";

    // if (existingUser && !existingUser.isVerified) {
    //   await User.deleteOne({ _id: existingUser._id });
    //   await EmailToken.deleteMany({ userId: existingUser._id });
    // }
              // && existingUser.isVerified

    // ✅ EMAIL IS FIRE-AND-FORGET
    // sendVerificationEmail(newUser.email, token)
    //   .catch(err => console.error("Email error:", err.message));

        // const token = crypto.randomBytes(32).toString("hex");

    // await EmailToken.create({
    //   userId: newUser._id,
    //   token,
    //   expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    // });

                                                                                                                      //   if (!user.isVerified) {
                                                                                                                      //   return res.status(403).json({
                                                                                                                      //     error: "Please verify your email before logging in",
                                                                                                                      //   });
                                                                                                                      // }

        // router.get("/verify-email", async (req, res) => {
        //   try {
        //     const { token } = req.query;

        //     const record = await EmailToken.findOne({ token });
        //     if (!record) {
        //       return res.status(400).json({ error: "Invalid or expired link" });
        //     }

        //     if (record.expiresAt < Date.now()) {
        //       return res.status(400).json({ error: "Link expired" });
        //     }

        //     await User.findByIdAndUpdate(record.userId, {
        //       isVerified: true,
        //     });

        //     await EmailToken.deleteOne({ _id: record._id });

        //     res.json({ message: "Email verified successfully" });
        //   } catch (err) {
        //     res.status(500).json({ error: err.message });
        //   }
        // });

