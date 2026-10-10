export const EnemyType: Record<number, string> = {
    2651633799: 'Charger',
    2664856027: 'Shredder Tank',
};

export function enemyLabel(t: number)  { return EnemyType[t] ?? `${t}`; }