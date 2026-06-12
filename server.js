const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Directories (all relative to project root)
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

// Copy default seed images from public if they exist
const publicGalleryDir = path.join(__dirname, 'public', 'images', 'gallery');
['hackathon_victory.png', 'tech_presentation.png'].forEach(file => {
  const src = path.join(publicGalleryDir, file);
  const dest = path.join(UPLOADS_DIR, file);
  if (fs.existsSync(src) && !fs.existsSync(dest)) {
    try {
      fs.copyFileSync(src, dest);
    } catch (err) {
      console.error('Error copying seed file:', err);
    }
  }
});

// Copy default resume from public if it exists
const srcResume = path.join(__dirname, 'public', 'MohdJagdaResume.pdf');
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

// Multer Config — gallery images
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

// Multer Config — resume (always overwrites same filename)
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
const allowedOrigins = [
  'http://localhost:3000',
  'https://mohammed-jagda.github.io',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, same-origin in prod)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(UPLOADS_DIR));

// ─── Email Setup ────────────────────────────────────────────────────────────
const isEmailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;

let transporter;
if (isEmailConfigured) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
} else {
  console.warn('WARNING: EMAIL_USER and EMAIL_PASS not set. Emails will be logged to console.');
}

// ─── API Routes ──────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend server is running smoothly.' });
});

// Contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill all fields: name, email, and message.' });
  }

  if (isEmailConfigured && transporter) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Portfolio Message from ${name}`,
      text: `You have received a new message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
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

// Add new gallery item
app.post('/api/admin/add-gallery-item', upload.single('image'), (req, res) => {
  const { title, description, category, passcode } = req.body;
  const correctPasscode = process.env.ADMIN_PASSCODE || 'admin123';

  if (passcode !== correctPasscode) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }

  if (!title || !category || !req.file) {
    if (req.file) fs.unlinkSync(req.file.path);
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
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, message: 'Failed to save gallery item.' });
  }
});

// Delete a gallery item
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

// Upload/Update Resume PDF
app.post('/api/admin/upload-resume', uploadResume.single('resume'), (req, res) => {
  const { passcode } = req.body;
  const correctPasscode = process.env.ADMIN_PASSCODE || 'admin123';

  if (passcode !== correctPasscode) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  res.status(200).json({ success: true, message: 'Resume uploaded successfully.' });
});

// ─── Serve React Build in Production ─────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));

  // Any route not matched by API routes serves React's index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`   Serving React build at http://localhost:${PORT}`);
  } else {
    console.log(`   API available at http://localhost:${PORT}/api`);
    console.log(`   React dev server runs separately on port 3000`);
  }
});
