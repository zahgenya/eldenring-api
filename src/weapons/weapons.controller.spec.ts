import { Test, TestingModule } from "@nestjs/testing";
import { WeaponsController } from "./weapons.controller";
import { WeaponsService } from "./weapons.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Weapon } from "./weapon.entity";
import { mockWeaponData, weaponTypeE } from "./weapon.interface";
import { Repository } from "typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";

describe("WeaponsController", () => {
  let controller: WeaponsController
  let service: WeaponsService
  let repository: Repository<Weapon>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaponsController],
      providers: [
        WeaponsService,
        {
          provide: getRepositoryToken(Weapon),
          useClass: Repository,
          useValue: {},
        }
      ]
    }).compile();

    controller = module.get<WeaponsController>(WeaponsController);
    service = module.get<WeaponsService>(WeaponsService);
    repository = module.get<Repository<Weapon>>(getRepositoryToken(Weapon));
  });

  it("Should be defined", () => {
    expect(controller).toBeDefined
  })

  it("test get weapons route", async () => {
    const weapons: mockWeaponData[] = [
      {
        id: 1,
        name: "Diamond Steve Sword",
        type: weaponTypeE.curvedSword,
        weight: 2.50,
        description: "Minecraft sword",
        damage: {"Phy":99,"Mag":0,"Fire":0,"Ligt":0,"Holy":0,"Crit":110},
        guard:{"Phy":99,"Mag":22,"Fire":22,"Ligt":22,"Holy":22,"Boost":16},
        scaling:{"Arc":"-","Fai":"-","Int":"-","Dex":"S","Str":"S"},
        requires:{"Arc":13,"Fai":0,"Int":0,"Dex":13,"Str":5}
      },
      {
        id: 1,
        name: "Nail",
        type: weaponTypeE.curvedSword,
        weight: 2.50,
        description: "Hollow knight weapon",
        damage: {"Phy":99,"Mag":0,"Fire":0,"Ligt":0,"Holy":0,"Crit":110},
        guard:{"Phy":99,"Mag":22,"Fire":22,"Ligt":22,"Holy":22,"Boost":16},
        scaling:{"Arc":"-","Fai":"-","Int":"-","Dex":"S","Str":"S"},
        requires:{"Arc":13,"Fai":0,"Int":0,"Dex":13,"Str":5}
      }
    ]
    jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(weapons),
    } as any)
    const result = await controller.findAll(null, null)
    expect(result).toEqual(weapons);
  })

  it("test get weapons error", async () => {
    jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
    } as any)

    try {
      await controller.findAll(null, null)
      fail("Expected error was not thrown")
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe("Internal server error");
      expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  it("test get by id route", async () => {
    const weapon: mockWeaponData = {
        id: 1,
        name: "Diamond Steve Sword",
        type: weaponTypeE.curvedSword,
        weight: 2.50,
        description: "Minecraft sword",
        damage: {"Phy":99,"Mag":0,"Fire":0,"Ligt":0,"Holy":0,"Crit":110},
        guard:{"Phy":99,"Mag":22,"Fire":22,"Ligt":22,"Holy":22,"Boost":16},
        scaling:{"Arc":"-","Fai":"-","Int":"-","Dex":"S","Str":"S"},
        requires:{"Arc":13,"Fai":0,"Int":0,"Dex":13,"Str":5}
      }
    jest.spyOn(service, 'findOne').mockImplementation(async (id: number) => {
      if (id === 1) {
        return weapon
      }
      return undefined
    })
    const result = await controller.getWeaponById(1)
    expect(result).toEqual(weapon);
  })
})