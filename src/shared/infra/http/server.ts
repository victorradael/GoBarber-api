import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import { errors } from 'celebrate';

import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';
import uploadConfig from '@config/upload';
import AppError from '@shared/error/AppError';
import rateLimiter from './middlewares/rateLimiter';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GoBarber API',
      version: '1.0.0',
      description: 'GoBarber API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:3333',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/shared/infra/http/routes/*.ts', './src/modules/**/infra/http/routes/*.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use('/api-docs', swaggerUi.serve as any, swaggerUi.setup(specs) as any);
app.use(routes);

app.use(errors() as any);

app.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
  }
);

app.listen(3333, () => {
  console.log('💈 Server started on port 3333  ');
});
