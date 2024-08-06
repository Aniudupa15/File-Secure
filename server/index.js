const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { MongoClient, GridFSBucket } = require('mongodb'); // Added for password hashing
const FormDataModel = require('./models/FormData'); // Ensure this model is correctly defined

// Create Express application
const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = "mongodb+srv://files:pratham@prathampshetty99sai.j4iophu.mongodb.net/filesecure";
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let bucket;

async function connectToDB() {
  try {
    await client.connect();
    const db = client.db('filesecure');
    bucket = new GridFSBucket(db, { bucketName: 'uploads' });
    console.log('MongoDB connected and GridFS bucket created');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

connectToDB();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  if (!bucket) {
    return res.status(500).json({ message: 'GridFS bucket not initialized.' });
  }

  const uploadStream = bucket.openUploadStream(req.file.originalname, {
    contentType: req.file.mimetype
  });
  uploadStream.end(req.file.buffer);

  uploadStream.on('finish', () => {
    res.json({ message: 'File uploaded successfully.' });
  });

  uploadStream.on('error', (err) => {
    console.error('Error uploading file:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  });
});

app.get('/files', async (req, res) => {
  try {
    if (!bucket) {
      throw new Error('GridFS bucket not initialized');
    }
    const files = await bucket.find({}).toArray();
    res.json(files);
  } catch (err) {
    console.error('Error fetching files:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/file/:filename', (req, res) => {
  if (!bucket) {
    return res.status(500).json({ message: 'GridFS bucket not initialized.' });
  }

  bucket.openDownloadStreamByName(req.params.filename)
    .pipe(res)
    .on('error', (err) => {
      console.error('Error downloading file:', err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

mongoose.connect('mongodb+srv://files:pratham@prathampshetty99sai.j4iophu.mongodb.net/filesecure', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  FormDataModel.findOne({ email })
    .then(user => {
      if (user) {
        return res.json({ message: 'Already registered' });
      }

      return FormDataModel.create(req.body);
    })
    .then(log_reg_form => res.json(log_reg_form))
    .catch(err => res.status(500).json({ message: err.message }));
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Basic validation for presence of email and password
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  FormDataModel.findOne({ email })
    .then(user => {
      if (user) {
        // Compare plaintext passwords
        if (user.password === password) {
          return res.json({ message: 'Success' });
        } else {
          return res.status(401).json({ message: 'Wrong password' });
        }
      } else {
        return res.status(404).json({ message: 'No records found!' });
      }
    })
    .catch(err => res.status(500).json({ message: err.message }));
});



// Start server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
