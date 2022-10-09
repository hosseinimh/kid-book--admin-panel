<?php

namespace App\Constants;

require_once __DIR__ . '/../../server-config.php';

abstract class Theme
{
    const BASE_URL = BASE_URL;
    const PANEL_PATH = '/panel';
    const LOGIN_URL = self::PANEL_PATH . '/users/login';
    const CSS_PATH = '/assets/css';
    const IMG_PATH = '/assets/img';
    const ICONS_PATH = '/assets/icons';
    const FAVICONS_PATH = '/assets/favicon';
    const JS_PATH = '/assets/js';
    const FONTS_PATH = '/assets/fonts';
    const VENDORS_PATH = '/assets/vendors';
    const ITEMS_PER_PAGE = 10;
}
