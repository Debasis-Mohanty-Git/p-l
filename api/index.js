require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pnlRoutes = require('./src/routes/pnlRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/pnl', pnlRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Daily P&L API is running successfully.'));

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
