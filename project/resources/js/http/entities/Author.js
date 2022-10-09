import { AUTHORS_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class Author extends Entity {
    constructor() {
        super();
    }

    async paginate(_pn = 1, _pi = 10) {
        return await this.handlePost(API_URLS.FETCH_AUTHORS, {
            _pn,
            _pi,
        });
    }

    async get(id) {
        return await this.handlePost(API_URLS.FETCH_AUTHOR + "/" + id);
    }

    async store(name, family, description) {
        return await this.handlePost(API_URLS.STORE_AUTHOR, {
            name,
            family,
            description,
        });
    }

    async update(id, name, family, description) {
        return await this.handlePost(API_URLS.UPDATE_AUTHOR + "/" + id, {
            name,
            family,
            description,
        });
    }
}
