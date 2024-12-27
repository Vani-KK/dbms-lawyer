// createTables.js
const pool = require("./db");

const createTables = async () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS lawyer (
            lid VARCHAR(20),
            lname VARCHAR(100),
            ltype VARCHAR(100),
            lphone BIGINT,
            laddress VARCHAR(100),
            PRIMARY KEY(lid)
        );`,

    `CREATE TABLE IF NOT EXISTS client (
            cid VARCHAR(20),
            lid VARCHAR(20),
            cname VARCHAR(100),
            cphone BIGINT,
            caddress VARCHAR(100),
            PRIMARY KEY (cid),
            FOREIGN KEY (lid) REFERENCES lawyer (lid) ON DELETE CASCADE
        );`,

    `CREATE TABLE IF NOT EXISTS court (
            court_id VARCHAR(20),
            court_location VARCHAR(100),
            judge_name VARCHAR(100),
            PRIMARY KEY (court_id)
        );`,

    `CREATE TABLE IF NOT EXISTS cases (
            case_id VARCHAR(20),
            case_name VARCHAR(100),
            case_type VARCHAR(100),
            case_status VARCHAR(100),
            case_strdate DATE,
            case_enddate DATE,
            cid VARCHAR(20),
            lid VARCHAR(20),
            court_id VARCHAR(20),
            PRIMARY KEY (case_id),
            FOREIGN KEY (cid) REFERENCES client (cid) ON DELETE CASCADE,
            FOREIGN KEY (lid) REFERENCES lawyer (lid) ON DELETE CASCADE,
            FOREIGN KEY (court_id) REFERENCES court (court_id) ON DELETE CASCADE
        );`,

    `CREATE TABLE IF NOT EXISTS document (
            d_id VARCHAR(20),
            pwitness VARCHAR(100),
            opposition VARCHAR(100),
            defence VARCHAR(100),
            legal_doc VARCHAR(100),
            refernce_doc VARCHAR(100),
            case_id VARCHAR(20),
            lid VARCHAR(20),
            PRIMARY KEY(d_id),
            FOREIGN KEY (case_id) REFERENCES cases (case_id) ON DELETE CASCADE,
            FOREIGN KEY (lid) REFERENCES lawyer (lid) ON DELETE CASCADE
        );`,
  ];

  const insertCourts = `
        INSERT IGNORE INTO court (court_id, court_location, judge_name) VALUES
        ('COU123', 'Mangalore', 'jn1'),
        ('COU456', 'Bangalore', 'jn2'),
        ('COU789', 'Delhi', 'jn3');
    `;

  try {
    for (const query of queries) {
      await pool.query(query);
    }
    console.log("All tables have been created successfully");

    await pool.query(insertCourts);
    console.log("Court table populated with initial data");
  } catch (err) {
    console.error("Error creating tables:", err.message);
  }
};

module.exports = createTables;
