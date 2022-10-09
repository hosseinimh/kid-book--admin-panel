import { STORY_CATEGORIES_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class StoryCategory extends Entity {
    constructor() {
        super();
    }

    async paginate(_pn = 1, _pi = 10) {
        return await this.handlePost(API_URLS.FETCH_STORY_CATEGORIES, {
            _pn,
            _pi,
        });
    }

    async get(id) {
        return await this.handlePost(API_URLS.FETCH_STORY_CATEGORY + "/" + id);
    }

    async store(title) {
        return await this.handlePost(API_URLS.STORE_STORY_CATEGORY, {
            title,
        });
    }

    async update(id, title) {
        return await this.handlePost(
            API_URLS.UPDATE_STORY_CATEGORY + "/" + id,
            {
                title,
            }
        );
    }
}
