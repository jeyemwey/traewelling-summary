const helpers = require("./helpers")

module.exports = (journeys) => {
    // Distanz ASC
    journeys.sort((a, b) => a.kilometer - b.kilometer)
    console.log(`Die zeitlich-kürzeste Reise war am ${helpers.isoDates(journeys[0].abfahrtszeit)} und ging von ${journeys[0].abfahrtsort} nach ${journeys[0].ankunftsort} (${journeys[0].zugart} ${journeys[0].zugnummer}). Sie war ${helpers.kmRound(journeys[0].kilometer)}km lang.`)

    // Distanz DESC
    journeys.reverse()
    console.log(`Die längste Reise war am ${helpers.isoDates(journeys[0].abfahrtszeit)} und ging von ${journeys[0].abfahrtsort} nach ${journeys[0].ankunftsort} (${journeys[0].zugart} ${journeys[0].zugnummer}). Sie war ${helpers.kmRound(journeys[0].kilometer)}km lang.`)

    // Zeit ASC
    journeys.sort((a, b) => a.ankunftszeit - a.abfahrtszeit - (b.ankunftszeit - b.abfahrtszeit))
    console.log(`Die distanz-kürzeste Reise war am ${helpers.isoDates(journeys[0].abfahrtszeit)} und ging von ${journeys[0].abfahrtsort} nach ${journeys[0].ankunftsort} (${journeys[0].zugart} ${journeys[0].zugnummer}). Sie dauerte ${helpers.msToTime(journeys[0].ankunftszeit - journeys[0].abfahrtszeit)}.`)

    // Zeit DESC
    journeys.reverse()
    console.log(`Die weiteste Reise war am ${helpers.isoDates(journeys[0].abfahrtszeit)} und ging von ${journeys[0].abfahrtsort} nach ${journeys[0].ankunftsort} (${journeys[0].zugart} ${journeys[0].zugnummer}). Sie dauerte ${helpers.msToTime(journeys[0].ankunftszeit - journeys[0].abfahrtszeit)}.`)

}