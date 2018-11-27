const helpers = require("./helpers")

module.exports = (journeys) => {
    journeys.sort((a, b) => a.abfahrtszeit - b.abfahrtszeit)
    
    console.log(`---
Traewelling-Statistik (Beinhaltet Reisen von ${helpers.isoDates(journeys[0].abfahrtszeit)} bis ${helpers.isoDates(journeys[journeys.length -1].abfahrtszeit)})
---`)
}