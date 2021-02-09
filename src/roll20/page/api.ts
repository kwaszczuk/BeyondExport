import { CharacterIdType, Character, CharacterAttributes, isNPC } from "@typings/character";
import { getCampaign, Roll20Campaign, Roll20Character, Roll20CharacterAttribute } from "@typings/roll20";
import { getImageBlob, downloadImage } from "@common/image";
import { extensionLog, extensionError } from "@common/utils";

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

    extensionLog('Updating character avatar...');
    uploadImage(character.data.imageUrl).then(images => {
        r20Character.updateAvatar(images['med']);
        r20Character.save();
    }).catch(_ => {
        extensionError('Character avatar update failed...');
    });
}


function findAttrib(ch: Roll20Character, name: string): Roll20CharacterAttribute | null {
    return ch.attribs.find(a => a.attributes.name == name);
}

function setCharacterAttibutes(id: CharacterIdType, attr: CharacterAttributes) {

}

export function updateCharacter(characterId: CharacterIdType, character: Character) {

}

async function getImageId(): Promise<number> {
    const res = await fetch('https://app.roll20.net/image_library/reqimage', { method: 'POST' });
    return await res.json();
}

interface UploadInfo {
    base: string,
    additional: string
}

async function getUploadInfo(imageId: number, imageName: string, imageSize: number): Promise<UploadInfo> {
    let url = new URL(`https://app.roll20.net/image_library/s3putsign/${imageId}`);
    url.searchParams.append('name', imageName);
    url.searchParams.append('type', 'image/jpg');
    url.searchParams.append('size', `${imageSize}`);

    const res = await fetch(url.toString(), { method: 'POST' });
    return await res.json();
}

async function doUpload(uploadInfo: UploadInfo, blob: Blob) {
    await fetch(uploadInfo.base + uploadInfo.additional, {
        method: 'PUT',
        headers: {
            "Content-Type": 'image/jpg',
            "Cache-Control": "max-age=31104000,public",
            'x-amz-acl': 'public-read',
        },
        body: blob,
    });
}

const UPLOAD_SIZES: [string, number, number][] = [
    ['mini', 100, 100],
    ['thumb', 200, 200],
    ['med', 512, 512],
    ['max', 2048, 2048],
    ['original', 1e4, 1e4],
];

export async function uploadImage(url: string): Promise<any> {
    const [imageId, image] = await Promise.all([getImageId(), downloadImage(url)]);

    let uploadPromises: Promise<[string, string]>[] = [];
    for (let v of UPLOAD_SIZES) {
        uploadPromises.push(new Promise(async resolve => {
            const blob = await getImageBlob(image, { maxWidth: v[1], maxHeight: v[2] });
            const uploadInfo = await getUploadInfo(imageId, v[0], blob.size);
            await doUpload(uploadInfo, blob);
            resolve([v[0], uploadInfo.base]);
        }));
    }

    const results = await Promise.all(uploadPromises);
    return results.reduce((o, [key, value]) => {
        o[key] = value;
        return o;
    }, {});
}