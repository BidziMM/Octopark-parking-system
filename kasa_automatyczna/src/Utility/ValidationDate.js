export function validateDate(date){
    const maxDate = [0,31,29,31,30,31,30,31,31,30,31,30,31]
    const day = parseInt(date.day)
    const month = parseInt(date.month)
    const year = parseInt(date.year)
    if(month > 12 || month <= 0 || date.month === ""){
        return "Invalid date"
    }
    if(day > maxDate[month] || day <= 0 || day > 31 || date.day === ""){
        return "Invalid date"
    }
    if(year < new Date().getFullYear() || date.year === ""){
        return "Invalid date"
    }
    const leapYear = (year % 400 === 0)
        || (year % 4 === 0 && year % 100 !== 0)
    
    if(month === 2 && !leapYear && day > 28){
        return "Invalid date"
    }
    return ""
}