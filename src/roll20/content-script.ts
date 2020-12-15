import { extensionLog, handleCommonMessages } from "@common/utils";
import { CreateCharacterMessage, Message, MessageType } from "@common/message";
import { injectPageScript } from "@common/page";

function handleMessage(message: Message) {
    switch (message.type) {
        case MessageType.CreateCharacter: {
            // in order to perfom any persitent changes on Roll20 pages we need to have an access to
            // page's context that is unavailable in content scripts
            forwardToPage(message);
            break;
        }
        default: {
            extensionLog('unsupported message', message.constructor);
            break;
        }

    }
}

function forwardToPage(message: Message) {
    extensionLog('Forwarding message to page context...');
    window.postMessage(message, "*");
}

extensionLog("Roll20 module loaded.");

chrome.runtime.onMessage.addListener(handleCommonMessages);
chrome.runtime.onMessage.addListener(handleMessage);

injectPageScript(chrome.extension.getURL('roll20-script.js'));