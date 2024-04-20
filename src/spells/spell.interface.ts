export interface spellData {
  name: string,
  description: string,
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

export interface mockSpellData extends spellData {
  id: number,
}