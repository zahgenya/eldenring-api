import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Talisman {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  effects: string;
}