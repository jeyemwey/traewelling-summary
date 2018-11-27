const fsp = require("fs").promises

/**
 * Multi-line comments will appear in the CSV with new-lines. Thus, they
 * prospect to become a journey in this parser. This little filter looks for
 * lines that do not represent the normal tab-seperated journey items.
 * @param {String[]} lines Array of soon-to-be journeys
 * @returns {String[]} Array of probably-journeys, but without the failed lines.
 */
const filterInvalidLines = (lines) => Promise.all(
    lines.filter(
        line => /(.+\t)+.+/.test(line)
    )
)

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
        kilometer: parseFloat(Kilometer) || 0, punkte: parseInt(Punkte) || 0,
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
    .then(lines => filterInvalidLines(lines))
    .then(lines => parseLines(lines))
    .then(journeys => {
        resolve(journeys)
    })
    .catch(e => {
        console.error(e)
    })
})