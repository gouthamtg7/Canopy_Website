import { ZodError } from 'zod';

export function notFoundHandler(req, res, next) {
  res.status(404).json({
    status: 404,
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(err, req, res, next) {
  // Zod validation error
  if (err instanceof ZodError) {
    const formattedErrors = (err.issues || err.errors || []).map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    return res.status(400).json({
      status: 400,
      error: 'Validation Error',
      message: 'The submitted payload failed validation constraints.',
      details: formattedErrors,
    });
  }

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      status: 409,
      error: 'Conflict',
      message: `A record with this ${field} already exists in our registry.`,
    });
  }

  // Default server error
  const statusCode = err.status || err.statusCode || 500;
  const isDev = process.env.NODE_ENV === 'development';

  if (statusCode >= 500) console.error('[Error Handler]', err.name, err.message);

  res.status(statusCode).json({
    status: statusCode,
    error: err.name || 'Internal Server Error',
    message: statusCode >= 500 && !isDev ? 'An unexpected internal error occurred.' : (err.message || 'Invalid request.'),
    ...(isDev ? { stack: err.stack } : {}),
  });
}
