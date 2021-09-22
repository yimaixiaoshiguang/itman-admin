import moment from 'moment'

/**
* 转换date过滤器
* 入参：filtersParams.value
* 返回value
*/
export function GetDateTimeValue(selectedDate, dataFormat) {
    console.log(moment().startOf('day'))
    const today = moment().startOf('day').format(dataFormat)
    const todayEnd = moment().endOf('day').format(dataFormat)
    const yesterday = moment().startOf('day').subtract(1, 'days').format(dataFormat)
    const yesterdayEnd = moment().endOf('day').subtract(1, 'days').format(dataFormat)

    let value = []

    if (selectedDate === 'today') {
        value = [today, todayEnd]
    } else if (selectedDate === 'yesterday') {
        value = [yesterday, yesterdayEnd]
    } else if (selectedDate === '7') { // 最近7天
        value = [moment().subtract(7, 'days').format(dataFormat), todayEnd]
    } else if (selectedDate === '30') { // 最近30天
        value = [moment().subtract(30, 'days').format(dataFormat), todayEnd]
    } else if (selectedDate === '90') {
        value = [moment().subtract(90, 'days').format(dataFormat), todayEnd]
    } else if (selectedDate === '365') {
        value = [moment().subtract(365, 'days').format(dataFormat), todayEnd]
    } else if (selectedDate === 'week') { // 本周
        value = [moment().startOf('week').format(dataFormat), moment().endOf('week').format(dataFormat)]
    } else if (selectedDate === 'month') { // 本月
        value = [moment().startOf('month').format(dataFormat), moment().endOf('month').format(dataFormat)]
    } else if (selectedDate === 'quarter') { // 本季
        value = [moment().startOf('quarter').format(dataFormat), moment().endOf('quarter').format(dataFormat)]
    } else if (selectedDate === 'year') { // 本年
        value = [moment().startOf('year').format(dataFormat), moment().endOf('year').format(dataFormat)]
    } else {
        value = []
    }

    return value
}
