// routes/lawyer.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Create a new lawyer
router.get("/", async (req, res) => {
  res.status(201).json({ message: "hello " });
});

// Delete an account (client or lawyer)
router.delete("/delete-account/:id", async (req, res) => {
  const { id } = req.params;
  const { userType } = req.body; // 'client' or 'lawyer'

  // Validate the input
  if (!userType || (userType !== "client" && userType !== "lawyer")) {
    return res.status(400).json({ error: "Invalid user type provided" });
  }

  try {
    let query = "";
    if (userType === "client") {
      query = "DELETE FROM client WHERE cid = ?";
    } else if (userType === "lawyer") {
      query = "DELETE FROM lawyer WHERE lid = ?";
    }

    const [result] = await pool.query(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: `${userType} account deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
