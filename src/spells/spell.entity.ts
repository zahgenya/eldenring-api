import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Spell {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  spellType: string;

  @Column()
  magicType: string;

  @Column()
  cost: number;

  @Column()
  slots: number;

  @Column()
  effects: string;

  @Column("simple-json")
  requires: {
    Int: number;
    Fai: number;
    Arc: number;
  };
}