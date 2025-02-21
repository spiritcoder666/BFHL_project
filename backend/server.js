const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// GET endpoint: returns a fixed operation code
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST endpoint: processes JSON input per requirements
app.post('/bfhl', (req, res) => {
  try {
    const dataArray = req.body.data;
    if (!dataArray || !Array.isArray(dataArray)) {
      return res.status(400).json({ is_success: false, message: "Invalid input: 'data' must be an array" });
    }

    // Separate numbers (convertible to a number) and alphabets (single letters)
    const numbers = dataArray.filter(item => !isNaN(item));
    const alphabets = dataArray.filter(item => /^[a-zA-Z]$/.test(item));

    let highestAlphabet = [];
    if (alphabets.length > 0) {
      // Find the letter that comes last in the alphabet (case-insensitive)
      const highest = alphabets.reduce((prev, curr) => {
        return curr.toUpperCase() > prev.toUpperCase() ? curr : prev;
      });
      highestAlphabet.push(highest);
    }

    const responsePayload = {
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highestAlphabet
    };

    res.status(200).json(responsePayload);
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
