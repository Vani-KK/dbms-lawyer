// routes/lawyer.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

const formatDateForMySQL = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
};

// Create a new lawyer
router.post("/register", async (req, res) => {
  const { lid, lname, ltype, lphone, laddress } = req.body;
  console.log(req.body);
  try {
    // Check if lawyer ID already exists
    const [existingLawyer] = await pool.query(
      "SELECT * FROM lawyer WHERE lid = ?",
      [lid]
    );
    if (existingLawyer.length > 0) {
      return res.status(400).json({ error: "Lawyer ID already exists" });
    }

    const query =
      "INSERT INTO lawyer (lid, lname, ltype, lphone, laddress) VALUES (?, ?, ?, ?, ?)";
    const values = [lid, lname, ltype, lphone, laddress];
    await pool.query(query, values);
    res.status(201).json({ message: "Lawyer created successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Sign in a lawyer
router.post("/signin", async (req, res) => {
  const { lname, lid } = req.body;

  // Input validation
  if (typeof lname !== "string" || typeof lid !== "string") {
    return res.status(400).json({ error: "Invalid input format" });
  }

  try {
    const [lawyer] = await pool.query(
      "SELECT * FROM lawyer WHERE lname = ? AND lid = ?",
      [lname, lid]
    );
    if (lawyer.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.status(200).json({ message: "Sign-in successful", lawyer: lawyer[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new client
router.post("/add-client", async (req, res) => {
  const { cid, lid, cname, cphone, caddress } = req.body;
  console.log(req.body)
  try {
    // Check if client ID already exists
    const [existingClient] = await pool.query(
      "SELECT * FROM client WHERE cid = ?",
      [cid]
    );
    if (existingClient.length > 0) {
      return res.status(400).json({ error: "Client ID already exists" });
    }

    const query =
      "INSERT INTO client (cid, lid, cname, cphone, caddress) VALUES (?, ?, ?, ?, ?)";
    const values = [cid, lid, cname, cphone, caddress];
    await pool.query(query, values);
    res.status(201).json({ message: "Client added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch clients of a logged-in lawyer
router.get("/fetch-clients/:lid", async (req, res) => {
  const { lid } = req.params;
  try {
    // Fetch clients associated with the lawyer ID
    const [clients] = await pool.query("SELECT * FROM client WHERE lid = ?", [
      lid,
    ]);
    if (clients.length === 0) {
      return res
        .status(404)
        .json({ error: "No clients found for this lawyer" });
    }
    res.status(200).json({ clients });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve court details
router.get("/court-details", async (req, res) => {
  try {
    const [courts] = await pool.query("SELECT * FROM court");
    if (courts.length === 0) {
      return res.status(404).json({ error: "No court details found" });
    }
    res.status(200).json({ courts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new case
router.post("/add-case", async (req, res) => {
  const {
    caseId,
    caseName,
    caseType,
    caseStatus,
    caseStrDate,
    caseEndDate,
    cid,
    lid,
    courtId,
  } = req.body;
  try {
    let parsedCaseStrDate = formatDateForMySQL(caseStrDate)
    let parsedCaseEndDate = caseEndDate
      ? formatDateForMySQL(caseEndDate)
      : null;
    // Validate input: Check if associated client, lawyer, and court exist
    const [client] = await pool.query("SELECT * FROM client WHERE cid = ?", [
      cid,
    ]);
    if (client.length === 0) {
      return res.status(400).json({ error: "Client does not exist" });
    }

    // Insert the case
    const query = `INSERT INTO cases (case_id, case_name, case_type, case_status, case_strdate, case_enddate, cid, lid, court_id)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      caseId,
      caseName,
      caseType,
      caseStatus,
      parsedCaseStrDate,
      parsedCaseEndDate,
      cid,
      lid,
      courtId,
    ];
    await pool.query(query, values);

    res.status(201).json({ message: "Case added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/client-cases/:lid/:cid", async (req, res) => {
  const { cid, lid } = req.params;
  try {
    const [cases] = await pool.query(
      `SELECT cases.*, court.court_location, court.judge_name 
           FROM cases 
           LEFT JOIN court ON cases.court_id = court.court_id 
           WHERE cases.cid = ? AND cases.lid = ?`,
      [cid, lid]
    );
    if (cases.length === 0) {
      return res.status(404).json({
        error: "No cases found for the client and lawyer combination",
      });
    }
    res.status(200).json({ cases });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/cases/:lid", async (req, res) => {
  const { lid } = req.params;
  try {
    const [cases] = await pool.query(
      `SELECT cases.*, court.court_location, court.judge_name 
      FROM cases 
      LEFT JOIN court ON cases.court_id = court.court_id 
      WHERE cases.lid = ?`,
      [lid]
    );
    if (cases.length === 0) {
      return res.status(404).json({ error: "No cases found for this lawyer" });
    }
    res.status(200).json({ cases });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/client/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const [client] = await pool.query("SELECT * FROM client WHERE cid = ?", [
      cid,
    ]);
    if (client.length === 0) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json({ client: client[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update case details
router.post("/update-case/:caseId", async (req, res) => {
  const { caseId } = req.params;
  const { caseStatus, caseEndDate } = req.body;

  let parsedCaseEndDate = caseEndDate
    ? formatDateForMySQL(caseEndDate)
    : null;
  try {
    // Check if the case exists
    const [existingCase] = await pool.query(
      "SELECT * FROM cases WHERE case_id = ?",
      [caseId]
    );
    if (existingCase.length === 0) {
      return res.status(404).json({ error: "Case not found" });
    }

    // Update the case details
    const query = `UPDATE cases 
                     SET case_status = ?, case_enddate = ? WHERE case_id = ?`;
    const values = [caseStatus, parsedCaseEndDate, caseId];
    await pool.query(query, values);

    res.status(200).json({ message: "Case details updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new document
router.post("/add-document", async (req, res) => {
  const {
    documentId,
    pwitness,
    opposition,
    defence,
    legalDoc,
    referenceDoc,
    caseId,
    lid,
  } = req.body;
  try {
    // Validate input: Check if associated case and lawyer exist
    const [caseExists] = await pool.query(
      "SELECT * FROM cases WHERE case_id = ?",
      [caseId]
    );
    if (caseExists.length === 0) {
      return res.status(400).json({ error: "Case does not exist" });
    }

    const [lawyerExists] = await pool.query(
      "SELECT * FROM lawyer WHERE lid = ?",
      [lid]
    );
    if (lawyerExists.length === 0) {
      return res.status(400).json({ error: "Lawyer does not exist" });
    }

    // Insert the document
    const query = `INSERT INTO document (d_id, pwitness, opposition, defence, legal_doc, refernce_doc, case_id, lid)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      documentId,
      pwitness,
      opposition,
      defence,
      legalDoc,
      referenceDoc,
      caseId,
      lid,
    ];
    await pool.query(query, values);

    res.status(201).json({ message: "Document added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch documents by caseId
router.get("/fetch-documents/:caseId", async (req, res) => {
  const { caseId } = req.params;
  try {
    const [documents] = await pool.query(
      "SELECT * FROM document WHERE case_id = ?",
      [caseId]
    );
    if (documents.length === 0) {
      return res
        .status(404)
        .json({ error: "No documents found for the specified case" });
    }
    res.status(200).json({ documents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
