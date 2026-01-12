import mongoose from "mongoose";
import dotenv from "dotenv";
import Chapter from "./models/Chapter.js";
import Book from "./models/Book.js";

dotenv.config();

const chapters = 
[
  { "title": "Prologue", "duration": "1:11:12", "megaLink": "https://mega.nz/file/9EU0HYZb#rGq6s5bHsLfWhWKLgjxkYeSrP-jd23JX02CZa-uAnOU", "bookId": "696358a124675974473a8788" },
  { "title": "Arya I", "duration": "16:52", "megaLink": "https://mega.nz/file/lFc0ERwJ#fw_32km3xAbvmJPndEXN34CMCPbgejpdnttDPcJnEF8", "bookId": "696358a124675974473a8788" },
  { "title": "Sansa I", "duration": "32:35", "megaLink": "https://mega.nz/file/VQ9G3JZa#w5RYyUlxncPlAlo9os3m3uzwPm-06yt2K_T289zPQI0", "bookId": "696358a124675974473a8788" },
  { "title": "Tyrion I", "duration": "39:59", "megaLink": "https://mega.nz/file/5BtSSR5K#Zq0vnBNzCRnAlcQbfC9ndmN8-jI8uXgXYx_eisfQ05Y", "bookId": "696358a124675974473a8788" },
  { "title": "Bran I", "duration": "25:12", "megaLink": "https://mega.nz/file/wItxhBCS#7duyznwenXn4HNENoescFjBeLBzMp6DevU6LmLfoPWo", "bookId": "696358a124675974473a8788" },

  { "title": "Arya II", "duration": "26:45", "megaLink": "https://mega.nz/file/QJkGiBSL#kZR4jlCAXrsEgrvA7vJfUmvU8aYmX7-q8rtYWcOoG8w", "bookId": "696358a124675974473a8788" },
  { "title": "Jon I", "duration": "33:22", "megaLink": "https://mega.nz/file/YEU00aZI#21wOqL3qkbqSlaO1kzHiILG0oHUrZmQpU53-9knkqoE", "bookId": "696358a124675974473a8788" },
  { "title": "Catelyn I", "duration": "35:30", "megaLink": "https://mega.nz/file/pZ1hSARY#4gi7pXMDAuhyLZY2Up4lNpo6AzTaV6NE4eEABCMBXuU", "bookId": "696358a124675974473a8788" },
  { "title": "Tyrion II", "duration": "34:02", "megaLink": "https://mega.nz/file/VB10VZIC#4_j6WPWN59HQApXXhBJwowQt6exzBUBRtIvEnqGXY2E", "bookId": "696358a124675974473a8788" },
  { "title": "Arya III", "duration": "21:17", "megaLink": "https://mega.nz/file/RUkFBQrK#KAJeHmstijI55QqcYvL6EHttPVIOB7rybNkS_1v47Yo", "bookId": "696358a124675974473a8788" },

  { "title": "Davos I", "duration": "47:39", "megaLink": "https://mega.nz/file/tAMTVCLT#_JrtWOjz8RhL8-bC8JbAL4crmQIVIAjH14BRdBynBdc", "bookId": "696358a124675974473a8788" },
  { "title": "Theon I", "duration": "58:31", "megaLink": "https://mega.nz/file/wE1wiASI#15NSzRM-yLrznWNeBkw2PE45kHDzkxDRcDum_UcV8Zs", "bookId": "696358a124675974473a8788" },
  { "title": "Daenerys I", "duration": "40:33", "megaLink": "https://mega.nz/file/Jd0UQJwY#1rHrTARBmTh4vuwFuQ2G3WOdn7KHipSRJbbZVSG0tfQ", "bookId": "696358a124675974473a8788" },
  { "title": "Jon II", "duration": "17:11", "megaLink": "https://mega.nz/file/dBFFmZQa#1i7kPHfuGuBpRxJl6RMTf6wFCoxhLkDDaRycDixs700", "bookId": "696358a124675974473a8788" },
  { "title": "Arya IV", "duration": "39:48", "megaLink": "https://mega.nz/file/II8x1T7b#fGO1ulxV1cauZrjgryL_8OUMg1mqJzEm2lLGUId-c7M", "bookId": "696358a124675974473a8788" },

  { "title": "Tyrion III", "duration": "35:41", "megaLink": "https://mega.nz/file/cQVRETAK#-ViADdD9QLpbRWYY9ab4uyK6qsupGfPVo6RKen08clA", "bookId": "696358a124675974473a8788" },
  { "title": "Bran II", "duration": "43:28", "megaLink": "https://mega.nz/file/YZVViKjS#AKNis2tf-U6vjibyhovEt0O0RY7k-OwB2uuBKdNDrPw", "bookId": "696358a124675974473a8788" },
  { "title": "Sansa II", "duration": "43:30", "megaLink": "https://mega.nz/file/gMtF2QrY#qztfH55sqiQ1YwUiE4t8h1ixnPNZZ1akQbCKy7AjmyQ", "bookId": "696358a124675974473a8788" },
  { "title": "Sansa II", "duration": "23:23", "megaLink": "https://mega.nz/file/YR0w3CRY#wnJ9Man_MiQPBBRXyV_LrvNZIYIYGUSED50hRozS5kY", "bookId": "696358a124675974473a8788" },
  { "title": "Arya V", "duration": "41:52", "megaLink": "https://mega.nz/file/oIcyCQhZ#hFoNJabyOvqru6xYkbx0Dzn_s-u0ItAU952ao5xEwrI", "bookId": "696358a124675974473a8788" },
  { "title": "Tyrion IV", "duration": "35:42", "megaLink": "https://mega.nz/file/8N9gGYTI#2w0DcXKxSl_AP7tXQCF5p5u7cz3wzggFkRVqWoVEnJg", "bookId": "696358a124675974473a8788" },

  { "title": "Bran III", "duration": "24:37", "megaLink": "https://mega.nz/file/kMl0QJZI#D-pWL4Mg5YmobxYYYS47wDpnWwVPwHZjt2yRuwS64xE", "bookId": "696358a124675974473a8788" },
  { "title": "Catelyn II", "duration": "47:15", "megaLink": "https://mega.nz/file/pB8RGBiY#geroyt06D_Wc5QxfSehl4dXSD99nfcHQLTEnpaJOzd8", "bookId": "696358a124675974473a8788" },
  { "title": "Jon III", "duration": "54:54", "megaLink": "https://mega.nz/file/ZV0XlaaJ#prUBcsx8iEdtXjvKCpqCNcfPZpll2quyeTTci_8MxCE", "bookId": "696358a124675974473a8788" },
  { "title": "Theon II", "duration": "43:36", "megaLink": "https://mega.nz/file/NIsR3agJ#QDee3pSTJTJjGg2ZIpmpOxSvH6qFd7NRkVfQEr1dBDI", "bookId": "696358a124675974473a8788" },
  { "title": "Tyrion V", "duration": "37:36", "megaLink": "https://mega.nz/file/lJMxzAYJ#F0yhuL6xR87rOzxKHa2EtitHFuoEQWdB-gd3bg_h5fQ", "bookId": "696358a124675974473a8788" },

  { "title": "Arya VI", "duration": "19:00", "megaLink": "https://mega.nz/file/FcEmGAYR#GierBik7u4Alm1f7Mq27mAxstrw00ALJWuluyUHnycU", "bookId": "696358a124675974473a8788" },
  { "title": "Daenerys II", "duration": "25:26", "megaLink": "https://mega.nz/file/dUkj3AJI#HJ9z-LNrxHNMJdmGbBUWl17WahOcdskIL0sMQDRZdAI", "bookId": "696358a124675974473a8788" },
  { "title": "Bran IV", "duration": "24:08", "megaLink": "https://mega.nz/file/JFMTgCpb#Va9j2zPGZ1064a1Or4_M6R5dQVKWOxKQYFPS7cGW74I", "bookId": "696358a124675974473a8788" },
  { "title": "Tyrion VI", "duration": "24:05", "megaLink": "https://mega.nz/file/ZdFyjISK#8FR_iZdXv5-e122s_Ga47DB1V2wDid8CO0QVnOWTTkI", "bookId": "696358a124675974473a8788" },
  { "title": "Arya VII", "duration": "35:10", "megaLink": "https://mega.nz/file/0MURCKbJ#rFvVYnEZuwLHUUl9bF6Xc_yQLn75BC2_wTQ1Zliu49A", "bookId": "696358a124675974473a8788" },

  { "title": "Catelyn III", "duration": "35:50", "megaLink": "https://mega.nz/file/xZFXAYJI#Qhb_nD2B9qk3W6FHnmzeTnr2LB_-dQ0y2WmTlP73ZWA", "bookId": "696358a124675974473a8788" },
  { "title": "Sansa III", "duration": "21:58", "megaLink": "https://mega.nz/file/ZMFS1TQQ#CSNz9OthO5L3SbSNdns0BpBQ1LR34t9tb1rwslV-UMk", "bookId": "696358a124675974473a8788" },
  { "title": "Catelyn IV", "duration": "26:05", "megaLink": "https://mega.nz/file/NYE0lCAQ#6tODVQA_j6n3pcl4dznA9-SrBiLI6ebaNHON6wzL65s", "bookId": "696358a124675974473a8788" },
  { "title": "Jon IV", "duration": "25:34", "megaLink": "https://mega.nz/file/pRk2BJjB#JR7ZuVuvQ4cunvoFfDAYPHSDDEzd9guzldJgk9DSrdw", "bookId": "696358a124675974473a8788" },
  { "title": "Bran V", "duration": "19:00", "megaLink": "https://mega.nz/file/RQ0wEQKQ#9Ww_cYrt4TJudGZUjScpTF7dHl115UMJsQrQsrtqOs8", "bookId": "696358a124675974473a8788" },

  { "title": "Tyrion VII", "duration": "21:11", "megaLink": "https://mega.nz/file/Ucs22I6a#kGl_VKYA6pB6CUMJrK9r0RkjNjSJb4Ljttq-07jg8eM", "bookId": "696358a124675974473a8788" },
  { "title": "Theon III", "duration": "20:27", "megaLink": "https://mega.nz/file/AENHSRIC#kBDslG6XoeNIVZk6gk8kyetiFoVkX8nZpfBKXW7al_Q", "bookId": "696358a124675974473a8788" },
  { "title": "Arya VIII", "duration": "22:13", "megaLink": "https://mega.nz/file/ld9hBKgD#GR2-Gc_cwzM1FXMC9Maj_GPgWV1hqY51dZ8MYJrUrtE", "bookId": "696358a124675974473a8788" },
  { "title": "Catelyn IV", "duration": "39:14", "megaLink": "https://mega.nz/file/1Z8WABgB#d-8OEZd_5QwtjuG9WKGH5JiQst6kALTa_g-omDTABbE", "bookId": "696358a124675974473a8788" },

  { "title": "Daenerys III", "duration": "28:11", "megaLink": "https://mega.nz/file/gckl1YDY#XUZ0_7kS5MNkfudOBuq9tXQ7U7CPkk4gylBjEsYl6dw", "bookId": "696358a124675974473a8788" },
  { "title": "Tyrion VIII", "duration": "37:01", "megaLink": "https://mega.nz/file/IJ0GHYDR#pnklTqOvK_aJptrKUc7N405P01kzsJOxx7nPr9hI7C8", "bookId": "696358a124675974473a8788" },
  { "title": "Davos II", "duration": "46:41", "megaLink": "https://mega.nz/file/JdUGGCIA#FX2Y21OW82l842C99kPOMTdyAa8dMQmEvWMOgzhTnms", "bookId": "696358a124675974473a8788" },
  { "title": "Jon V", "duration": "20:48", "megaLink": "https://mega.nz/file/tdsgHbZC#LH4az9mBIgizM048Did05-vC6Cx5RJ9322L77TDOLms", "bookId": "696358a124675974473a8788" },
  { "title": "Tyrion IX", "duration": "35:23", "megaLink": "https://mega.nz/file/IN00EQQT#Su-R-Uc2EodvT8qdj4stpt6LhJoxhH4q4bfsK2r5wsc", "bookId": "696358a124675974473a8788" },
  { "title": "Catelyn V", "duration": "30:21", "megaLink": "https://mega.nz/file/VBkB0bbT#c28fVnWOdAjNGKkoPshWbVOx8Oo4ttrZ4mGGnZtPSv4", "bookId": "696358a124675974473a8788" },
  { "title": "Bran VI", "duration": "26:00", "megaLink": "https://mega.nz/file/lYVhWCgI#FZTZzpMS9iF1DF1noUvTJSNFcPqv25mHpEj26K2qDok", "bookId": "696358a124675974473a8788" },
  { "title": "Arya IX", "duration": "48:34", "megaLink": "https://mega.nz/file/lAdmDBRA#tQNhTLx7WPCkTAneyUFDhB5IxVXuUeYPIbWuYvx0jPE", "bookId": "696358a124675974473a8788" },

  { "title": "Daenerys IV", "duration": "30:42", "megaLink": "https://mega.nz/file/cNFBiaJB#uXEfjGDKmfI_sA9jMX5SK04jj24k9Y8dd1HamkZTPKM", "bookId": "696358a124675974473a8788" },
  { "title": "Tyrion X", "duration": "24:27", "megaLink": "https://mega.nz/file/kZMFiIhC#CAFpmpsmPR31D0YlMRpttykAIdV5vUSF3OiwJRm5pB4", "bookId": "696358a124675974473a8788" },
  { "title": "Theon IV", "duration": "36:29", "megaLink": "https://mega.nz/file/cYdTmSzL#gtnt92YYfbVVZhTEb93riFePVSygfvz0aPTeAGfC96Y", "bookId": "696358a124675974473a8788" },
  { "title": "Jon VI", "duration": "31:58", "megaLink": "https://mega.nz/file/9JtyxZ4Z#Bg0R2nZpnO3cx5LKEA9edxcjcMmsVZSRZtMJ2PQ2G8w", "bookId": "696358a124675974473a8788" },
  { "title": "Sansa IV", "duration": "26:52", "megaLink": "https://mega.nz/file/FMdVQJyD#m7cunD6GfmEIZIOWekCayh3QIi99Q6Cz_v6pBmbBpbQ", "bookId": "696358a124675974473a8788" },
  { "title": "Jon VII", "duration": "21:55 ", "megaLink": "https://mega.nz/file/hVsTUZbT#OK82Y-zFhSBLOcIFdDODbOiCB1r3b-rxxBHtEECcwvg", "bookId": "696358a124675974473a8788" },
  { "title": "Tyrion XI", "duration": "22:08", "megaLink": "https://mega.nz/file/RUF0mK6Q#UASaVVQQeN5bGrOdemB9CmRSSRkhoYdtWG-wmr6llGA", "bookId": "696358a124675974473a8788" },
  { "title": "Catelyn VI", "duration": "40:12", "megaLink": "https://mega.nz/file/gRlD3Ihb#_TifQ19sQz7cGgaHFLOCv6V2XECZp0iT-sINbLl0aqo", "bookId": "696358a124675974473a8788" },

  { "title": "Theon V", "duration": "25:00", "megaLink": "https://mega.nz/file/9QEhWTDS#2IU0YWg3jBDHMhSqquzejj3eYosg8I-0apLyV6eUMxA", "bookId": "696358a124675974473a8788" },
  { "title": "Sansa V", "duration": "17:57", "megaLink": "https://mega.nz/file/EB9iQIqa#8Tlk-CUCsg3j5yuI9xZm3VXCA5yVX34tEX3U3nJSGHQ", "bookId": "696358a124675974473a8788" },
  { "title": "Davos III", "duration": "42:44", "megaLink": "https://mega.nz/file/dRkCHTQJ#KxGKYiu4DQvDanM9u1q4ocwOFI-wmYmfEJn8uyIxXv8", "bookId": "696358a124675974473a8788" },
  { "title": "Tyrion XII", "duration": "15:45", "megaLink": "https://mega.nz/file/8Nth0R4S#s0nvwINywu4lB_I4TCp3UZeQxR-IapVkH3Q-K-kIqIs", "bookId": "696358a124675974473a8788" },
  { "title": "Sansa VI", "duration": "16:40", "megaLink": "https://mega.nz/file/NYcnlRzQ#bLa_6Uw09rlDXt5gVz5fHp52k_UVc9x6urNuhrtyov4", "bookId": "696358a124675974473a8788" },
  { "title": "Tyrion IX", "duration": "20:38", "megaLink": "https://mega.nz/file/tZ8CiCZa#bd07BH1ksiLNGaAzp3WdQYiiFpT7KCOFFg12S3IFY7c", "bookId": "696358a124675974473a8788" },
  { "title": "Sansa VI", "duration": "20:09", "megaLink": "https://mega.nz/file/hckkWKIC#euMq9uy-IF0TIxDVtvT3H-0WoPc9aGY3iy54UkGfJwc", "bookId": "696358a124675974473a8788" },
  { "title": "Danerys V", "duration": "35:11", "megaLink": "https://mega.nz/file/8RtDFD5A#Z_jJ7TcU-kin17JnCp2MyTt1GBWk9wtR6z8aV-YTrTE", "bookId": "696358a124675974473a8788" },
  { "title": "Arya X", "duration": "45:00", "megaLink": "https://mega.nz/file/xdcWmJZZ#CHrVZ-BGzOQpEIxKN0fKPhuJlt2D385UhSf5BFL8dpE", "bookId": "696358a124675974473a8788" },
  { "title": "Sansa VII", "duration": "26:13", "megaLink": "https://mega.nz/file/sFVnzKjK#ZQscnFfpGnzhAYZ3ubzVNLo5bh55v9fqzZ-o_kAlGUU", "bookId": "696358a124675974473a8788" },
  { "title": "Theon V", "duration": "33:28", "megaLink": "https://mega.nz/file/VQNDDbSY#Vpx5Lq2mDVjS6T6KZEzknMT251xcIdjH-cPpGXRU-fU", "bookId": "696358a124675974473a8788" },
  { "title": "Tyrion X", "duration": "27:37", "megaLink": "https://mega.nz/file/5QknmTKD#i1s4XustNQSjHlEGZ1dmfhWvE1TsCZEf5hhmUE4YVX4", "bookId": "696358a124675974473a8788" },
  { "title": "Jon VIII", "duration": "31:05", "megaLink": "https://mega.nz/file/4Ad0TYCC#y0a9xtaIUNDICSYx6iLUojlj3eXz91W_adPAo47rWxQ", "bookId": "696358a124675974473a8788" },
  { "title": "Bran VII", "duration": "34:16", "megaLink": "https://mega.nz/file/sM01nAra#_LEzAZEMVt0G6TjEgHR9ZCf-rV70gXPXeWBAOF-BGh0", "bookId": "696358a124675974473a8788" }
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





 