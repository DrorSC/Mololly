export interface CurrentGameInfo {
    gameId: number; // The ID of the game
    gameType: string; // The game type
    gameStartTime: number; // The game start time represented in epoch milliseconds
    mapId: number; // The ID of the map
    gameLength: number; // The amount of time in seconds that has passed since the game started
    platformId: string; // The ID of the platform on which the game is being played
    gameMode: string; // The game mode
    bannedChampions: Array<BannedChampion>; // Banned champion information
    gameQueueConfigId: number; // The queue type(queue types are documented on the Game Constants page)
    observers: Observer; //	The observer information
    participants: Array<CurrentGameParticipant>; //	The participant information
}

export interface BannedChampion {

}

export interface CurrentGameParticipant {

}

export interface Observer {

}