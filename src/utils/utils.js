// list 转成树形json
export function listToTree(list, parentId) {
    const ret = []
    for (const i in list) {
        if (list[i].parentId === parentId) {
            const leftList = list.filter(l => l.id !== list[i].id)
            list[i].children = listToTree(leftList, list[i].id)
            ret.push(list[i])
        }
    }
    return ret
}

export function treeToList(treeList, res) {
    // const res = []
    treeList.forEach(item => {
        if (item.children.length > 0) {
            res.concat(treeToList(item.children, res))
        }

        res.push(item)
    })

    return res
}

// 判断一维数组是否存在重复数据
export function arrRepeat(arr) {
    let repeat = false

    var tempArr = new Array()

    for (let i = 0;i < arr.length;i++) {
        if (tempArr[arr[i]]) {
            repeat = true
            break
        }

        tempArr[arr[i]] = true
    }

    return repeat

}

/**
 * var arr = [
            {
                name:'root',
                user_name:'root',
                id:1
            },
            {
                name:'123',
                user_name:'123',
                id:2
            }
        ]
 *  转成 arr = [
	 {key:name,value:[root,123]}
	 ...
 ]
 */
export function arrToJson(arr) {
    if (arr.length == 0) {
        return []
    }

    let arrValue = []
    arr.forEach((jsonItem, index) => {

        if (index == 0) {
            Object.keys(jsonItem).forEach(key => {
                let temp = {}
                temp.key = key
                temp.value = [],
                temp.value.push(jsonItem[key])
                arrValue.push(temp)
            })
        } else {
            arrValue.forEach(arrItem => {
                arrItem.value.push(jsonItem[arrItem.key])
            })
        }

    })

    return arrValue
}

/**
 * 寻找不满足条件的父节点
 * @param {*} parent  父节点数组
 * @param {*} key     匹配的key 字符串
 * @param {*} children  children的字符串
 * @param {*} allArray  对比的数组
 * @param {*} notExistent  不存在的数组
 * @param {*} type    寻找的方式
 * @returns
 */

export function filterNotExistent(parent, key, children, allArray, notExistent, type) {
    // console.log(parent);
    allArray = JSON.parse(JSON.stringify(allArray))
    if (type == 'down') { // 向下寻找
        if (parent[children] && parent[children].length > 0) {

            parent[children].forEach(item => {
                item.parent = parent
                return filterNotExistent(item, key, children, allArray, notExistent, 'down')
            })
        }

        if (allArray.indexOf(parent[key]) == -1) { // 不存在
            notExistent.push(parent.parent[key])
            return filterNotExistent(parent.parent, key, children, allArray, notExistent, 'up')
        }
    } else { // 向上寻找
        if (parent.parent) {
            notExistent.push(parent.parent[key])
            return filterNotExistent(parent.parent, key, children, allArray, notExistent, 'up')
        }
    }

    return notExistent
}

export function isJson(obj) {
    var isjson = typeof (obj) == 'object' && Object.prototype.toString.call(obj).toLowerCase() == '[object object]' && !obj.length
    return isjson
}

export function isArray(arr) {
    var isarray = typeof (arr) === Array && arr.length > 0
    return isarray
}
