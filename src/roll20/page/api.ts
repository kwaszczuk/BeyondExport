import { CharacterIdType, Character, CharacterAttributes, isNPC } from "@typings/character";
import { getCampaign, Roll20Campaign, Roll20Character, Roll20CharacterAttribute } from "@typings/roll20";

export function getCharacter(id: CharacterIdType): Roll20Character | null {
    return getCampaign().characters.find(
        c => c.getAttrib("ddb_id")?.attributes.current == id.toString()
    );
}

export function createCharacter(character: Character) {
    $('#addnewcharacter')[0].click();
    $('.ui-icon-closethick').trigger('click');
    $('.ui-icon-closethick').trigger('click');

    const r20Campaign: Roll20Campaign = getCampaign();
    const r20Character: Roll20Character = r20Campaign.characters.last();

    r20Character.name = character.data.name;

    r20Character.updateAttrib('ddb_id', character.id);
    r20Character.updateAttrib('hp', character.data.hitPoints, character.data.hitPoints);
    r20Character.updateAttrib('strength_base', character.data.attributes.strength);
    r20Character.updateAttrib('dexterity_base', character.data.attributes.dexterity);
    r20Character.updateAttrib('constitution_base', character.data.attributes.constitution);
    r20Character.updateAttrib('inteligence_base', character.data.attributes.inteligence);
    r20Character.updateAttrib('wisdom_base', character.data.attributes.wisdom);
    r20Character.updateAttrib('charisma_base', character.data.attributes.charisma);
    if (isNPC(character)) {
        r20Character.updateAttrib('npc', '1');
        r20Character.updateAttrib('npc_ac', character.data.armorClass);
        r20Character.updateAttrib('npc_speed', character.data.speed);
    } else {
        r20Character.updateAttrib('npc', '0');
        r20Character.updateAttrib('ac', character.data.armorClass);
        r20Character.updateAttrib('speed', character.data.speed);
    }

    r20Character.save();
}


function findAttrib(ch: Roll20Character, name: string): Roll20CharacterAttribute | null {
    return ch.attribs.find(a => a.attributes.name == name);
}

function setCharacterAttibutes(id: CharacterIdType, attr: CharacterAttributes) {

}

export function updateCharacter(characterId: CharacterIdType, character: Character) {

}