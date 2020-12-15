import { Character, CharacterIdType, CharacterType } from "@typings/character";

export abstract class Message {
    type: MessageType;
    content: any;

    constructor(type: MessageType, content: object) {
        this.type = type;
        this.content = content;
    }
}

export class ExportCharacterMessage extends Message {
    content: {
        character: {
            id: CharacterIdType,
            type: CharacterType
        }
    }

    constructor(id: CharacterIdType, type: CharacterType) {
        super(MessageType.ExportCharacter, { character: { id, type } });
    }
}

export class CreateCharacterMessage extends Message {
    content: {
        character: Character
    }

    constructor(character: Character) {
        super(MessageType.CreateCharacter, { character });
    }
}

export class LogMessage extends Message {
    content: {
        logText: string
    }

    constructor(logText: string) {
        super(MessageType.Log, { logText });
    }
}

export class TestMessage extends Message {
    constructor() {
        super(MessageType.Test, {});
    }
}

export enum MessageType {
    Log,
    Test,
    ExportCharacter,
    CreateCharacter,
    UpdateCharacter,
    SyncCharacter
}

export enum MessageReceiver {
    Roll20,
    DDBMonster,
    DDBCharacter,
    Background,
    AnyPage,
}
