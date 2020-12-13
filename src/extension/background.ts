import { extensionLog, LogMessage, Message, MessageType, TestMessage, MessageReceiver, sendMessage, CreateCharacterMessage } from "@common/utils";
import { getCharacter, Character } from "@common/character/";

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
            const { id, type } = message.content.character;
            extensionLog(`Exporting character ${id}:${type}...`);

            getCharacter(id, type).then((character: Character) => {
                sendMessage(MessageReceiver.Roll20, new CreateCharacterMessage(character));
            });
            break;
        }
        default: {
            extensionLog('unsupported message', message.type);
            break;
        }

    }
}

let x = 0;
chrome.browserAction.onClicked.addListener(logToAllTabs);
chrome.runtime.onMessage.addListener(handleMessage);