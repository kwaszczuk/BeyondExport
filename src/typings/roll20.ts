import Backbone from 'backbone'

// Properties of @window variable in Roll20 page.
export interface Roll20Window {
    is_gm: boolean
    Campaign: Roll20CampaignBase
}

export function getCampaign(): Roll20Campaign {
    return extend(window.Campaign, new Roll20CampaignExtended());
}

// Merge two objects of separate types, by creating a union of those types. 
// @extended prototypes and methods are always in the result object, even if they overwrite @base properties with exact same name.
// Overwritten properties are saved by prepending underscore to it's previous name.
// In the other hand, @extended non-prototype, non-method properties do not fall under this rule. They are included in the result
// only if the property with the same name does not exist in @base.
function extend<TBase, TExtended>(base: TBase, extended: TExtended): TBase & TExtended {
    let result = <TBase & TExtended>base;
    for (let key of Object.keys(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(extended)))) {
        if (key in (result as any)) {
            result[`_${key}`] = result[key];
            delete result[key];
        }
        Object.defineProperty(Object.getPrototypeOf(result), key, Object.getOwnPropertyDescriptor(Object.getPrototypeOf(extended), key));
    }
    for (let key of Object.keys(extended)) {
        if (typeof extended[key] === 'function') {
            result[`_${key}`] = result[key];
            result[key] = extended[key];
        }
        else if (!(key in (result as any))) {
            result[key] = extended[key];
        }
    }
    return result;
}

// Campaign variable properties on Roll20 page.
export type Roll20Campaign = Roll20CampaignBase & Roll20CampaignExtended

export class Roll20CampaignBase extends Backbone.Model {
    characters: Backbone.Collection<Roll20Character>
}

export class Roll20CampaignExtended extends Backbone.Model {
    // After extend, this will store old version of @characters property.
    private _characters: Backbone.Collection<Roll20CharacterBase>

    constructor() {
        super();
        this._characters = new Backbone.Collection(null);
    }

    get characters(): Backbone.Collection<Roll20Character> {
        let c: Backbone.Collection<Roll20Character> = this._characters as Backbone.Collection<Roll20Character>;

        c.models = this._characters.map((c) => extend(c, new Roll20CharacterExtended()));
        return c;
    }
}


// Character properties on Roll20 page.
export type Roll20Character = Roll20CharacterBase & Roll20CharacterExtended

interface Roll20CharacterBase extends Backbone.Model {
    attributes: {
        avatar: string,
        name: string
    }

    attribs: Backbone.Collection<Roll20CharacterAttribute>
}

class Roll20CharacterExtended extends Backbone.Model {
    attributes: {
        avatar: string,
        name: string
    }

    attribs: Backbone.Collection<Roll20CharacterAttribute>

    updateAttrib(name: string, current: any = "0", max: any = "0") {
        current = current.toString()
        max = max.toString()

        let attr: Roll20CharacterAttribute;
        if (attr = this.getAttrib(name)) {
            attr.set('current', current);
            attr.set('max', max);
        } else {
            this.attribs.add({ name, current, max });
        }
    }

    getAttrib(name: string): Roll20CharacterAttribute | null {
        return this.attribs.find(a => a.attributes.name == name);
    }

    removeAttrib(name: string) {
        let attr;
        if (attr = this.getAttrib(name)) {
            this.attribs.remove({ name });
        }
    }

    get name() {
        return this.get('name');
    }

    set name(name: string) {
        this.set({ name });
    }
}

export interface Roll20CharacterAttribute extends Backbone.Model {
    attributes: {
        name: string,
        current: string,
        max: string
    }
}