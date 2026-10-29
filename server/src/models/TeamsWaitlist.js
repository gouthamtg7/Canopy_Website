import mongoose from 'mongoose';

const teamsWaitlistSchema = new mongoose.Schema(
  {
    workEmail: {
      type: String,
      required: [true, 'Work email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      unique: true,
    },
    teamSize: {
      type: String,
      required: [true, 'Team size is required'],
      enum: ['1-5 developers', '6-20 developers', '21-50 developers', '50+ developers'],
    },
    companyName: {
      type: String,
      trim: true,
      maxlength: 120,
      default: '',
    },
    primaryUseCase: {
      type: String,
      required: [true, 'Primary use case is required'],
      enum: [
        'Shared architecture maps across engineering team',
        'Automated PR bot impact analysis on pull requests',
        'Onboarding new engineers to complex codebases',
        'Compliance & security architecture review'
      ],
    },
    currentStack: {
      type: String,
      trim: true,
      maxlength: 300,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const TeamsWaitlist = mongoose.model('TeamsWaitlist', teamsWaitlistSchema);
