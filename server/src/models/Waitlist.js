import mongoose from 'mongoose';

const waitlistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      unique: true,
    },
    companyEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    stack: {
      type: [String],
      required: [true, 'At least one tech stack selection is required'],
      default: [],
    },
    repoSizeBucket: {
      type: String,
      required: [true, 'Repository size bucket is required'],
      enum: ['<50 files', '50-200 files', '200-1000 files', '1000-5000 files', '5000+ files'],
    },
    operatingSystem: {
      type: String,
      required: [true, 'Operating system is required'],
      enum: ['macOS (Apple Silicon)', 'macOS (Intel)', 'Linux (x86_64)', 'Linux (ARM64)', 'Windows 11 / 10', 'WSL2 (Ubuntu/Debian)'],
    },
    timeZone: {
      type: String,
      required: [true, 'Time zone is required'],
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: '',
    },
    usesJavaScriptTypeScript: {
      type: String,
      enum: ['yes', 'no'],
      default: 'yes',
    },
    role: {
      type: String,
      enum: ['working professional', 'other'],
      default: 'other',
    },
    status: {
      type: String,
      enum: ['pending', 'invited', 'active', 'declined'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Waitlist = mongoose.model('Waitlist', waitlistSchema);
