import moment from 'moment';


const dateFormat = "YYYY-MM-DD"

const startOfWeek = moment().startOf("week").add(1, "days").format(dateFormat)
const endOfWeek = moment().endOf("week").add(1, "days").format(dateFormat)

export const startOfToday = moment().startOf("day").format(dateFormat)
const endOfToday = moment().endOf("day").format(dateFormat)

export const startOfMonth = moment().startOf("month").subtract(1, "month").format(dateFormat)
export const startOfYear = moment().startOf("year").format(dateFormat)

const endOfMonth = moment().endOf("month").format(dateFormat)

const recent7Days = moment().subtract(6, "days").format(dateFormat)
// const startOfQuarter = moment().startOf("quarter").format(dateFormat)
// const endOfQuarter = moment().endOf("quarter").format(dateFormat)
export const dateTypes = [
    {name: "日", key: "day", startTime: recent7Days, endTime: endOfToday, titles: ["今日收入", "昨日收入"]},
    {name: "周", key: "week", startTime: startOfMonth, endTime: startOfToday, titles: ['本周收入', "上周收入"]},
    {name: "月", key: "month", startTime: startOfYear, endTime: startOfToday, titles: ['本月收入', "上月收入"]},
    // {name: "季度", key: "quarter", startTime: startOfQuarter, endTime: endOfQuarter}
]

export const iconColor = {
    selected: "#33A3F4",
    notSelected: "#949494"
}

export const current = () => {
    const today = moment().day()
    const totalDays = moment().daysInMonth()
    const percent = today / totalDays * 100
    return percent.toFixed(2)
}
