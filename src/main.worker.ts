// src/main.worker.ts
import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './modules/payments/payments.module';
import { Logger } from '@nestjs/common';

async function bootstrapWorker() {
  try {
    // createApplicationContext() ใช้สำหรับรัน module โดยไม่ต้องมี Express
    const appContext = await NestFactory.createApplicationContext(PaymentsModule, {
      logger: ['log', 'error', 'warn'],
    });

    Logger.log('[Worker] BullMQ payout worker started');

    // Nest จะค้างรอ worker consume jobs ต่อเนื่อง
    // ไม่ต้อง call listen() เหมือน main.ts
  } catch (err) {
    Logger.error('[Worker] Failed to start worker', err);
    process.exit(1);
  }
}

bootstrapWorker();
