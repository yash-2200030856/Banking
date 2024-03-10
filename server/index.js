
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { hash, compare } = require('bcrypt');
const { json } = require('express'); 

const app = express();
app.use(json());
app.use(cors());

const client = new MongoClient('mongodb+srv://admin:admin@cluster0.vhy112j.mongodb.net/YLBDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect()
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

const db = client.db('YLBDB');
const usersCollection = db.collection('customerdb');

// Initialize bank account fields for existing users
usersCollection.updateMany({}, { $set: { bankAccount: { accountNumber: '', balance: 0 } } });

// Signup Route
app.post('/signup', async (req, res) => {
  const { username, email, password, phoneNumber, dateOfBirth, } = req.body;
  // Hash the password
  const hashedPassword = await hash(password, 10);
  // Insert the user into the database
  try {
    await usersCollection.insertOne({ username, email, password: hashedPassword, phoneNumber, dateOfBirth, bankAccount: { accountNumber: '', balance: 0 } });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Find the user in the database
  const user = await usersCollection.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // Compare passwords
  const passwordMatch = await compare(password, user.password);
  if (passwordMatch) {
    // Passwords match, authentication successful
    return res.status(200).json({ message: 'Login successful', username: user.username });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// AccountInfo Route
app.get('/accountInfo', async (req, res) => {
  const { username } = req.query;
  try {
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Modify the response to send only necessary user information
    const userInfo = {
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      accountNumber: user.bankAccount.accountNumber,
      balance: user.bankAccount.balance,
    };
    res.status(200).json({ userInfo });
  } catch (error) {
    console.error('Error fetching account info:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Link Bank Account Route
app.post('/linkBankAccount', async (req, res) => {
  const { accountNumber, username } = req.body; // Assuming username is passed in the request body
  try {
    await usersCollection.updateOne({ username }, { $set: { 'bankAccount.accountNumber': accountNumber } });
    res.status(200).json({ message: 'Bank account linked successfully' });
  } catch (error) {
    console.error('Error linking bank account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
import nodemailer from 'nodemailer';

const app = express();
app.use(json());
app.use(cors());

// MongoDB connection
const client = new MongoClient('mongodb+srv://admin:admin@cluster0.vhy112j.mongodb.net/YLBDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect()
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

const db = client.db('YLBDB');
const usersCollection = db.collection('customerdb');

// Initialize bank account fields for existing users
usersCollection.updateMany({}, { $set: { bankAccount: { accountNumber: '', balance: 0 } } });

// Signup Route
app.post('/signup', async (req, res) => {
  const { username, email, password, phoneNumber, dateOfBirth } = req.body;
  // Hash the password
  const hashedPassword = await hash(password, 10);
  // Generate a verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code
  // Insert the user into the database with the verification code
  try {
    await usersCollection.insertOne({ username, email, password: hashedPassword, phoneNumber, dateOfBirth, emailVerificationCode: verificationCode, bankAccount: { accountNumber: '', balance: 0 } });
    // Send verification email
    sendVerificationEmail(email, verificationCode);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Send verification email function
const sendVerificationEmail = (email, verificationCode) => {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yashulagisetty@gmail.com', // Your Gmail email address
      pass: 'Latheesh@2827' // Your Gmail password
    }
  });

  // Email content
  const mailOptions = {
    from: 'yashulagisetty@gmail.com', // Sender email address
    to: email, // Receiver email address
    subject: 'Verification Code for Your Legacy Bank', // Subject line
    text: `Your verification code is: ${verificationCode}` // Email body
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending verification email:', error);
    } else {
      console.log('Verification email sent:', info.response);
    }
  });
};

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Find the user in the database
  const user = await usersCollection.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // Compare passwords
  const passwordMatch = await compare(password, user.password);
  if (passwordMatch) {
    // Passwords match, authentication successful
    return res.status(200).json({ message: 'Login successful', username: user.username });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Verify Code Route
app.post('/verifyCode', async (req, res) => {
  const { username, verificationCode } = req.body;
  try {
    // Find the user in the database
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Retrieve the verification code sent via email
    const { emailVerificationCode } = user;
    // Compare the verification code entered by the user with the one sent via email
    if (verificationCode === emailVerificationCode) {
      return res.status(200).json({ message: 'Verification successful' });
    } else {
      return res.status(401).json({ message: 'Invalid verification code' });
    }
  } catch (error) {
    console.error('Error verifying code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/