const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://aniudupa15:n39dBcBk744JjjOu@anirudha.sl6tcuz.mongodb.net/FileSecure', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the user schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/register', (req, res) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.json("Already registered");
      }

      const newUser = new User({ email, password, name });
      newUser.save()
        .then(() => res.json("Registered successfully"))
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.json("No records found!");
      }

      if (user.password === password) {
        return res.json("Success");
      } else {
        return res.json("Wrong password");
      }
    })
    .catch(err => res.status(500).json(err));
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
