import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ash {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  affinity: string;
  
  @Column()
  skill: string;
}