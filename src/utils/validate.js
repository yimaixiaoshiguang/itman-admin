/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */

export function validUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {date} date
 * @param {string} fmt
 * @returns {string}
 */
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}

// 去掉日期数据中的T和Z
export function formatTime(time) {
    var date = new Date(+new Date(time)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return date
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
    return /^1[0-9]{10}$/.test(s)
}

/**
 * 是否中文
 * @param {*} s
 * @returns
 */
export function isChinese(s) {
    return /[\u4e00-\u9fa5]+$/.test(s)
}
