import { Test, TestingModule } from '@nestjs/testing';
import { ArmorsController } from './armors.controller';
import { ArmorsService } from './armors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Armor } from './armor.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { mockArmorData } from './armor.interface';

describe('ArmorsController', () => {
  let controller: ArmorsController;
  let service: ArmorsService;
  let repository: Repository<Armor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmorsController],
      providers: [
        ArmorsService,
        {
          provide: getRepositoryToken(Armor),
          useClass: Repository,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ArmorsController>(ArmorsController);
    service = module.get<ArmorsService>(ArmorsService);
    repository = module.get<Repository<Armor>>(getRepositoryToken(Armor));
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined;
  });

  it('test get armors route', async () => {
    const armors: mockArmorData[] = [
      {
        id: 1,
        name: 'Geralt armorpiece',
        description: 'legendary grail',
        category: 'body',
        weight: 10,
        dmgNegation: {
          Phy: 10,
          Strike: 10,
          Slash: 10,
          Pierce: 10,
          Magic: 10,
          Fire: 10,
          Ligt: 10,
          Holy: 10,
        },
        resistance: {
          Immunity: 10,
          Robustness: 10,
          Focus: 10,
          Vitality: 10,
          Poise: 10,
        },
      },
      {
        id: 1,
        name: 'Iron Helmet',
        description: 'The Iron Helmet is worn by the Dragonborn',
        category: 'helmet',
        weight: 10,
        dmgNegation: {
          Phy: 10,
          Strike: 10,
          Slash: 10,
          Pierce: 10,
          Magic: 10,
          Fire: 10,
          Ligt: 10,
          Holy: 10,
        },
        resistance: {
          Immunity: 10,
          Robustness: 10,
          Focus: 10,
          Vitality: 10,
          Poise: 10,
        },
      },
    ];

    jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(armors),
    } as any);
    const result = await controller.getArmors(null);
    expect(result).toEqual(armors);
  });

  it('test get armors error', async () => {
    jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
    } as any);

    try {
      await controller.getArmors(null);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Internal server error');
      expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });

  it('test get by id route', async () => {
    const armor: mockArmorData = {
      id: 1,
      name: 'Geralt armorpiece',
      description: 'legendary grail',
      category: 'body',
      weight: 10,
      dmgNegation: {
        Phy: 10,
        Strike: 10,
        Slash: 10,
        Pierce: 10,
        Magic: 10,
        Fire: 10,
        Ligt: 10,
        Holy: 10,
      },
      resistance: {
        Immunity: 10,
        Robustness: 10,
        Focus: 10,
        Vitality: 10,
        Poise: 10,
      },
    };
    jest.spyOn(service, 'findOne').mockImplementation(async (id: number) => {
      if (id === 1) {
        return armor;
      }
      return undefined;
    });

    const result = await controller.getArmorById(1);
    expect(result).toEqual(armor);
  });

  it('test get by id error', async () => {
    jest.spyOn(service, 'findOne').mockImplementation(async (id: number) => {
      if (id === 1) {
        return;
      }
      return undefined;
    });

    try {
      await controller.getArmorById(0);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Armor not found');
      expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
    }
  });
});
