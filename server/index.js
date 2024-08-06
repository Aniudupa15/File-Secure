const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { MongoClient, GridFSBucket } = require('mongodb');

// Create Express application
const app = express();
app.use(express.json());
app.use(cors());


const mongoURI = process.env.MONGO_URL;
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


const FileSecureModel = require('./models/File-Secure');

app.post('/Login', (req, res) => {
  const { Name, Password } = req.body;
  FileSecureModel.findOne({ Name: Name })
    .then(users => {
      if (users) {
        if (users.Password === Password) res.json("success");
        else res.json("the password is incorrect");
      } else {
        res.json("no Record");
      }
    });
});

app.post('/register', (req, res) => {
  FileSecureModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

// Start server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
