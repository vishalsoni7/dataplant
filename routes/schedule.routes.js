const express = require("express");
const scheduleRouter = express.Router();
const Schedule = require("../modal/schedule.modal");

// Get All
scheduleRouter.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.find();
    if (!schedules) {
      return res.status(404).json({ error: "No schedules found" });
    }
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
});

// Post
scheduleRouter.post("/", async (req, res) => {
  try {
    const { title, description, subject, frequency, repeat, time } = req.body;
    // if (!title || !description || !subject || !frequency || !repeat || !time) {
    //   return res.status(400).json({ error: "All fields are required" });
    // }
    const schedule = new Schedule({
      title,
      description,
      subject,
      frequency,
      repeat,
      time,
    });
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    console.error("Error adding schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get By Title
scheduleRouter.get("/search", async (req, res) => {
  const { title } = req.query;

  try {
    const schedules = await Schedule.findOne({ title });
    if (!schedules || schedules.length === 0) {
      return res
        .status(404)
        .json({ error: "No schedules found with the given title" });
    }

    res.json(schedules);
  } catch (error) {
    console.error("Error finding schedules by title:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get By Id
scheduleRouter.get("/:id", async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    console.error("Error finding schedule by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update By Id
// scheduleRouter.patch("/:id", async (req, res) => {
//   const { title, description, subject, frequency, repeat, time } = req.body;
//   try {
//     const updatedSchedule = await Schedule.findByIdAndUpdate(
//       req.params.id,
//       {
//         title,
//         description,
//         subject,
//         frequency,
//         repeat,
//         time,
//       },
//       { new: true },
//     );
//     if (!updatedSchedule) {
//       return res.status(404).json({ error: "Schedule not found" });
//     }
//     res.status(200).json(updatedSchedule);
//   } catch (error) {
//     console.error("Error updating schedule:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

scheduleRouter.patch("/:id", async (req, res) => {
  const { title, description, subject, frequency, repeat, time } = req.body;
  console.log(title, description, subject, frequency, repeat, time);
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          description,
          subject,
          frequency,
          repeat,
          time,
        },
      },
      { new: true },
    );

    if (!updatedSchedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    res.status(200).json(updatedSchedule);
  } catch (error) {
    console.error("Error updating schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete By Id
scheduleRouter.delete("/:id", async (req, res) => {
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);

    if (!deletedSchedule) {
      return res.status(404).json({ error: "Schedule not found!" });
    }
    res.status(200).json(deletedSchedule);
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = scheduleRouter;
