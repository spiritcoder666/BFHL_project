const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// GET endpoint
app.get('/bfhl', (req, res) => {
  const response = { operation_code: 1 };
  res.status(200).send(JSON.stringify(response)); // Ensure response is a string
});

// POST endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      const errorResponse = { is_success: false, message: "Invalid input: 'data' must be an array" };
      return res.status(400).send(JSON.stringify(errorResponse));
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));

    let highestAlphabet = [];
    if (alphabets.length > 0) {
      const highest = alphabets.reduce((prev, current) =>
        current.toUpperCase() > prev.toUpperCase() ? current : prev
      );
      highestAlphabet.push(highest);
    }

    const response = {
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    };

    res.status(200).send(JSON.stringify(response)); // Ensure response is a string
  } catch (error) {
    const errorResponse = { is_success: false, message: "Server error" };
    res.status(500).send(JSON.stringify(errorResponse));
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
