export function isValidNumber(text:string):boolean{
    var number = Number(text.trim())
    return !isNaN(number)
}