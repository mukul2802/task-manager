import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import { MESSAGES } from '../constants';

// Any request that didn't match a route
export function notFound(_req: Request, res: Response): void {
  res.status(404).json({ message: MESSAGES.ROUTE_NOT_FOUND });
}

// Central error handler. Express 5 forwards errors thrown in async controllers here.
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof SyntaxError) {
    res.status(400).json({ message: MESSAGES.INVALID_JSON });
    return;
  }

  if (err instanceof MongooseError.ValidationError) {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join(', ');
    res.status(400).json({ message });
    return;
  }

  console.error(err);
  res.status(500).json({ message: MESSAGES.SERVER_ERROR });
}
