export function formateDay(datStr:string) {
    const date = new Date(datStr)
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`
    }
export function formateTime(datStr:string) {
    const date = new Date(datStr)
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    }