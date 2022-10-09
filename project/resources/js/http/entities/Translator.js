import { TRANSLATORS_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class Translator extends Entity {
    constructor() {
        super();
    }

    async paginate(_pn = 1, _pi = 10) {
        return await this.handlePost(API_URLS.FETCH_TRANSLATORS, {
            _pn,
            _pi,
        });
    }

    async get(id) {
        return await this.handlePost(API_URLS.FETCH_TRANSLATOR + "/" + id);
    }

    async store(name, family, description) {
        return await this.handlePost(API_URLS.STORE_TRANSLATOR, {
            name,
            family,
            description,
        });
    }

    async update(id, name, family, description) {
        return await this.handlePost(API_URLS.UPDATE_TRANSLATOR + "/" + id, {
            name,
            family,
            description,
        });
    }
}
