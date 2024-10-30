import express from "express";
import { json } from "express";
import cors from "cors";
import Razorpay from "razorpay";

const app = express();
const port = 7000;

app.use(json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/payment", async (req, res) => {
  let { amount } = req.body;

  var instance = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_SECRET',
  });

  let order = await instance.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt#1",
  });

  res.status(201).json({
    success: true,
    order,
    amount,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
