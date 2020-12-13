import { addButton } from "@common/page";
import { extensionLog, ExportCharacterMessage, handleCommonMessages, sendMessage, MessageReceiver } from "@common/utils";
import { CharacterType, CharacterIdType } from "@common/character/";

extensionLog("D&D Beyond Monster module loaded.")

function exportMonster() {
    let id: CharacterIdType = getCharacterId();

    extensionLog(`Exporting monster ${id}...`);

    sendMessage(MessageReceiver.Background, new ExportCharacterMessage(id, CharacterType.Monster));
}

function getCharacterId(): CharacterIdType {
    return parseInt($('[data-entity-id]').attr('data-entity-id'));
}

addButton('.page-heading__suffix', 'Export to Roll20', exportMonster);

chrome.runtime.onMessage.addListener(handleCommonMessages);