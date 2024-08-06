require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { MongoClient, GridFSBucket } = require('mongodb');
const FileSecureModel = require('./models/File-Secure');

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = "mongodb+srv://aniudupa15:n39dBcBk744JjjOu@anirudha.sl6tcuz.mongodb.net/";
if (!mongoURI) {
  console.error('MONGO_URL not defined in environment variables');
  process.exit(1);
}

const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
let bucket;

client.connect(err => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
  const db = client.db('filesecure');
  bucket = new GridFSBucket(db, { bucketName: 'uploads' });
  console.log('MongoDB connected and GridFS bucket created');
});

// Use memory storage to handle file buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  if (!bucket) {
    return res.status(500).send('GridFS bucket not initialized.');
  }

  const uploadStream = bucket.openUploadStream(req.file.originalname, {
    contentType: req.file.mimetype
  });
  uploadStream.end(req.file.buffer);

  uploadStream.on('finish', () => {
    res.send('File uploaded successfully.');
  });

  uploadStream.on('error', (err) => {
    console.error('Error uploading file:', err.message);
    res.status(500).send('Internal Server Error');
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
    res.status(500).send('Internal Server Error');
  }
});

app.get('/file/:filename', (req, res) => {
  if (!bucket) {
    return res.status(500).send('GridFS bucket not initialized.');
  }

  bucket.openDownloadStreamByName(req.params.filename)
    .pipe(res)
    .on('error', (err) => {
      console.error('Error downloading file:', err.message);
      res.status(500).send('Internal Server Error');
    });
});

// User authentication routes
const FileSecureModel = require('./models/File-Secure');

app.post('/Login', (req, res) => {
  const { Name, Password } = req.body;
  FileSecureModel.findOne({ Name })
    .then(user => {
      if (user) {
        if (user.Password === Password) {
          res.json("success");
        } else {
          res.json("the password is incorrect");
        }
      } else {
        res.json("no Record");
      }
    })
    .catch(err => {
      console.error('Error during login:', err.message);
      res.status(500).send('Internal Server Error');
    });
});

app.post('/button', (req, res) => {
  const { Name, Password } = req.body;
  FileSecureModel.findOne({ Name })
    .then(user => {
      if (user) {
        if (user.Password === Password) {
          res.json("success");
        } else {
          res.json("the password is incorrect");
        }
      } else {
        res.json("no Record");
      }
    })
    .catch(err => {
      console.error('Error during button authentication:', err.message);
      res.status(500).send('Internal Server Error');
    });
});

app.post('/register', (req, res) => {
  FileSecureModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => {
      console.error('Error during registration:', err.message);
      res.status(500).send('Internal Server Error');
    });
});

// Start server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
