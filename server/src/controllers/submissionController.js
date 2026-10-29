import mongoose from 'mongoose';
import { Waitlist } from '../models/Waitlist.js';
import { TeamsWaitlist } from '../models/TeamsWaitlist.js';
import { Feedback } from '../models/Feedback.js';
import { earlyTesterSchema, teamsWaitlistSchema, feedbackSchema } from '../validators/schemas.js';

export async function submitEarlyTester(req, res, next) {
  try {
    const validatedData = earlyTesterSchema.parse(req.body);

    // If MongoDB is connected, save to DB; otherwise if disconnected in dev mode, handle gracefully
    if (mongoose.connection.readyState === 1) {
      const existing = await Waitlist.findOne({ email: validatedData.email });
      if (existing) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: 'You are already on the early-testers list. We will reach out when the next alpha wave opens.',
          recordId: existing._id,
        });
      }

      const record = await Waitlist.create(validatedData);
      return res.status(201).json({
        status: 201,
        success: true,
        message: 'Application received. Welcome to the Canopy early-testers pool.',
        recordId: record._id,
      });
    }

    return res.status(503).json({ success: false, message: 'Submissions are temporarily unavailable. Your information has not been saved. Please try again later.' });
  } catch (error) {
    next(error);
  }
}

export async function submitTeamsWaitlist(req, res, next) {
  try {
    const validatedData = teamsWaitlistSchema.parse(req.body);

    if (mongoose.connection.readyState === 1) {
      const existing = await TeamsWaitlist.findOne({ workEmail: validatedData.workEmail });
      if (existing) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: 'Your team is already registered on the waitlist. We will notify you when team workspaces launch.',
          recordId: existing._id,
        });
      }

      const record = await TeamsWaitlist.create(validatedData);
      return res.status(201).json({
        status: 201,
        success: true,
        message: 'Team waitlist registration confirmed.',
        recordId: record._id,
      });
    }

    return res.status(503).json({ success: false, message: 'Submissions are temporarily unavailable. Your information has not been saved. Please try again later.' });
  } catch (error) {
    next(error);
  }
}

export async function submitFeedback(req, res, next) {
  try {
    const validatedData = feedbackSchema.parse(req.body);

    if (mongoose.connection.readyState === 1) {
      const record = await Feedback.create(validatedData);
      return res.status(201).json({
        status: 201,
        success: true,
        message: 'Feedback received. Thank you for helping improve Canopy Engine.',
        recordId: record._id,
      });
    }

    return res.status(503).json({ success: false, message: 'Submissions are temporarily unavailable. Your information has not been saved. Please try again later.' });
  } catch (error) {
    next(error);
  }
}
