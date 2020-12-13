import { extensionLog, handleCommonMessages, Message, MessageType } from "@common/utils";
import { Character } from "@common/character/"

function handleMessage(message: Message) {
    switch (message.type) {
        case MessageType.CreateCharacter: {
            const character: Character = message.content.character;
            extensionLog('Creating character...', character);
            break;
        }
        default: {
            extensionLog('unsupported message', message.type);
            break;
        }

    }
}

extensionLog("Roll20 module loaded.")

chrome.runtime.onMessage.addListener(handleCommonMessages);
chrome.runtime.onMessage.addListener(handleMessage);