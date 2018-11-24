// Put the application in an async context
(async () => {
    const journeys = await require("./csvParser").journeys

    console.table(journeys)
})()