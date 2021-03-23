const express = require("express"); //using express for creating the server
const mongoose = require("mongoose"); //importing mongoose package
const a = require("./functions/PrimeFunctions.js"); //importing module of functions
const { saveData } = require("./functions/DB");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.post("/prime", async (req, res) => {
  let date_ob = new Date();
  // current date
  // adjust 0 before single digit date
  const date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current hours
  const hours = date_ob.getHours();
  // current minutes
  const minutes = date_ob.getMinutes();
  // current seconds
  const seconds = date_ob.getSeconds();
  const ms = date_ob.getMilliseconds();
  // prints date & time in YYYY-MM-DD HH:MM:SS:ms format
  const ts =
    date_ob.getFullYear() +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    ":" +
    ms; //processing get request
  console.log(req.body.type);
  //type of the algorithm to be used to generate prime
  // number is specified in the body of POST request
  const ln = req.body.lower_limit;
  const hn = req.body.upper_limit;
  let s, cdate_ob, cdate_o, telaps;
  switch (req.body.type) {
    case "1":
      s = a.prime(ln, hn);
      cdate_ob = new Date();
      telaps = cdate_ob - date_ob; //calculating time elapsed between req and res
      break;
    case "2":
      s = a.prime_second(ln, hn);
      cdate_o = new Date();
      telaps = cdate_o - date_ob; //calculating time elapsed between req and res
      break;
    default:
      s = "wrong choice";
      return res.status(404).json({ msg: "Invalid Inputs!" });
  }
  const payload = {
    primeNumbers: s,
    timeStamp: ts,
    timeElapsed: telaps + "ms",
    primeCount: s.length,
  };
  console.log("payload:", payload);
  saveData(payload)
    .then(() => {
      return res.status(200).json({ msg: "Successfully Saved the Result!",payload });
    })
    .catch((err) => {
      return res.status(404).json({ msg: err });
    });
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("successfully connected to mongodb"))
  .catch((err) => console.log("There is an error in connecting to db", err));

app.listen(3000, () => console.log("Server listening, Port:", 3000));
