import { z } from 'zod';

export const earlyTesterSchema = z.object({
  email: z.string().trim().toLowerCase().max(254).email('Please provide a valid email address'),
  companyEmail: z.string().trim().toLowerCase().max(254).email('Invalid company email address').optional().or(z.literal('')),
  stack: z.array(z.string().trim().min(1).max(80)).max(20).min(1, 'Please select at least one technology stack'),
  repoSizeBucket: z.enum([
    '<50 files',
    '50-200 files',
    '200-1000 files',
    '1000-5000 files',
    '5000+ files',
  ]),
  operatingSystem: z.enum([
    'macOS (Apple Silicon)',
    'macOS (Intel)',
    'Linux (x86_64)',
    'Linux (ARM64)',
    'Windows 11 / 10',
    'WSL2 (Ubuntu/Debian)',
  ]),
  timeZone: z.string().min(2, 'Time zone is required').max(80),
  notes: z.string().max(1000, 'Notes must be under 1000 characters').optional().default(''),
  usesJavaScriptTypeScript: z.enum(['yes', 'no']).optional().default('yes'),
  role: z.enum(['working professional', 'other']).optional().default('other'),
});

export const teamsWaitlistSchema = z.object({
  workEmail: z.string().trim().toLowerCase().max(254).email('Please provide a valid work email address'),
  teamSize: z.enum([
    '1-5 developers',
    '6-20 developers',
    '21-50 developers',
    '50+ developers',
  ]),
  companyName: z.string().max(120).optional().default(''),
  primaryUseCase: z.enum([
    'Shared architecture maps across engineering team',
    'Automated PR bot impact analysis on pull requests',
    'Onboarding new engineers to complex codebases',
    'Compliance & security architecture review',
  ]),
  currentStack: z.string().max(300).optional().default(''),
});

export const feedbackSchema = z.object({
  category: z.enum([
    'bug',
    'limitation_reproduction',
    'feature_request',
    'benchmark_question',
    'general',
  ]),
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(150),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(5000),
  repoUrl: z.string().url('Repo URL must be a valid link').optional().or(z.literal('')),
  email: z.string().trim().toLowerCase().max(254).email('Invalid email address').optional().or(z.literal('')),
  canopyVersion: z.string().max(50).optional().default(''),
});
