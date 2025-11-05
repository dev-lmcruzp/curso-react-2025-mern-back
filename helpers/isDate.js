const moment = require("moment");

const isDate = (value, { req, location, path }) => {
    if (!value)
        return false;

    const newDate = moment(value);
    return newDate.isValid();
}


module.exports = { isDate };