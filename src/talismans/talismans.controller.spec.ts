import { Test, TestingModule } from '@nestjs/testing';
import { TalismansController } from './talismans.controller';
import { TalismansService } from './talismans.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Talisman } from './talisman.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { mockTalismanData } from './talisman.interface';

describe('TalismansController', () => {
  let controller: TalismansController
  let service: TalismansService
  let repository: Repository<Talisman>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalismansController],
      providers: [
        TalismansService,
        {
          provide: getRepositoryToken(Talisman),
          useClass: Repository,
          useValue: {},
        },
      ],
    }).compile()

    controller = module.get<TalismansController>(TalismansController)
    service = module.get<TalismansService>(TalismansService)
    repository = module.get<Repository<Talisman>>(getRepositoryToken(Talisman))
  })

  it('Should be defined', () => {
    expect(controller).toBeDefined
  })

  it('test get talismans route', async () => {
    const talismans: mockTalismanData[] = [
      {
        id: 1,
        name: "cool talisman",
        description: "cool description",
        effects: "infinite luck",
      },
      {
        id: 2,
        name: "pookie talisman",
        description: "so bad",
        effects: "narrr",
      },
    ]

    jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(talismans),
    } as any)
    const result = await controller.getTalismans(null)
    expect(result).toEqual(talismans)
  })

  it('test get talismans error', async () => {
    jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
    } as any);

    try {
      await controller.getTalismans(null)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error.message).toBe('Internal server error')
      expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
    }
  })

  it('test get by id route', async () => {
    const talisman: mockTalismanData = {
      id: 1,
      name: "cool talisman",
      description: "cool description",
      effects: "infinite luck",
    }
    jest.spyOn(service, 'findOne').mockImplementation(async (id: number) => {
      if (id === 1) {
        return talisman
      }
      return undefined
    })

    const result = await controller.getTalismanById(1)
    expect(result).toEqual(talisman)
  })

  it('test get by id error', async () => {
    jest.spyOn(service, 'findOne').mockImplementation(async (id: number) => {
      if (id === 1) {
        return
      }
      return undefined
    })

    try {
      await controller.getTalismanById(0);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error.message).toBe('Talisman not found')
      expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND)
    }
  })
})