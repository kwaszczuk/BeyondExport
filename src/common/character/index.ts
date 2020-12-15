import { extensionLog } from '@common/utils';
import { Character, CharacterData, CharacterType, CharacterIdType } from '@typings/character';
import { fetchCharacterData } from './fetch';
import { parseCharacterData } from './parse';

export function getCharacter(characterId: CharacterIdType, characterType: CharacterType): Promise<Character> {
    extensionLog(`Fetching character ${characterId} data...`);
    return fetchCharacterData(characterId, characterType)
        .then(rawCharacterData => {
            extensionLog(`Parsing character ${characterId} data...`);
            const characterData: CharacterData = parseCharacterData(rawCharacterData, characterType);
            const character: Character = {
                id: characterId,
                data: characterData,
                type: characterType
            };
            return character;
        });
}