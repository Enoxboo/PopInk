import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import type { HealthResponse } from '@popink/contracts';
import { AppModule } from './app.module.js';

describe('GET /health', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    await app.listen(0);
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns the health status', async () => {
    const response = await fetch(`${await app.getUrl()}/health`);
    const body = (await response.json()) as HealthResponse;

    expect(response.status).toBe(200);
    expect(body).toEqual({ status: 'ok' });
  });
});
