const express = require("express");
const app = express();
const cors = require("cors");

const initializeDatabase = require("./db");
const scheduleRouter = require("./routes/schedule.routes");

initializeDatabase();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Data plant");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.use("/schedules", scheduleRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
