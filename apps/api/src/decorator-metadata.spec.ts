import { Controller, Get, Injectable } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { describe, it, expect } from 'vitest';

// Garde-fou : NestJS a besoin des métadonnées de décorateurs (émises par tsc)
// pour résoudre l'injection par constructeur. Vitest transforme par défaut
// via esbuild, qui ne garantit pas historiquement cette émission. Ce test
// vérifie concrètement que l'injection fonctionne ; s'il échoue après une
// mise à jour de Vitest, il faudra réintroduire unplugin-swc.

@Injectable()
class GreeterService {
  greet(): string {
    return 'hi';
  }
}

@Controller()
class GreeterController {
  constructor(private readonly greeter: GreeterService) {}

  @Get()
  get(): string {
    return this.greeter.greet();
  }
}

describe('constructor injection sanity check', () => {
  it('resolves GreeterService via decorator metadata', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GreeterController],
      providers: [GreeterService],
    }).compile();

    const controller = moduleRef.get(GreeterController);
    expect(controller.get()).toBe('hi');
  });
});
