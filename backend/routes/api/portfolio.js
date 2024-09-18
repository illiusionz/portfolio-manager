// backend/routes/api/portfolio.js

const express = require('express');
const router = express.Router();
const Portfolio = require('../../models/Portfolio');
const mongoose = require('mongoose');

// GET portfolio for a test user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId; // Keep it as a string
    const portfolio = await Portfolio.findOne({ userId: userId });
    if (!portfolio)
      return res.status(404).json({ message: 'Portfolio not found' });

    res.json(portfolio);
  } catch (err) {
    console.error('Error fetching portfolio:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add test portfolio data for user
router.post('/:userId', async (req, res) => {
  const { stocks } = req.body;
  try {
    let portfolio = await Portfolio.findOne({ userId: req.params.userId });

    if (portfolio) {
      portfolio.stocks = stocks;
    } else {
      portfolio = new Portfolio({
        userId: req.params.userId, // Keep it as a string
        stocks,
        totalValue: calculateTotalValue(stocks),
      });
    }
    await portfolio.save();
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

const calculateTotalValue = (stocks) => {
  return stocks.reduce(
    (acc, stock) => acc + stock.shares * stock.currentPrice,
    0
  );
};

module.exports = router;
