import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Armor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  weight: number;

  @Column("simple-json")
  dmgNegation: {
    Phy: number;
    Strike: number;
    Slash: number;
    Pierce: number;
    Magic: number;
    Fire: number;
    Ligt: number;
    Holy: number;
  }

  @Column("simple-json")
  resistance: {
    Immunity: number;
    Robustness: number;
    Focus: number;
    Vitality: number;
    Poise: number;
  }
}