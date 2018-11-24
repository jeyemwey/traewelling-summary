module.exports = {
    /**
     * @param {Date} d A DateTime object
     * @returns {String} The YYYY-MM-DD of the date, following ISO 8601, the only true date format.
     */
    isoDates: (d) => d.toISOString().substr(0, 10),

    /**
     * @param {Number} x Distance in Kilometers
     * @returns Kilometers with three digits after the comma.
     */
    kmRound: (x) => Math.round(x * 1e3) / 1e3,

    /**
     * Stolen from: https://stackoverflow.com/a/9763769
     * @param {Number} s Milliseconds
     * @returns {String} hh:mm:ss
     */
    msToTime: (s) => {
        // Pad to 2 or 3 digits, default is 2
        const pad = (n, z = 2) => ('00' + n).slice(-z)
        return pad(s / 3.6e6 | 0) + ':' + pad((s % 3.6e6) / 6e4 | 0) + ':' + pad((s % 6e4) / 1000 | 0)
    }
}