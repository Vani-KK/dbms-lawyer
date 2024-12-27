// createTables.js
const pool = require("./db");

const createTables = async () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS lawyer (
            lid VARCHAR(10),
            lname VARCHAR(15),
            ltype VARCHAR(15),
            lphone BIGINT,
            laddress VARCHAR(20),
            PRIMARY KEY(lid)
        );`,

    `CREATE TABLE IF NOT EXISTS client (
            cid VARCHAR(10),
            lid VARCHAR(10),
            cname VARCHAR(15),
            cphone BIGINT,
            caddress VARCHAR(20),
            PRIMARY KEY (cid),
            FOREIGN KEY (lid) REFERENCES lawyer (lid) ON DELETE CASCADE
        );`,

    `CREATE TABLE IF NOT EXISTS court (
            court_id VARCHAR(10),
            court_location VARCHAR(15),
            judge_name VARCHAR(15),
            PRIMARY KEY (court_id)
        );`,

    `CREATE TABLE IF NOT EXISTS cases (
            case_id VARCHAR(10),
            case_name VARCHAR(20),
            case_type VARCHAR(20),
            case_status VARCHAR(20),
            case_strdate DATE,
            case_enddate DATE,
            cid VARCHAR(10),
            lid VARCHAR(10),
            court_id VARCHAR(10),
            PRIMARY KEY (case_id),
            FOREIGN KEY (cid) REFERENCES client (cid) ON DELETE CASCADE,
            FOREIGN KEY (lid) REFERENCES lawyer (lid) ON DELETE CASCADE,
            FOREIGN KEY (court_id) REFERENCES court (court_id) ON DELETE CASCADE
        );`,

    `CREATE TABLE IF NOT EXISTS document (
            d_id VARCHAR(10),
            pwitness VARCHAR(20),
            opposition VARCHAR(20),
            defence VARCHAR(20),
            legal_doc VARCHAR(20),
            refernce_doc VARCHAR(20),
            case_id VARCHAR(10),
            lid VARCHAR(10),
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
