import mongoose from "mongoose";
import dotenv from "dotenv";
import Chapter from "./models/Chapter.js";
import Book from "./models/Book.js";

dotenv.config();

const chapters = 
[
  {
    "title": "Prologue – A Childhood of Isolation",
    "duration": "05:57",
    "megaLink": "https://mega.nz/file/UFMV1bLT#yjeHVEND3yEILkWNpvfwQWV7rohReH2KTtsApKwrIPo",
    "bookId": "695a245f37873b197184b26b"
  },

  {
    "title": "Chapter 1 – Gateshead and the Red-Room",
    "duration": "12:40",
    "megaLink": "https://mega.nz/file/hFkn1JzK#xNn1zzSwkUl057hnijsq9mxv5ZQ1xYl1--by9RfECjg",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 2 – Punishment and Defiance",
    "duration": "17:59",
    "megaLink": "https://mega.nz/file/VVk10YIC#e6idzNgn1sxSWYhcP_MC7bCIWXV9r1uputaLUkJ_QTY",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 3 – Illness and Kindness",
    "duration": "21:18",
    "megaLink": "https://mega.nz/file/JE03#link_placeholder",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 4 – Farewell to Gateshead",
    "duration": "32:20",
    "megaLink": "https://mega.nz/file/JUtRFawJ#bp_5rxjBv27ETk2AmcUpzqvHn2YXtuij8_-wROZF23w",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 5 – Lowood Institution",
    "duration": "31:07",
    "megaLink": "https://mega.nz/file/gZ0X1SrL#9MfDgZ2WqY1-pESk14tZbtK_d39G7Vx4Em6PkKJM7n4",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 6 – Friendship with Helen Burns",
    "duration": "19:55",
    "megaLink": "hhttps://mega.nz/file/RAtRRCoZ#gPphftVCpt-cQ9SEFcj_RQdKOlxUX_OwSei-zWr9tws",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 7 – Public Humiliation",
    "duration": "22:11",
    "megaLink": "https://mega.nz/file/FdkTHLbR#QUBGQxQ_79v18frVzJa_y1gI5zE9jfsgftvu6weM5lA",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 8 – Vindication and Loss",
    "duration": "22:22",
    "megaLink": "https://mega.nz/file/cZUAjYTI#dUw3lP-4gVSj53ho64O6QPD_y4V1nupA5UJ5Uilda28",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 9 – Years of Growth",
    "duration": "23:50",
    "megaLink": "https://mega.nz/file/BJdSnKrC#Ss1cCDoS2LLogkDBELlkot3GJUp16xfRCHXRRAiseE0",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 10 – A New Beginning",
    "duration": "29:52",
    "megaLink": "https://mega.nz/file/JY9ixT4B#um_C1V7a_rDcircFnk3_O-Nbt2hCLTKGYXOhpNJfJYA",
    "bookId": "695a245f37873b197184b26b"
  },

  {
    "title": "Chapter 11 – Thornfield Hall",
    "duration": "40:41",
    "megaLink": "https://mega.nz/file/xJ0xCRLK#FFWxCw-c3WSpNyXCFlWKIOfy6pLx3jXWdLxa72LTVOc",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 12 – Solitude and Reflection",
    "duration": "28:25",
    "megaLink": "https://mega.nz/file/hV0XFBBS#30rDXWMqI7fUEemUXJEV74rP-R2L6LAkv7ZKa6Cqhs8",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 13 – Rochester Appears",
    "duration": "26:30",
    "megaLink": "https://mega.nz/file/pJ8WjAxA#S2hdjueottkdIBE7XdBg_5pIaghaqcMs5luaNIFhQtE",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 14 – Conversations by the Fire",
    "duration": "32:40",
    "megaLink": "https://mega.nz/file/wRcDACja#zTfEsmtm0p7dGUGKXwuuSnUcZiqTVAroiiTGhJPnDoo",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 15 – Fire in the Night",
    "duration": "34:05",
    "megaLink": "https://mega.nz/file/lcUFBBqB#Oh8fvBa4qy4AqigoC0K0Au_RBPZ80U6eUxyedkuij1g",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 16 – Growing Affection",
    "duration": "21:01",
    "megaLink": "https://mega.nz/file/4MlRESDA#szj1zAHFSLvy752ktQg8NBeAJN9FRrexdFDJcWuLBBA",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 17 – Arrival of Guests",
    "duration": "47:02",
    "megaLink": "https://mega.nz/file/QVMBVLqI#hfjfqoAptrPPbXYxQeg0-HfHgv-kDLlwY9StjKRsXBI",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 18 – Jealousy and Revelation",
    "duration": "35:02",
    "megaLink": "https://mega.nz/file/MRMEFYBL#yL2rjxhzOEYETOstV5Uj79mwVI7sclLeTsKbMKs5pxw",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 19 – Secrets and Suspicion",
    "duration": "26:52",
    "megaLink": "https://mega.nz/file/Uc8nyaib#HSkeuocMzaM4uyAFxYkJhGSxdHW5z7KGKxby4Lit0ZM",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 20 – The Proposal",
    "duration": "39:29",
    "megaLink": "https://mega.nz/file/xZ1R2Aoa#-pI2yZE_rSLKVcwwINKdFUP7vqEwAIviWJ71sTQDvG4",
    "bookId": "695a245f37873b197184b26b"
  },

  {
    "title": "Chapter 21 – An Unexpected Inheritance",
    "duration": "53:56",
    "megaLink": "https://mega.nz/file/AEtWhDSR#Rihm7Sph4amNqi7mGLaafh9U6VXJBWR5zAACkkRVhK4",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 22 – Wedding Preparations",
    "duration": "25:13",
    "megaLink": "https://mega.nz/file/UUswVQaK#ClcuK6T_PiVEHYQs8iKu_dyk9E-NbDwNEc1WJYp-JF0",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 23 – Doubts and Dreams",
    "duration": "34:24",
    "megaLink": "https://mega.nz/file/sMdGGBhA#DW76xsQgW7nNrTosYpCRvWLZpkpWO2GWHXcy-Vcydag",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 24 – The Veil Torn",
    "duration": "40:25",
    "megaLink": "https://mega.nz/file/oIsjibTC#1a6vJmIdyfiF1SVbA6O10s-qkw0fBnc7t4gwN6nZWeM",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 25 – The Wedding Interrupted",
    "duration": "34:21",
    "megaLink": "https://mega.nz/file/EJEVwAba#hjS71ayyrPDMxBExnkMiPD6OEi8zufbFSoGJniqUSQg",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 26 – Truth Revealed",
    "duration": "31:28",
    "megaLink": "https://mega.nz/file/4UdjAapY#vZA8xI-f3MKcCeRfgJeLz-L1s8NRy8YXoXPh9w9UZPY",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 27 – Flight from Thornfield",
    "duration": "1:25:26",
    "megaLink": "https://mega.nz/file/YVFAQZJY#oJYorfq0bgBEuTcR8CgTo0w1iz91-vSvYCUCvv_Zuf0",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 28 – Wandering and Hunger",
    "duration": "50:29",
    "megaLink": "https://mega.nz/file/8ddRyTYT#f7D7vhw5qM7tKeuz6BXO30VMNfWNDuad47I7BM_X0uo",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 29 – Shelter at Moor House",
    "duration": "28:34",
    "megaLink": "https://mega.nz/file/tREiDawJ#jwpz_dHbeANf2v3ewNyJCEkcpI7cxgtbdD4pBzlCeA4",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 30 – New Duties and Resolve",
    "duration": "24:04",
    "megaLink": "https://mega.nz/file/BYc1xBYI#1yt_RmBGxT7oy7Kkt4Hmt5tcUn8RUsmY5SWjKY2SF2U",
    "bookId": "695a245f37873b197184b26b"
  },

  {
    "title": "Chapter 31 – A Tempting Offer",
    "duration": "19:59",
    "megaLink": "https://mega.nz/file/lEtzSaYb#L1ddnwNP8MlzUhVVo8NF2SapMwUoXalSNO8UO7GMIFY",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 32 – Conflict of Heart and Mind",
    "duration": "28:47",
    "megaLink": "https://mega.nz/file/sd9iQTRC#jOXMA8RZWJFNY0lUpQGPBI8-pkpkgvSWjJPwZyCeEYE",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 33 – The Call of Love",
    "duration": "38:02",
    "megaLink": "https://mega.nz/file/tZUDABJS#DIXvyyMm_x5ZHed_ebhTZcaKVav4cW0gPYOt5uqdVJI",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 34 – Return to Thornfield",
    "duration": "58:22",
    "megaLink": "https://mega.nz/file/9Zd1hLxY#5mQEcnIZ_kbeIOxOnXxhG0aEUpaT8RrKsui0BEP4P3c",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 35 – Ruins and Revelation",
    "duration": "28:18",
    "megaLink": "https://mega.nz/file/MR1iGBoJ#eqyo3VXWUfR1sZJ4o6-iT2zcy0DF02J6QvEqXJ_sL5U",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 36 – Reunion",
    "duration": "24:13",
    "megaLink": "https://mega.nz/file/oZ9lSIBD#JYRVdmkmVRHn2koBjrmNw-dWSuAw8m4sK29VpfdvFlY",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 37 – Renewal and Hope",
    "duration": "47:59",
    "megaLink": "https://mega.nz/file/5MdmVCJR#WvyVB8lknwTxNDtbjn-ByD3t9CSSKMNXfi4DHlPLs5Q",
    "bookId": "695a245f37873b197184b26b"
  },
  {
    "title": "Chapter 38 – A Life of Equality and Love",
    "duration": "11:23",
    "megaLink": "https://mega.nz/file/UAlSjYzb#4yJ45cUMQPpqcn3AYq9nzPGX5l18sq0E4nKQ_Eowxx0",
    "bookId": "695a245f37873b197184b26b"
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





 