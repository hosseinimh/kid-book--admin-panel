import { STORY_ITEMS_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class StoryItem extends Entity {
    constructor() {
        super();
    }

    async getAll(storyId) {
        return await this.handlePost(
            API_URLS.FETCH_STORY_ITEMS + "/" + storyId
        );
    }

    async get(id) {
        return await this.handlePost(API_URLS.FETCH_STORY_ITEM + "/" + id);
    }

    async store(storyId, type, content) {
        return await this.handlePost(
            API_URLS.STORE_STORY_ITEM + "/" + storyId,
            {
                type,
                content,
            }
        );
    }

    async update(id, content) {
        return await this.handlePost(API_URLS.UPDATE_STORY_ITEM + "/" + id, {
            content,
        });
    }

    async incrementPriority(id) {
        return await this.handlePost(API_URLS.INCREMENT_PRIORITY + "/" + id);
    }

    async decrementPriority(id) {
        return await this.handlePost(API_URLS.DECREMENT_PRIORITY + "/" + id);
    }
}
