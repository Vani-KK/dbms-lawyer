// routes/clients.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Client sign in
router.post("/signin", async (req, res) => {
  const { clientId, clientName } = req.body;

  // Input validation
  if (!clientId || !clientName) {
    return res.status(400).json({ error: "Client ID and name are required" });
  }

  try {
    const [client] = await pool.query(
      "SELECT * FROM client WHERE cid = ? AND cname = ?",
      [clientId, clientName]
    );

    if (client.length === 0) {
      return res.status(401).json({ error: "Invalid client ID or name" });
    }

    res.status(200).json({ message: "Sign-in successful", client: client[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all lawyers
router.get("/lawyers", async (req, res) => {
  try {
    const [lawyers] = await pool.query("SELECT * FROM lawyer");
    if (lawyers.length === 0) {
      return res.status(404).json({ error: "No lawyers found" });
    }
    res.status(200).json({ lawyers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch involved cases of the client
router.get("/cases/:clientId", async (req, res) => {
  const { clientId } = req.params;

  try {
    const [cases] = await pool.query(
      `SELECT cases.*, lawyer.lname AS lawyer_name, court.court_location, court.judge_name 
             FROM cases 
             LEFT JOIN lawyer ON cases.lid = lawyer.lid 
             LEFT JOIN court ON cases.court_id = court.court_id 
             WHERE cases.cid = ?`,
      [clientId]
    );

    if (cases.length === 0) {
      return res.status(404).json({ error: "No cases found for the client" });
    }

    res.status(200).json({ cases });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
