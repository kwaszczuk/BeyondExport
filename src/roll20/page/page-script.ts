import { extensionLog } from '@common/utils'
import { CreateCharacterMessage, Message, MessageType } from '@common/message'
import { } from './global-roll20-window'
import { createCharacter } from './api'

function handleMessage(ev: MessageEvent) {
    if (ev.source != window) {
        return;
    }

    const message: Message = ev.data;
    switch (message.type) {
        case MessageType.CreateCharacter: {
            extensionLog('Got CreateCharacterMessage', message);
            const msg: CreateCharacterMessage = message;
            createCharacter(msg.content.character);
            break;
        }

        default: {
            extensionLog('unsupported message', message.constructor);
        }
    }
}

window.addEventListener("message", handleMessage);