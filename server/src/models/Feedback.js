import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Feedback category is required'],
      enum: ['bug', 'limitation_reproduction', 'feature_request', 'benchmark_question', 'general'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 150,
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
      maxlength: 5000,
    },
    repoUrl: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    canopyVersion: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Feedback = mongoose.model('Feedback', feedbackSchema);
