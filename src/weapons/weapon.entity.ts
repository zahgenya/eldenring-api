import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Weapon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  weight: number;

  @Column()
  description: string;

  @Column("simple-json")
  damage: { 
    Phy: number;
    Mag: number;
    Fire: number;
    Ligt: number;
    Holy: number;
    Crit: number; 
  };

  @Column("simple-json")
  guard: { 
    Phy: number;
    Mag: number;
    Fire: number;
    Ligt: number;
    Holy: number;
    Boost: number; 
  };

  @Column("simple-json")
  scaling: {
    Arc: string;
    Fai: string;
    Int: string;
    Dex: string;
    Str: string;
  };

  @Column("simple-json")
  requires: {
    Arc: number;
    Fai: number;
    Int: number;
    Dex: number;
    Str: number;
  };
}