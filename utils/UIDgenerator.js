export function generateUUID(activadores) {

    let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    let aleatorio = Math.floor((Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000);
    let str = aleatorio.toString().split('').map(i => i != 4 && i != 5 && i != 5 ? arr[i] : i)
    
    var uuid = 'xxxxxxxxxx'.replace(/[x]/g, function (c, i) {
        return c == 'x' &&  i !== 3 &&  i !== 7 ? str[i] : `-${i}`
     })

    if (activadores[uuid] !== undefined) { 
        console.log('volviendo a generar')
        return generateUUID(activadores)
    } else {
        return uuid
    }
}
