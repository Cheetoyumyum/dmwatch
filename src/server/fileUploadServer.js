const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'Bucket-Name',
    key: (req, file, cb) => {
      const filename = Date.now() + '-' + file.originalname;
      cb(null, filename);
    },
  }),
});

app.use(bodyParser.json());

app.post('/upload', upload.single('video'), (req, res) => {
  if (req.file) {
    res.status(200).json({ message: 'File uploaded successfully', fileUrl: req.file.location });
  } else {
    res.status(400).json({ message: 'File upload failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
