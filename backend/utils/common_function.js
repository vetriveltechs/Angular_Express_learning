
const pool = require('../config/database');  // Assuming pool is configured and connected to your database

// Function to get the current date in "YYYY-MM-DD" format
const getCurrentDate = () => {
    return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD" format
};

// Function to get the current date and time in "YYYY-MM-DD HH:MM:SS" format
const getCurrentDateTime = () => {
    return new Date().toISOString().slice(0, 19).replace('T', ' '); // "YYYY-MM-DD HH:MM:SS" format
};

// Function to set the default active flag
const setDefaultActiveFlag = () => {
    return 'Y';
};

// Function to get the next document number, prefix, and suffix
const getNextDocumentNumber = async (listName) => {
  try {
    // Query to fetch the next number, prefix, and suffix
    const nextNumberQuery = `
      SELECT
        document_numbering.next_number,
        document_numbering.prefix,
        document_numbering.suffix
      FROM doc_document_numbering AS document_numbering
      WHERE document_numbering.document_numbering_type = ?
      AND document_numbering.active_flag = ?
    `;

    // Execute the query
    const [nextNumberResult] = await pool.query(nextNumberQuery, [listName, 'Y']);

    if (nextNumberResult.length === 0) {
      throw new Error(`Next number not found for ${listName}.`);
    }

    const { next_number: nextNumber, prefix, suffix } = nextNumberResult[0];
    return { nextNumber, prefix, suffix };

  } catch (err) {
    console.error(`Error in getNextDocumentNumber for ${listName}:`, err);
    throw err;
  }
};

// Function to increment the next document number
const incrementNextDocumentNumber = async (listName, nextNumber) => {
  try {
    // Query to increment the next number
    const incrementNextNumberQuery = `
      UPDATE doc_document_numbering AS document_numbering
      SET next_number = ?
      WHERE document_numbering_type = ?
      AND active_flag = ?
    `;

    // Execute the query to increment the next number
    const nextNumberValue = Number(nextNumber);
    await pool.query(incrementNextNumberQuery, [nextNumberValue + 1, listName, 'Y']);
  } catch (err) {
    console.error(`Error in incrementNextDocumentNumber for ${listName}:`, err);
    throw err;
  }
};

// Exporting the functions
module.exports = {
    getCurrentDate,
    getCurrentDateTime,
    setDefaultActiveFlag,
    getNextDocumentNumber,
    incrementNextDocumentNumber
};

// middleware.js
exports.isAuthenticated = async(req, res, next) => {
    if (req.session.authenticated) {

        next();
    } else {

        res.redirect('/');
    }
};
