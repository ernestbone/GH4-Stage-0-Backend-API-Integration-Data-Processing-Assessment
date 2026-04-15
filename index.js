const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors({ origin: '*' }));

app.get('/api/classify', async (req, res) => {
  try {
    const { name } = req.query;

    // ✅ Validation
    if (name === undefined || name === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Name query parameter is required',
      });
    }

    if (typeof name !== 'string') {
      return res.status(422).json({
        status: 'error',
        message: 'Name must be a string',
      });
    }

    // ✅ Call Genderize API
    const response = await axios.get(
      `https://api.genderize.io?name=${encodeURIComponent(name)}`,
    );

    const { gender, probability, count } = response.data;

    // ✅ Edge case handling
    if (gender === null || count === 0) {
      return res.status(200).json({
        status: 'error',
        message: 'No prediction available for the provided name',
      });
    }

    // ✅ Process data
    const sample_size = count;

    const is_confident = probability >= 0.7 && sample_size >= 100;

    const processed_at = new Date().toISOString();

    return res.json({
      status: 'success',
      data: {
        name,
        gender,
        probability,
        sample_size,
        is_confident,
        processed_at,
      },
    });
  } catch (error) {
    return res.status(502).json({
      status: 'error',
      message: 'Failed to fetch data from external API',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
