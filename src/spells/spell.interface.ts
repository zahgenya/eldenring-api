export interface spellData {
  id: number,
  name: string,
  description: string,
  spellType: string,
  magicType: magicTypeE,
  cost: number,
  slots: number,
  effects: string,
  requires: reqI
}

interface reqI {
  Int: number,
  Fai: number,
  Arc: number
}

export enum magicTypeE {
  sorcery = "Sorcery",
  incantation = "Incantation"
}