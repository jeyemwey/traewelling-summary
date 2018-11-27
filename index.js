// Put the application in an async context
(async () => {
    const journeys = await require("./csvParser").journeys

    // Require all files in parts and run the exports.default. Then, add a newline.
    const parts = [
        "title",
        "sums",
        "longestJourney",
        "mostVisitedStations",
        "mostTraveledJourneys"
    ].forEach(part => {
        require("./parts/" + part)(journeys)
        console.log()
    })
})()