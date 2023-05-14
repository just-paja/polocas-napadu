export enum GameStage {
	ShowSetup = "A_1",
	Intro = "A_2",
	GameSetup = "A_3",
	Game = "A_4",
	Voting = "A_5",
	GameResults = "A_6",
	Pause = "A_7",
	Finale = "A_8",
}

export const Stages = [
	GameStage.ShowSetup,
	GameStage.Intro,
	GameStage.GameSetup,
	GameStage.Game,
	GameStage.Voting,
	GameStage.GameResults,
	GameStage.Pause,
	GameStage.Finale,
]

export const StageJumpOptions = [
	GameStage.ShowSetup,
	GameStage.Intro,
	GameStage.GameSetup,
	GameStage.Pause,
	GameStage.Finale,
]

export const StageOptions = [
	{
		value: GameStage.ShowSetup,
		label: "Nastavení zápasu",
	},
	{
		value: GameStage.Intro,
		label: "Intro",
	},
	{
		value: GameStage.GameSetup,
		label: "Příprava kategorie",
	},
	{
		value: GameStage.Game,
		label: "Hra!",
	},
	{
		value: GameStage.Voting,
		label: "Hlasování",
	},
	{
		value: GameStage.GameResults,
		label: "Výsledky kategorie",
	},
	{
		value: GameStage.Pause,
		label: "Přestávka",
	},
	{
		value: GameStage.Finale,
		label: "Konec zápasu",
	},
]
