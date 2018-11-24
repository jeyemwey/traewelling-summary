const fsp = require("fs").promises

const parseLines = (lines) => Promise.all(lines.map(line => {
    [
        StatusID, Zugart, Zugnummer, Abfahrtsort, Abfahrtskoordinaten,
        Abfahrtszeit, Ankunftsort, Ankunftskoordinaten, Ankunftszeit,
        Reisezeit, Kilometer, Punkte, Status, Zwischenhalte,
    ] = line.split("\t").map(cell => cell.substring(1, cell.length - 1))

    return {
        statusID: StatusID, zugart: Zugart, zugnummer: Zugnummer,
        abfahrtsort: Abfahrtsort, abfahrtskoordinaten: Abfahrtskoordinaten,
        abfahrtszeit: new Date(Abfahrtszeit), ankunftsort: Ankunftsort,
        ankunftskoordinaten: Ankunftskoordinaten,
        ankunftszeit: new Date(Ankunftszeit), reisezeit: Reisezeit,
        kilometer: parseFloat(Kilometer), punkte: parseInt(Punkte),
        status: Status, zwischenhalte: Zwischenhalte,
    }
}))

exports.journeys = new Promise((resolve, reject) => {
    // process.argv is: node index.js export.csv
    let filename = process.argv[2] || './export.csv'

    fsp.readFile(filename, "utf8") // Read the file,
    .then(file => file.split('\n')) // split it by lines,
    .then(lines => {
        lines.shift() // drop the first line (headings),
        lines.pop() // and the last one (")
        return lines
    })
    .then(lines => parseLines(lines))
    .then(journeys => {
        resolve(journeys)
    })
    .catch(e => {
        console.error(e)
    })
})