const fs = require('fs')
const fetch2 = require('node-fetch')


async function main () {
    const weather24 = await fetch2('https://api.data.gov.sg/v1/environment/24-hour-weather-forecast')
    const weather2 = await fetch2('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast')
    const weather4 = await fetch2('https://api.data.gov.sg/v1/environment/4-day-weather-forecast')

    const result24 = await weather24.json()
    const result2Hour = await weather2.json()
    const result4Days = await weather4.json()

    fs.writeFileSync('./customize/result-24hour.js', `export const data24Hour = \n `+ JSON.stringify(result24, null, 2));
    fs.writeFileSync('./customize/result-2hour.js', `export const data2Hour = \n `+ JSON.stringify(result2Hour, null, 2));
    fs.writeFileSync('./customize/result-4days.js', `export const data4Days = \n `+ JSON.stringify(result4Days, null, 2));
}

main()