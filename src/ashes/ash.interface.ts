export interface ashData {
  name: string;
  description: string;
  affinity: string;
  skill: string;
}

export interface mockAshData extends ashData {
  id: number,
}