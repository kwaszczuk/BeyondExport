import { addButton } from "@common/page";
import { extensionLog, handleCommonMessages, sendMessage } from "@common/utils";
import { ExportCharacterMessage, MessageReceiver } from "@common/message";
import { CharacterType, CharacterIdType } from "@typings/character";

extensionLog("D&D Beyond Monster module loaded.")

function exportMonster() {
    let id: CharacterIdType = getCharacterId();

    extensionLog(`Exporting monster ${id}...`);

    sendMessage(MessageReceiver.Background, new ExportCharacterMessage(id, CharacterType.Monster));
}

function getCharacterId(): CharacterIdType {
    return parseInt($('[data-entity-id]').attr('data-entity-id'));
}

// Add export button next to monster's name.
addButton('.page-heading__suffix', 'Export to Roll20', exportMonster);

chrome.runtime.onMessage.addListener(handleCommonMessages);