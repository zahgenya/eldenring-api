import { Test, TestingModule } from '@nestjs/testing';
import { SpellsController } from './spells.controller';
import { SpellsService } from './spells.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Spell } from './spell.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { magicTypeE, mockSpellData } from './spell.interface';

describe('SpellsController', () => {
  let controller: SpellsController;
  let service: SpellsService;
  let repository: Repository<Spell>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpellsController],
      providers: [
        SpellsService,
        {
          provide: getRepositoryToken(Spell),
          useClass: Repository,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<SpellsController>(SpellsController);
    service = module.get<SpellsService>(SpellsService);
    repository = module.get<Repository<Spell>>(getRepositoryToken(Spell));
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined;
  });

  it('test get spells route', async () => {
    const spells: mockSpellData[] = [
      {
        id: 1,
        name: 'cool stuff',
        description: 'something',
        magicType: magicTypeE.incantation,
        cost: 12,
        slots: 1,
        effects: 'makes target crabby',
        requires: {
          Int: 1,
          Fai: 2,
          Arc: 3,
        },
      },
      {
        id: 2,
        name: 'bad spell',
        description: 'bad stuff',
        magicType: magicTypeE.incantation,
        cost: 12,
        slots: 1,
        effects: 'makes target bad person',
        requires: {
          Int: 10,
          Fai: 80,
          Arc: 0,
        },
      },
    ];

    jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(spells),
    } as any);
    const result = await controller.getSpells(null, null);
    expect(result).toEqual(spells);
  });

  it('test get spells error', async () => {
    jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
    } as any);

    try {
      await controller.getSpells(null, null);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Internal server error');
      expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });

  it('test get by id route', async () => {
    const spell: mockSpellData = {
      id: 1,
      name: 'cool stuff',
      description: 'something',
      magicType: magicTypeE.incantation,
      cost: 12,
      slots: 1,
      effects: 'makes target crabby',
      requires: {
        Int: 1,
        Fai: 2,
        Arc: 3,
      },
    };
    jest.spyOn(service, 'findOne').mockImplementation(async (id: number) => {
      if (id === 1) {
        return spell;
      }
      return undefined;
    });

    const result = await controller.getSpellById(1);
    expect(result).toEqual(spell);
  });

  it('test get by id error', async () => {
    jest.spyOn(service, 'findOne').mockImplementation(async (id: number) => {
      if (id === 1) {
        return;
      }
      return undefined;
    });

    try {
      await controller.getSpellById(0);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Spell not found');
      expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
    }
  });
});
