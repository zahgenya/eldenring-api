interface dmgI {
  Phy: number;
  Strike: number;
  Slash: number;
  Pierce: number;
  Magic: number;
  Fire: number;
  Ligt: number;
  Holy: number;
}

interface resistI {
  Immunity: number;
  Robustness: number;
  Focus: number;
  Vitality: number;
  Poise: number;
}

export interface armorData {
  name: string;
  description: string;
  category: string;
  weight: number;
  dmgNegation: dmgI;
  resistance: resistI;
}

export interface mockArmorData extends armorData {
  id: number
}