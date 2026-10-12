export const EnemyType: Record<number, string> = {
    2651633799: 'Chargers',
    2664856027: 'Shredder Tanks',
    717622970: 'Bile Spewers',
    444529084: 'Bile Spitters',
};

export function enemyLabel(t: number)  { return EnemyType[t] ?? `${t}`; }