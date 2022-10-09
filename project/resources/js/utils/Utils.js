var CryptoJS = require("crypto-js");

function isValidMobile(value) {
    const prefix = [
        "0910",
        "0911",
        "0912",
        "0913",
        "0914",
        "0915",
        "0916",
        "0917",
        "0918",
        "0919",
        "0991",
        "0992",
        "0993",
        "0994",
    ];

    let valuePrefix,
        i,
        length = prefix.length;

    value = value.trim();

    if (isNaN(value) || value.length !== 11) return false;

    valuePrefix = value.substr(0, 4);

    for (i = 0; i < length; i++) {
        if (valuePrefix === prefix[i]) return true;
    }

    return false;
}

function isValidEmail(value) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
    if (value === "" || isValidEmail(value)) setEmailError("");
    else setEmailError("Invalid Email");
}

function validateMobile(value, setMobileError) {
    if (value === "" || isValidMobile(value)) setMobileError("");
    else setMobileError("Invalid Mobile number");
}

function validatePassword(value, setPasswordError) {
    if (value.length < 9) setPasswordError("Password must be 9 characters");
    else setPasswordError("");
}

function isJsonString(str) {
    try {
        str = JSON.stringify(str);
        str = str
            .replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f");
        str = str.replace(/[\u0000-\u0019]+/g, "");
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function parseJwt(token) {
    try {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
}

function clearLS() {
    localStorage.removeItem("user");
}

//get localStorage variable
const getLSVariable = (key) => {
    try {
        const text = localStorage.getItem(key);

        if (!text) return null;

        const bytes = CryptoJS.AES.decrypt(text, "kloos");
        const value = bytes.toString(CryptoJS.enc.Utf8);

        return value;
    } catch (error) {
        return null;
    }
};

const setLSVariable = (key, value) => {
    try {
        const text = CryptoJS.AES.encrypt(value, "kloos").toString();

        localStorage.setItem(key, text);
    } catch (error) {}
};

const getLSToken = () => {
    const token = getLSVariable("token");

    if (!token) {
        clearLS();

        return null;
    }

    const decodedToken = parseJwt(token);

    if (!decodedToken) {
        clearLS();

        return null;
    }

    return token;
};

const getLSUser = () => {
    let user = getLSVariable("user");

    if (!user) {
        clearLS();

        return null;
    }

    try {
        user = JSON.parse(user);
    } catch {
        clearLS();

        return null;
    }

    return user;
};

const convertNumberToPersion = () => {
    let persian = {
        0: "۰",
        1: "۱",
        2: "۲",
        3: "۳",
        4: "۴",
        5: "۵",
        6: "۶",
        7: "۷",
        8: "۸",
        9: "۹",
    };

    function traverse(el) {
        if (el.nodeType === 3) {
            var list = el.data.match(/[0-9]/g);

            if (list !== null && list.length !== 0) {
                for (var i = 0; i < list.length; i++)
                    el.data = el.data.replace(list[i], persian[list[i]]);
            }
        }

        for (var i = 0; i < el.childNodes.length; i++) {
            traverse(el.childNodes[i]);
        }
    }

    traverse(document.body);
};

const convertNumberToEnglish = (s) =>
    s?.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

const en2faDigits = (s) =>
    s
        ?.toString()
        .replace(/[0-9]/g, (w) =>
            String.fromCharCode(w.charCodeAt(0) + 1728)
        ) ?? "";

const addCommas = (num) =>
    num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const addCommasPersian = (num) =>
    en2faDigits(num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

const removeNonNumeric = (num) => num?.toString().replace(/[^0-9]/g, "");

const digitInputChange = (setValue, field, event) => {
    setValue(field, addCommas(removeNonNumeric(event.target.value)));
};

const jalaliToGregorian = (jDate) => {
    let parts = jDate.split("/");
    let jy = parseInt(parts[0]);
    let jm = parseInt(parts[1]);
    let jd = parseInt(parts[2]);
    jy += 1595;
    let days =
        -355668 +
        365 * jy +
        Math.floor(jy / 33) * 8 +
        Math.floor(((jy % 33) + 3) / 4) +
        jd +
        (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
    let gy = 400 * Math.floor(days / 146097);
    days %= 146097;

    if (days > 36524) {
        gy += 100 * Math.floor(--days / 36524);
        days %= 36524;

        if (days >= 365) days++;
    }

    gy += 4 * Math.floor(days / 1461);
    days %= 1461;

    if (days > 365) {
        gy += Math.floor((days - 1) / 365);
        days = (days - 1) % 365;
    }

    let gd = days + 1;
    let sal_a = [
        0,
        31,
        (gy % 4 == 0 && gy % 100 != 0) || gy % 400 == 0 ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];
    let gm = 0;

    for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) gd -= sal_a[gm];

    return [gy, gm, gd];
};

function wordifyfa(input, level) {
    if (level === void 0) {
        level = 0;
    }
    if (input === null) {
        return "";
    }
    var num = parseInt(toEnglishDigits(input));
    if (num < 0) {
        num = num * -1;
        return "منفی " + wordifyfa(num, level);
    }
    if (num === 0) {
        if (level === 0) {
            return "صفر";
        } else {
            return "";
        }
    }
    var result = "";
    var yekan = ["یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"],
        dahgan = ["بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"],
        sadgan = [
            "یکصد",
            "دویست",
            "سیصد",
            "چهارصد",
            "پانصد",
            "ششصد",
            "هفتصد",
            "هشتصد",
            "نهصد",
        ],
        dah = [
            "ده",
            "یازده",
            "دوازده",
            "سیزده",
            "چهارده",
            "پانزده",
            "شانزده",
            "هفده",
            "هیجده",
            "نوزده",
        ];
    if (level > 0) {
        result += " و ";
        level -= 1;
    }
    if (num < 10) {
        result += yekan[num - 1];
    } else if (num < 20) {
        result += dah[num - 10];
    } else if (num < 100) {
        result +=
            dahgan[Math.floor(num / 10) - 2] + wordifyfa(num % 10, level + 1);
    } else if (num < 1000) {
        result +=
            sadgan[Math.floor(num / 100) - 1] + wordifyfa(num % 100, level + 1);
    } else if (num < 1000000) {
        result +=
            wordifyfa(Math.floor(num / 1000), level) +
            " هزار" +
            wordifyfa(num % 1000, level + 1);
    } else if (num < 1000000000) {
        result +=
            wordifyfa(Math.floor(num / 1000000), level) +
            " میلیون" +
            wordifyfa(num % 1000000, level + 1);
    } else if (num < 1000000000000) {
        result +=
            wordifyfa(Math.floor(num / 1000000000), level) +
            " میلیارد" +
            wordifyfa(num % 1000000000, level + 1);
    } else if (num < 1000000000000000) {
        result +=
            wordifyfa(Math.floor(num / 1000000000000), level) +
            " تریلیارد" +
            wordifyfa(num % 1000000000000, level + 1);
    }
    return result;
}

function toEnglishDigits(num) {
    if (num === null || num === undefined) {
        return null;
    }
    if (typeof num !== "string" || num.length === 0) return num.toString();
    var faDigits = "۰۱۲۳۴۵۶۷۸۹";
    var arDigits = "٠١٢٣٤٥٦٧٨٩";
    var output = "";
    for (var ipos = 0; ipos < num.length; ipos++) {
        var faIndex = faDigits.indexOf(num[ipos]);
        if (faIndex >= 0) {
            output += faIndex.toString();
            continue;
        }
        var arIndex = arDigits.indexOf(num[ipos]);
        if (arIndex >= 0) {
            output += arIndex.toString();
            continue;
        }
        output += num[ipos];
    }
    return output.replace(/,/g, "");
}

const utils = {
    isValidMobile,
    validateMobile,
    isValidEmail,
    validateEmail,
    validatePassword,
    isJsonString,
    getLSVariable,
    setLSVariable,
    getLSToken,
    getLSUser,
    clearLS,
    convertNumberToPersion,
    convertNumberToEnglish,
    en2faDigits,
    digitInputChange,
    addCommas,
    addCommasPersian,
    removeNonNumeric,
    jalaliToGregorian,
    wordifyfa,
};

export default utils;
