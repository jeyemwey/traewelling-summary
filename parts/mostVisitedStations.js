const helpers = require("./helpers")

module.exports = (journeys) => {
    stations = {}
    journeys.forEach((journey) => {
        if (typeof stations[journey.abfahrtsort] == "undefined")
            stations[journey.abfahrtsort] = {stationName: journey.abfahrtsort, visits: 0}
        stations[journey.abfahrtsort].visits += 1

        if (typeof stations[journey.ankunftsort] == "undefined")
            stations[journey.ankunftsort] = {stationName: journey.ankunftsort, visits: 0}
        stations[journey.ankunftsort].visits += 1

        return stations
    })
    // Nimm die Werte aus dem Stationsobjekt, sortiere nach visits (ASC) and reverse it. 
    stations = Object.values(stations).sort((a, b) => a.visits - b.visits).reverse()

    console.log("Meist besuchte Bahnhöfe:")
    for (let index = 0; index < 3; index++) {
        console.log(`${index + 1}. ${stations[index].stationName} (${stations[index].visits} Mal besucht)`)
    }
}