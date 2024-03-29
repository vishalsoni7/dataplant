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

  const searchInput = title.trim().toLowerCase();

  try {
    const schedules = await Schedule.findOne({ title: searchInput });
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

// Search By Title
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
