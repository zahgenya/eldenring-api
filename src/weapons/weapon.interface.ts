export enum weaponTypeE {
  dagger = "Dagger",
  straightSword = "Straight Sword",
  greatsword = "Greatsword",
  colossalSword = "Colossal Sword",
  thrustingSword = "Thrusting Sword",
  heavyThrustingSword = "Heavy Thrusting Sword",
  curvedSword = "Curved Sword",
  curvedGreatsword = "Curved Greatsword",
  katana = "Katana",
  twinblade = "Twinblade",
  axe = "Axe",
  greateaxe = "Greateaxe",
  hammer = "Hammer",
  flail = "Flail",
  greatHammer = "Great Hammer",
  colossalWeapon = "Colossal Weapon",
  spear = "Spear",
  greatSpear = "Great Spear",
  halberd = "Halberd",
  reaper = "Reaper",
  whip = "Whip",
  fist = "Fist",
  claw = "Claw",
  lightBow = "Light Bow",
  bow = "Bow",
  greatbow = "Greatbow",
  crossbow = "Crossbow",
  balista = "Balista",
  glinstoneStaff = "Glinstone Staff",
  sacredSeal = "Sacred Seal",
}

interface scaleStatsI {
  Arc: string;
  Fai: string;
  Int: string;
  Dex: string;
  Str: string;
}

interface reqStatsI {
  Arc: number;
  Fai: number;
  Int: number;
  Dex: number;
  Str: number;
}

interface damageI {
  Phy: number;
  Mag: number;
  Fire: number;
  Ligt: number;
  Holy: number;
  Crit: number;
}

interface guardI {
  Phy: number;
  Mag: number;
  Fire: number;
  Ligt: number;
  Holy: number;
  Boost: number;
}

export interface weaponData {
  name: string;
  type: weaponTypeE;
  weight: number;
  description: string;
  damage: damageI;
  guard: guardI;
  scaling: scaleStatsI;
  requires: reqStatsI;
}