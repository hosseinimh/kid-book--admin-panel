import { STORIES_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class Story extends Entity {
    constructor() {
        super();
    }

    async paginate(storyCategoryId, _pn = 1, _pi = 10) {
        return await this.handlePost(
            API_URLS.FETCH_STORIES + "/" + storyCategoryId,
            {
                _pn,
                _pi,
            }
        );
    }

    async get(id) {
        return await this.handlePost(API_URLS.FETCH_STORY + "/" + id);
    }

    async store(storyCategoryId, title, authorId, translatorId, speakerId) {
        return await this.handlePost(
            API_URLS.STORE_STORY + "/" + storyCategoryId,
            {
                title,
                author_id: authorId,
                translator_id: translatorId,
                speaker_id: speakerId,
            }
        );
    }

    async update(id, title) {
        return await this.handlePost(API_URLS.UPDATE_STORY + "/" + id, {
            title,
        });
    }
}
