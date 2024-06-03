import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { debugLevel, HOST, PORT } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    { logger: debugLevel },
  );
  await app.listen(PORT, HOST, () => {
    Logger.debug(`Server listening at http://${HOST}:${PORT}/`, 'MOI-API');
  });
}
bootstrap();
