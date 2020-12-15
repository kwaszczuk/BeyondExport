import { extensionLog, sendMessage } from "@common/utils";
import { LogMessage, Message, TestMessage, MessageReceiver, MessageType, CreateCharacterMessage, ExportCharacterMessage } from "@common/message";
import { getCharacter } from "@common/character"
import { Character } from "@typings/character";

function logToAllTabs() {
    switch (x % 2) {
        case 0: {
            sendMessage(MessageReceiver.AnyPage, new LogMessage("Hello from extension :)"));
            break;
        }
        case 1: {
            sendMessage(MessageReceiver.AnyPage, new TestMessage());
            break;
        }
    }
    x += 1;
}

function handleMessage(message: Message) {
    switch (message.type) {
        case MessageType.ExportCharacter: {
            const msg: ExportCharacterMessage = message;
            const { id, type } = msg.content.character;
            extensionLog(`Exporting character ${id}:${type}...`);

            getCharacter(id, type).then((character: Character) => {
                sendMessage(MessageReceiver.Roll20, new CreateCharacterMessage(character));
            });
            break;
        }
        default: {
            extensionLog('unsupported message', message.constructor);
            break;
        }

    }
}

let x = 0;
chrome.browserAction.onClicked.addListener(logToAllTabs);
chrome.runtime.onMessage.addListener(handleMessage);