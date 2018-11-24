const helpers = require("./helpers")

module.exports = (journeys) => {
    var distance = 0
    var traveltime = 0 // in Milliseconds, needs to be converted
    journeys.forEach(journey => {
        distance += journey.kilometer
        traveltime += journey.ankunftszeit - journey.abfahrtszeit
    })
    console.log(`Reisekilometer: ${helpers.kmRound(distance)}km`)
    console.log(`Fahrtdauer (laut Plan): ${helpers.msToTime(traveltime)}`)
}