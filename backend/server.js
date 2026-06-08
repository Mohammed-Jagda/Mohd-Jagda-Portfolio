const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Directories
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DATA_DIR = path.join(__dirname, 'data');
const GALLERY_JSON = path.join(DATA_DIR, 'gallery.json');

// Ensure directories exist
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Copy default seed images from frontend if they exist
const frontendGalleryDir = path.join(__dirname, '..', 'frontend', 'public', 'images', 'gallery');
['hackathon_victory.png', 'tech_presentation.png'].forEach(file => {
  const src = path.join(frontendGalleryDir, file);
  const dest = path.join(UPLOADS_DIR, file);
  if (fs.existsSync(src) && !fs.existsSync(dest)) {
    try {
      fs.copyFileSync(src, dest);
    } catch (err) {
      console.error('Error copying seed file:', err);
    }
  }
});

// Copy default resume from frontend if it exists
const srcResume = path.join(__dirname, '..', 'frontend', 'public', 'MohdJagdaResume.pdf');
const destResume = path.join(UPLOADS_DIR, 'MohdJagdaResume.pdf');
if (fs.existsSync(srcResume) && !fs.existsSync(destResume)) {
  try {
    fs.copyFileSync(srcResume, destResume);
  } catch (err) {
    console.error('Error copying default resume:', err);
  }
}

// Initialize gallery.json if it doesn't exist
if (!fs.existsSync(GALLERY_JSON)) {
  const defaultGallery = [
    {
      id: 1,
      image: 'hackathon_victory.png',
      title: 'Hackathon Win',
      category: 'Hackathons',
      description: 'Celebrating our first-place finish at the annual university hackathon.'
    },
    {
      id: 2,
      image: 'tech_presentation.png',
      title: 'Project Presentation',
      category: 'Tech Events',
      description: 'Presenting our web application project to university professors and industry peers.'
    }
  ];
  fs.writeFileSync(GALLERY_JSON, JSON.stringify(defaultGallery, null, 2));
}

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, 'MohdJagdaResume.pdf');
  }
});
const uploadResume = multer({ storage: resumeStorage });

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

// Check if email configuration is set up
const isEmailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;

let transporter;
if (isEmailConfigured) {
  transporter = nodemailer.createTransport({
    service: 'gmail', // Or configure other SMTP settings
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
} else {
  console.warn("WARNING: EMAIL_USER and EMAIL_PASS environment variables are not set. Emails will be logged to console instead of sent.");
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend server is running smoothly.' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill all fields: name, email, and message.' });
  }

  // If email configuration exists, send actual email
  if (isEmailConfigured && transporter) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to self
      subject: `New Portfolio Message from ${name}`,
      text: `You have received a new message from your portfolio website:
      
Name: ${name}
Email: ${email}
Message: ${message}`,
      replyTo: email
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email successfully sent from ${email}`);
      return res.status(200).json({ success: true, message: 'Thank you for your message! I will get back to you soon.' });
    } catch (error) {
      console.error('Nodemailer Error:', error);
      return res.status(500).json({ success: false, message: 'Oops! Something went wrong on the server, please try again later.' });
    }
  } else {
    // Development fallback
    console.log('--- NEW CONTACT FORM SUBMISSION ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log('-----------------------------------');
    return res.status(200).json({ 
      success: true, 
      message: 'Thank you for your message! (Development Mode: Message logged to console)' 
    });
  }
});

// CMS Passcode Verification
app.post('/api/admin/verify-passcode', (req, res) => {
  const { passcode } = req.body;
  const correctPasscode = process.env.ADMIN_PASSCODE || 'admin123';
  if (passcode === correctPasscode) {
    return res.status(200).json({ success: true, message: 'Authentication successful.' });
  }
  return res.status(401).json({ success: false, message: 'Incorrect passcode. Access denied.' });
});

// Get all gallery items
app.get('/api/gallery', (req, res) => {
  try {
    const data = fs.readFileSync(GALLERY_JSON, 'utf8');
    res.status(200).json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to read gallery items.' });
  }
});

// Add new gallery item (Requires passcode in request body)
app.post('/api/admin/add-gallery-item', upload.single('image'), (req, res) => {
  const { title, description, category, passcode } = req.body;
  const correctPasscode = process.env.ADMIN_PASSCODE || 'admin123';

  if (passcode !== correctPasscode) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }

  if (!title || !category || !req.file) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ success: false, message: 'Title, category, and image are required.' });
  }

  try {
    const data = fs.readFileSync(GALLERY_JSON, 'utf8');
    const items = JSON.parse(data);

    const newItem = {
      id: Date.now(),
      image: req.file.filename,
      title,
      category,
      description: description || ''
    };

    items.push(newItem);
    fs.writeFileSync(GALLERY_JSON, JSON.stringify(items, null, 2));

    res.status(200).json({ success: true, item: newItem });
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, message: 'Failed to save gallery item.' });
  }
});

// Delete a gallery item (Passcode as query parameter)
app.delete('/api/admin/gallery-item/:id', (req, res) => {
  const { id } = req.params;
  const { passcode } = req.query;
  const correctPasscode = process.env.ADMIN_PASSCODE || 'admin123';

  if (passcode !== correctPasscode) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }

  try {
    const data = fs.readFileSync(GALLERY_JSON, 'utf8');
    let items = JSON.parse(data);
    const itemIndex = items.findIndex(item => item.id === parseInt(id));

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }

    const item = items[itemIndex];
    const filePath = path.join(UPLOADS_DIR, item.image);

    if (fs.existsSync(filePath)) {
      if (item.image !== 'hackathon_victory.png' && item.image !== 'tech_presentation.png') {
        fs.unlinkSync(filePath);
      }
    }

    items.splice(itemIndex, 1);
    fs.writeFileSync(GALLERY_JSON, JSON.stringify(items, null, 2));

    res.status(200).json({ success: true, message: 'Item deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete gallery item.' });
  }
});

// Upload/Update Resume PDF (Passcode in request body)
app.post('/api/admin/upload-resume', uploadResume.single('resume'), (req, res) => {
  const { passcode } = req.body;
  const correctPasscode = process.env.ADMIN_PASSCODE || 'admin123';

  if (passcode !== correctPasscode) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  res.status(200).json({ success: true, message: 'Resume uploaded successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
