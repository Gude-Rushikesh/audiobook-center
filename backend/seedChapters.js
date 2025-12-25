import mongoose from "mongoose";
import dotenv from "dotenv";
import Chapter from "./models/Chapter.js";
import Book from "./models/Book.js";

dotenv.config();

const chapters = 
[
  {
    "title": "Prologue – Letters from Captain Walton",
    "duration": "36:33",
    "megaLink": "https://mega.nz/file/JB1lRKiK#_XwK6h55ZwC7827Qi5Dig5OSNAtUsqLBd4tu7e--zvU",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 01 – Childhood and Early Education",
    "duration": "10:30",
    "megaLink": "https://mega.nz/file/gJklVR6Q#sZnvAIA85Rk3G4mRpXwnt5DlNJ1hrUg_uoGgG57rlG4",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 02 – Obsession with Science",
    "duration": "17:08",
    "megaLink": "https://mega.nz/file/sQEBWQbY#AuvE5pbayNWjdj02_gq3K5qmBiG5xHBGUTmIv7FcEtI",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 03 – The Creation Begins",
    "duration": "31:50",
    "megaLink": "https://mega.nz/file/8VsXiYpQ#s8MXZFNeCTDuvi8HwkAebyE91FiyuqNTlU9w9fZfPwk",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 04 – The Creature Awakens",
    "duration": "17:08",
    "megaLink": "https://mega.nz/file/kAMRgJTR#BPFaY8SnnG3e_nuoHcY4wnBOTJMMXgqhUEXRh-La3H4",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 05 – Horror and Regret",
    "duration": "19:34",
    "megaLink": "https://mega.nz/file/YRkziBpD#dKA4866Shf8B_kJb0zYU6lSRX4__y2vshcPO1jorT6s",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 06 – Recovery and Letters",
    "duration": "21:44",
    "megaLink": "https://mega.nz/file/AMMhUSbL#ggP12_1sTkU_kqeI8iY6e3JrNqEz8rWC3eOJMh7MM6Q",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 07 – Tragedy Strikes",
    "duration": "20:36",
    "megaLink": "https://mega.nz/file/EdlWALRD#FOC4jO0oFgR0qujDD6eRq2polmcb-eZx6mtAMQqfUDA",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 08 – A False Accusation",
    "duration": "13:44",
    "megaLink": "https://mega.nz/file/NVMylToQ#981Cm0dN166YoUgtAZLKlS42fAVzLOQezI3RMZvbqFQ",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 09 – Guilt and Grief",
    "duration": "16:26",
    "megaLink": "https://mega.nz/file/IQ0BEToS#UJ4BH92HOfLPsW2mFlLPZNLADPoeqtjNTTaexDFCP7s",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 10 – The Monster Speaks",
    "duration": "17:44",
    "megaLink": "https://mega.nz/file/1dk1GICI#dXibsA2x8PvZiYe5GrI1KTAfrcDbUYJr46ZiJWKxSiI",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 11 – The Creature’s Story",
    "duration": "13:46",
    "megaLink": "https://mega.nz/file/cclD2YRS#qKkSbOlInmzz_KA2Vs7s7a66GTWCLPvMXOHKKKifWRg",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 12 – Learning Humanity",
    "duration": "13:23",
    "megaLink": "https://mega.nz/file/kA8xFQBK#JdCSDQBaDduse1lxNIweTN-eh1rlewmO1Ubs4hXYzRc",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 13 – Rejection and Rage",
    "duration": "27:08",
    "megaLink": "https://mega.nz/file/UZtSHQ6a#LjWUc_QP8ZN2-r2CHicgjf7qYuY9fFSAOlE6CmDBRWI",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 14 – Despair and Violence",
    "duration": "22:13",
    "megaLink": "https://mega.nz/file/wBMRnRzT#0PI-AnQK0duD1Ine7C93n1v3X50AQfjypYTWOCGQsO8",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 15 – The Demand",
    "duration": "13:32",
    "megaLink": "https://mega.nz/file/lEUhhC6a#byti9i1vQNsJHktms60sm08zWguVqfU-_tOdp7ptRHw",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 16 – A New Creation",
    "duration": "19:52",
    "megaLink": "https://mega.nz/file/McEkCTAZ#r6imD2J99FtpDKXRmI9DWwZdsFzdP8kVgfZD2SYj1fQ",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 17 – Destruction of Hope",
    "duration": "16:48",
    "megaLink": "https://mega.nz/file/wQ9ikIoY#4MPy6H2eYnH6ce_zHsOCRgZ5norryZgO3oSKGbE9MmU",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 18 – Revenge",
    "duration": "24:58",
    "megaLink": "https://mega.nz/file/4ZckjBQY#42rxpQLNPbLjCJYM3qYzrIxLV8Tb246hJqDD0q1YTb4",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 19 – The Final Tragedy",
    "duration": "40:51",
    "megaLink": "https://mega.nz/file/9c8FAJpQ#xoI5QixIpI6chAwu4hUH2YLbmqcxuqnBglAHUbu0mGk",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 20 – Pursuit Across the Ice",
    "duration": "19:26",
    "megaLink": "https://mega.nz/file/MEtnhLJL#YH4Il9p6DAzCD18orR1NOPbb28nN3Nz5HZJRtJEeT9Y",
    "bookId": "694d00ec0d5937a33026f9ad"
  },
  {
    "title": "Chapter 21 – The End of the Creator",
    "duration": "1:01:24",
    "megaLink": "https://mega.nz/file/FRsUTASL#I64ceopaHEWgxo9BEQcBX0lpy9tcU9IslnZicD2hdpM",
    "bookId": "694d00ec0d5937a33026f9ad"
  }
]











async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const inserted = await Chapter.insertMany(chapters);

    await Book.findByIdAndUpdate(
      chapters[0].bookId,
      { $push: { chapters: { $each: inserted.map(c => c._id) } } }
    );

    console.log("✅ Chapters bulk inserted");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();





 