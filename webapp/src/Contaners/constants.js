import moment from 'moment';


export const iconColor = {
    selected: "#33A3F4",
    notSelected: "#949494"
}

export const current = ()=>{
    const today = moment().day()
    console.log(today)
    const totalDays = moment().daysInMonth()
    const percent = today / totalDays * 100
    console.log(percent)
    return percent.toFixed(2)
}

console.log(current())