export type Character = {
    id: CharacterIdType,
    data: CharacterData,
    type: CharacterType
}

export type CharacterIdType = number;

export type CharacterData = {
    name: string;
    class?: string;
    level?: number;
    hitPoints: number;
    armorClass: number;
    speed: number;
    imageUrl?: string;
    attributes: {
        strength: number;
        dexterity: number;
        constitution: number;
        inteligence: number;
        wisdom: number;
        charisma: number;
    }
}

export enum CharacterType {
    Player,
    NPC,
    Monster
}