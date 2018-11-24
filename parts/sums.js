
/**
 * Stolen from: https://stackoverflow.com/a/9763769
 * @param {Number} s Milliseconds
 * @returns {String} hh:mm:ss
 */
function msToTime(s) {
    // Pad to 2 or 3 digits, default is 2
    const pad = (n, z = 2) => ('00' + n).slice(-z)
    return pad(s / 3.6e6 | 0) + ':' + pad((s % 3.6e6) / 6e4 | 0) + ':' + pad((s % 6e4) / 1000 | 0)
}

module.exports = async (journeys) => {
    var distance = 0
    var traveltime = 0 // in Milliseconds, needs to be converted
    journeys.forEach(journey => {
        distance += journey.kilometer
        traveltime += journey.ankunftszeit - journey.abfahrtszeit
    })
    
    console.log(`Reisekilometer: ${Math.round(distance * 1e3) / 1e3}km`)
    console.log(`Fahrtdauer (laut Plan): ${msToTime(traveltime)}`)
}