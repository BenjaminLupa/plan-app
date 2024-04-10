import Express from "express";
import cors from "cors";
import { today, thisWeek, thisMonth } from "../posts";

const app = Express();
app.use(cors());

app.get("/posts", (_req, res) => {
  res.json([today, thisWeek, thisMonth]);
});

app.listen(8000, () => {
  console.log("Port 8000");
});
