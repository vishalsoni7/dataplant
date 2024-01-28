const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    subject: String,
    frequency: { type: String, required: true },
    repeat: [String],
    time: String,
  },
  {
    timestamps: true,
  },
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
