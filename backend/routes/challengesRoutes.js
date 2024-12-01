const express = require("express");
const Challenge = require("../models/Challenge");
const Submission = require("../models/Submission");
const authenticate = require("../middleware/auth");

const router = express.Router();

// Hardcoded challenges (replace with your actual challenge data)
const hardcodedChallenges = [
  {
    title: "Challenge 1: Beginner Coding",
    description: "Solve basic coding problems to get started.",
    level: "Beginner",
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)), // 1 week later
  },
  {
    title: "Challenge 2: Intermediate Algorithms",
    description: "Solve algorithmic problems to improve your skills.",
    level: "Intermediate",
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 14)), // 2 weeks later
  },
  {
    title: "Challenge 3: Data Structures Mastery",
    description: "Dive deep into data structures and their applications.",
    level: "Advanced",
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 21)), // 3 weeks later
  }
];

// Seed the database with hardcoded challenges if no challenges exist
const seedChallenges = async () => {
  const challenges = await Challenge.find();
  if (challenges.length === 0) {
    await Challenge.insertMany(hardcodedChallenges);
    console.log("Hardcoded challenges added to the database!");
  }
};

// Automatically seed challenges when the server starts
seedChallenges();

// Get all challenges
router.get("/", async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch challenges" });
  }
});

// Register for a challenge
router.post("/register", authenticate, async (req, res) => {
  const { challengeId } = req.body;
  const userId = req.user.userId;  // From the decoded JWT
  if (!challengeId) {
    return res.status(400).json({ message: "Challenge ID is required" });
  }
  res.json({ message: `User ${userId} registered for challenge ${challengeId}` });
});

// Submit a challenge
router.post("/submit", authenticate, async (req, res) => {
  const { challengeId, submission } = req.body;
  const userId = req.user.userId;  // From the decoded JWT
  if (!challengeId || !submission) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const newSubmission = await Submission.create({ challengeId, userId, submission });
    res.json({ message: "Submission received", submission: newSubmission });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit content" });
  }
});

module.exports = router;
