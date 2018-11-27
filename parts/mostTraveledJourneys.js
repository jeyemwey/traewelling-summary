const helpers = require("./helpers")

module.exports = (journeys) => {
    trips = {}
    journeys.forEach((journey) => {
        const trip = journey.abfahrtsort + "->" + journey.ankunftsort
        
        if (typeof trips[trip] == "undefined") {
            trips[trip] = {
                departure: journey.abfahrtsort,
                arrival: journey.ankunftsort,
                occurences: 0
            }
        }
        
        trips[trip].occurences += 1
    })
    // Nimm die Werte aus dem Stationsobjekt, sortiere nach occurences (ASC) and reverse it. 
    trips = Object
        .values(trips)
        .sort((a, b) => a.occurences - b.occurences)
        .reverse()

    console.log("Meistgereiste Reisen nach Stationen:")
    for (let index = 0; index < 3; index++) {
        console.log(`${index + 1}. ${trips[index].departure} ➡  ${trips[index].arrival} (${trips[index].occurences} Mal gereist)`)
    }
}