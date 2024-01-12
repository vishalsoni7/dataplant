const mongoose = require("mongoose");

// const scheduleSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     subject: String,
//     frequency: String,
//     repeat: String,
//     time: String,
//   },
//   {
//     timestamps: true,
//   },
// );

const scheduleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    subject: String,
    frequency: String,
    repeat: String,
    time: String,
  },
  {
    timestamps: true,
  },
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
