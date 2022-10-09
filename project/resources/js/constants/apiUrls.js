const serverConfig = require("../../../server-config.json");
const { baseUrl } = serverConfig;

export const SERVER_URL = `${baseUrl}/api`;

export const DASHBOARD_API_URLS = {
    FETCH_REVIEW: `${SERVER_URL}/dashboard/review`,
};

export const USERS_API_URLS = {
    LOGIN: `${SERVER_URL}/users/login`,
    LOGOUT: `${SERVER_URL}/users/logout`,
    FETCH_USER: `${SERVER_URL}/users/show`,
    FETCH_USERS: `${SERVER_URL}/users`,
    UPDATE_USER: `${SERVER_URL}/users/update`,
    CHANGE_PASSWORD: `${SERVER_URL}/users/change_password`,
};

export const STORY_CATEGORIES_API_URLS = {
    FETCH_STORY_CATEGORY: `${SERVER_URL}/story_categories/show`,
    FETCH_STORY_CATEGORIES: `${SERVER_URL}/story_categories`,
    STORE_STORY_CATEGORY: `${SERVER_URL}/story_categories/store`,
    UPDATE_STORY_CATEGORY: `${SERVER_URL}/story_categories/update`,
};

export const STORIES_API_URLS = {
    FETCH_STORY: `${SERVER_URL}/stories/show`,
    FETCH_STORIES: `${SERVER_URL}/stories`,
    STORE_STORY: `${SERVER_URL}/stories/store`,
    UPDATE_STORY: `${SERVER_URL}/stories/update`,
};

export const STORY_ITEMS_API_URLS = {
    FETCH_STORY_ITEM: `${SERVER_URL}/story_items/show`,
    FETCH_STORY_ITEMS: `${SERVER_URL}/story_items`,
    STORE_STORY_ITEM: `${SERVER_URL}/story_items/store`,
    UPDATE_STORY_ITEM: `${SERVER_URL}/story_items/update`,
    INCREMENT_PRIORITY: `${SERVER_URL}/story_items/increment_priority`,
    DECREMENT_PRIORITY: `${SERVER_URL}/story_items/decrement_priority`,
};

export const AUTHORS_API_URLS = {
    FETCH_AUTHOR: `${SERVER_URL}/authors/show`,
    FETCH_AUTHORS: `${SERVER_URL}/authors`,
    STORE_AUTHOR: `${SERVER_URL}/authors/store`,
    UPDATE_AUTHOR: `${SERVER_URL}/authors/update`,
};

export const TRANSLATORS_API_URLS = {
    FETCH_TRANSLATOR: `${SERVER_URL}/translators/show`,
    FETCH_TRANSLATORS: `${SERVER_URL}/translators`,
    STORE_TRANSLATOR: `${SERVER_URL}/translators/store`,
    UPDATE_TRANSLATOR: `${SERVER_URL}/translators/update`,
};

export const SPEAKERS_API_URLS = {
    FETCH_SPEAKER: `${SERVER_URL}/speakers/show`,
    FETCH_SPEAKERS: `${SERVER_URL}/speakers`,
    STORE_SPEAKER: `${SERVER_URL}/speakers/store`,
    UPDATE_SPEAKER: `${SERVER_URL}/speakers/update`,
};
