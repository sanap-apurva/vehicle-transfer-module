const multer = require('multer');
const path = require('path');

// Define storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set upload directory based on file type
        let uploadPath = 'uploads/';
        if (file.fieldname === 'profilePhoto') {
            uploadPath = 'uploads/profilePhotos/';
        } else if (file.fieldname === 'pucCertificate') {
            uploadPath = 'uploads/pucCertificates/';
        } else if (file.fieldname === 'insuranceCertificate') {
            uploadPath = 'uploads/insuranceCertificates/';
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Create a unique filename
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Define file filter for validation
const fileFilter = (req, file, cb) => {
    // Accept only specific file types
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

// Create multer instance with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    // limits: {
    //     fileSize: 1024 * 1024 * 5 // 5 MB limit
    // }
});

module.exports = upload;
