// Transform DDB character's data to internal format.

import { CharacterData, CharacterType } from '@typings/character';

abstract class CharacterDataParser {
    parse(data: any): CharacterData {
        return {
            name: this._parseName(data),
            class: this._parseClass(data),
            level: this._parseLevel(data),
            hitPoints: this._parseHitPoints(data),
            armorClass: this._parseArmorClass(data),
            speed: this._parseSpeed(data),
            imageUrl: this._parseImageUrl(data),
            attributes: {
                strength: this._parseStrength(data),
                dexterity: this._parseDexterity(data),
                constitution: this._parseConstitution(data),
                inteligence: this._parseInteligence(data),
                wisdom: this._parseWisdom(data),
                charisma: this._parseCharisma(data)
            }
        };
    }

    protected abstract _parseName(data: any): string;
    protected abstract _parseClass(data: any): string | null;
    protected abstract _parseLevel(data: any): number;
    protected abstract _parseHitPoints(data: any): number;
    protected abstract _parseArmorClass(data: any): number;
    protected abstract _parseSpeed(data: any): number;
    protected abstract _parseImageUrl(data: any): string | null;
    protected abstract _parseStrength(data: any): number;
    protected abstract _parseDexterity(data: any): number;
    protected abstract _parseConstitution(data: any): number;
    protected abstract _parseInteligence(data: any): number;
    protected abstract _parseWisdom(data: any): number;
    protected abstract _parseCharisma(data: any): number;
}

class PlayerParser extends CharacterDataParser {
    parse(data: object): CharacterData {
        return super.parse(data);
    }

    _parseName(data: any): string {
        return "";
    }

    _parseClass(data: any): string | null {
        return "";
    }

    _parseLevel(data: any): number {
        return 0;
    }

    _parseHitPoints(data: any): number {
        return 0;
    }

    _parseArmorClass(data: any): number {
        return 0;
    }

    _parseSpeed(data: any): number {
        return 0;
    }

    _parseImageUrl(data: any): string | null {
        return "";
    }

    _parseStrength(data: any): number {
        return 0;
    }

    _parseDexterity(data: any): number {
        return 0;
    }

    _parseConstitution(data: any): number {
        return 0;
    }

    _parseInteligence(data: any): number {
        return 0;
    }

    _parseWisdom(data: any): number {
        return 0;
    }

    _parseCharisma(data: any): number {
        return 0;
    }
}

class MonsterParser extends CharacterDataParser {
    parse(data: object): CharacterData {
        return super.parse(data);
    }

    _parseName(data: any): string {
        return data.name;
    }

    _parseClass(data: any): string | null {
        return null;
    }

    _parseLevel(data: any): number {
        return null;
    }

    _parseHitPoints(data: any): number {
        return data.averageHitPoints;
    }

    _parseArmorClass(data: any): number {
        return data.armorClass;
    }

    _parseSpeed(data: any): number {
        return data.movements.find(m => m.movementId == 1).speed;
    }

    _parseImageUrl(data: any): string | null {
        return data.largeAvatarUrl;
    }

    _parseStrength(data: any): number {
        return data.stats.find(s => s.statId == 1).value;
    }

    _parseDexterity(data: any): number {
        return data.stats.find(s => s.statId == 2).value;
    }

    _parseConstitution(data: any): number {
        return data.stats.find(s => s.statId == 3).value;
    }

    _parseInteligence(data: any): number {
        return data.stats.find(s => s.statId == 4).value;
    }

    _parseWisdom(data: any): number {
        return data.stats.find(s => s.statId == 5).value;
    }

    _parseCharisma(data: any): number {
        return data.stats.find(s => s.statId == 6).value;
    }
}

export function parseCharacterData(rawData: any, characterType: CharacterType): CharacterData {
    var parser: CharacterDataParser;
    switch (characterType) {
        case CharacterType.Player:
        case CharacterType.NPC: {
            parser = new PlayerParser();
            break;
        }

        case CharacterType.Monster: {
            parser = new MonsterParser();
            break;
        }
    }

    return parser.parse(rawData);
}