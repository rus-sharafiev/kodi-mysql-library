String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this as string, 10)
    var hours: number | string = Math.floor(sec_num / 3600)
    var minutes: number | string = Math.floor((sec_num - (hours * 3600)) / 60)
    var seconds: number | string = sec_num - (hours * 3600) - (minutes * 60)

    if (hours < 10)
        hours = "0" + hours
    if (minutes < 10)
        minutes = "0" + minutes
    if (seconds < 10)
        seconds = "0" + seconds

    return hours + ':' + minutes + ':' + seconds
}

Number.prototype.declination = function (titles: string[]) {
    const number = this as number

    const decCache: number[] = []
    const decCases = [2, 0, 1, 1, 1, 2]

    if (!decCache[number])
        decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)]

    return titles[decCache[number]]
}