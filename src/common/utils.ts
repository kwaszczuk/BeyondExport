import { MessageReceiver, Message, MessageType } from '@common/message'

const EXTENSION_LOG_TITLE = 'BeyondExport:';
export function extensionLog(...args) {
    console.log(EXTENSION_LOG_TITLE, ...args);
}

export function extensionError(...args) {
    console.error(EXTENSION_LOG_TITLE, ...args);
}

const ROLL20_URL = "*://app.roll20.net/editor/";
const DDB_MONSTER_URL = "*://*.dndbeyond.com/monsters/*";
const DDB_CHARACTER_URL = "*://*.dndbeyond.com/characters/*";
export function sendMessage(receiver: MessageReceiver, message: Message) {
    switch (receiver) {
        case MessageReceiver.Roll20: {
            sendMessageToPages(message, { url: ROLL20_URL });
            break;
        }

        case MessageReceiver.DDBMonster: {
            sendMessageToPages(message, { url: DDB_MONSTER_URL });
            break;
        }

        case MessageReceiver.DDBCharacter: {
            sendMessageToPages(message, { url: DDB_CHARACTER_URL });
            break;
        }

        case MessageReceiver.Background: {
            sendMessageToBackground(message);
            break;
        }

        case MessageReceiver.AnyPage: {
            sendMessageToPages(message);
            break;
        }
    }

}

function sendMessageToPages(message: Message, filter: object = {}) {
    chrome.tabs.query(filter, function (tabs) {
        for (let tab of tabs) {
            chrome.tabs.sendMessage(tab.id, message);
        }
    });

}

function sendMessageToBackground(message: Message) {
    chrome.runtime.sendMessage(message);
}

export function handleCommonMessages(message: Message) {
    switch (message.type) {
        case MessageType.Log: {
            console.log(message.content.logText);
            break;
        }
        case MessageType.Test: {
            console.log("Test message");
            break;
        }
    }
}