require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pnlRoutes = require('./routes/pnlRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/pnl', pnlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
