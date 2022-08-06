export function year() {
    var dateYServer = new Date().getFullYear();
    return dateYServer
}

export function month() {
    var dateMServer = `${(new Date().getMonth() + 1)}`;
    if (dateMServer.length === 1) {
        return `0${dateMServer}`
    } else {
        return dateMServer;
    };
}

export function date() {
    var dateDServer = `${new Date().getDate()}`;
    if (dateDServer.length === 1) {
        return `0${dateDServer}`
    } else {
        return dateDServer;
    };
}

export function hours() {
    var timeHServer = new Date().getHours();
    return timeHServer
}

export function minutes() {
    var timeMServer = new Date().getMinutes();
    return timeMServer
}

export function secondes() {
    var timeSServer = new Date().getSeconds();

    return timeSServer
}
