// Fetch character data from DDB API

import { CharacterIdType, CharacterType } from '@typings/character';

abstract class CharacterDataFetcher {
    _fetchUrl: (CharacterIdType) => string;

    constructor(fetchUrl: (CharacterIdType) => string) {
        this._fetchUrl = fetchUrl;
    }

    fetch(characterId: CharacterIdType): Promise<any> {
        return fetch(this._fetchUrl(characterId))
            .then(resp => resp.json())
            .then(resp => resp.data)
            .catch(console.error);
    }
}

const PLAYER_FETCHER_URL = (id: CharacterIdType) => `https://character-service.dndbeyond.com/character/v4/character/${id}`;
class PlayerFetcher extends CharacterDataFetcher {
    constructor() {
        super(PLAYER_FETCHER_URL);
    }
}

const MONSTER_FETCHER_URL = (id: CharacterIdType) => `https://monster-service.dndbeyond.com/v1/Monster/${id}`;
class MonsterFetcher extends CharacterDataFetcher {
    constructor() {
        super(MONSTER_FETCHER_URL);
    }
}

export function fetchCharacterData(characterId: CharacterIdType, characterType: CharacterType): Promise<any> {
    var fetcher: CharacterDataFetcher;
    switch (characterType) {
        case CharacterType.Player:
        case CharacterType.NPC: {
            fetcher = new PlayerFetcher();
            break;
        }

        case CharacterType.Monster: {
            fetcher = new MonsterFetcher();
            break;
        }
    }

    return fetcher.fetch(characterId);
}