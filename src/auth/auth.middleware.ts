import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly apiKey = process.env.API_KEY;
  
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'POST') {
      const apiKey = req.headers['x-api-key'];
      if (!apiKey || apiKey !== this.apiKey) {
        return res.status(401).send('Unauthorized!');
      }
    }

    next();
  }
}
