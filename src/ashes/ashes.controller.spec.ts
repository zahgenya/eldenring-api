import { Test, TestingModule } from '@nestjs/testing';
import { AshesController } from './ashes.controller';
import { AshesService } from './ashes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ash } from './ash.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { mockAshData } from './ash.interface';

describe('AshesController', () => {
  let controller: AshesController
  let service: AshesService
  let repository: Repository<Ash>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AshesController],
      providers: [
        AshesService,
        {
          provide: getRepositoryToken(Ash),
          useClass: Repository,
          useValue: {},
        },
      ],
    }).compile()

    controller = module.get<AshesController>(AshesController)
    service = module.get<AshesService>(AshesService)
    repository = module.get<Repository<Ash>>(getRepositoryToken(Ash))
  })

  it('Should be defined', () => {
    expect(controller).toBeDefined
  })

  it('test get ashes route', async () => {
    const ashes: mockAshData[] = [
      {
        id: 1,
        name: "good one",
        description: "oke",
        affinity: "nice",
        skill: "lesgo"
      },
      {
        id: 2,
        name: "bad one",
        description: "not oke",
        affinity: "too bad",
        skill: "ohno"
      },
    ]

    jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(ashes),
    } as any)
    const result = await controller.getAshes(null)
    expect(result).toEqual(ashes)
  })

  it('test get ashes error', async () => {
    jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
    } as any);

    try {
      await controller.getAshes(null)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error.message).toBe('Internal server error')
      expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
    }
  })

  it('test get by id route', async () => {
    const ash: mockAshData = {
      id: 1,
      name: "good one",
      description: "oke",
      affinity: "nice",
      skill: "lesgo"
    }
    jest.spyOn(service, 'findOne').mockImplementation(async (id: number) => {
      if (id === 1) {
        return ash
      }
      return undefined
    })

    const result = await controller.getAshById(1)
    expect(result).toEqual(ash)
  })

  it('test get by id error', async () => {
    jest.spyOn(service, 'findOne').mockImplementation(async (id: number) => {
      if (id === 1) {
        return
      }
      return undefined
    })

    try {
      await controller.getAshById(0);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error.message).toBe('Ash not found')
      expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND)
    }
  })
})