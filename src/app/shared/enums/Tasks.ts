export const TaskTypes: Record<number, string> = {
	2: "Extract",
    3: "Eradicate",
	7: "Complete Missions",
	9: "Complete Operations",
	11: "Liberation",
	12: "Defense",
	13: "Control",
	15: "Expand"
};

export function taskLabel(t: number)  { return TaskTypes[t] ?? `${t}`; }