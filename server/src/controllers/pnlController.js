const prisma = require('../lib/prisma');

// Helper to get today's date normalized to midnight UTC
const getTodayDate = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today;
};

exports.addPnl = async (req, res) => {
  try {
    const { pnl } = req.body;
    
    if (pnl === undefined || pnl === null || isNaN(pnl)) {
      return res.status(400).json({ error: 'Please enter a valid P&L.' });
    }

    const today = getTodayDate();

    // Check if record exists for today
    const existing = await prisma.dailyPnl.findUnique({
      where: { date: today }
    });

    if (existing) {
      return res.status(400).json({ error: "Today's P&L is already recorded." });
    }

    const newRecord = await prisma.dailyPnl.create({
      data: {
        date: today,
        pnl: pnl
      }
    });

    res.status(201).json(newRecord);
  } catch (error) {
    console.error('Error adding P&L:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};

exports.getAllPnl = async (req, res) => {
  try {
    const records = await prisma.dailyPnl.findMany({
      orderBy: { date: 'desc' }
    });
    res.json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const result = await prisma.dailyPnl.aggregate({
      _sum: { pnl: true },
      _count: { id: true }
    });

    const totalPnl = result._sum.pnl ? parseFloat(result._sum.pnl) : 0;
    const totalDays = result._count.id;
    const averagePerDay = totalDays > 0 ? (totalPnl / totalDays).toFixed(2) : 0;

    res.json({
      totalPnl,
      totalDays,
      averagePerDay: parseFloat(averagePerDay)
    });
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};

exports.updatePnl = async (req, res) => {
  try {
    const { id } = req.params;
    const { pnl } = req.body;

    if (pnl === undefined || pnl === null || isNaN(pnl)) {
      return res.status(400).json({ error: 'Please enter a valid P&L.' });
    }

    const updated = await prisma.dailyPnl.update({
      where: { id: parseInt(id) },
      data: { pnl }
    });

    res.json(updated);
  } catch (error) {
    console.error('Error updating P&L:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};

exports.deletePnl = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.dailyPnl.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting P&L:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};
