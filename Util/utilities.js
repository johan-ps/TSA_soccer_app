export const getDate = (date) => {
    const curDate = new Date();
    const tmrwDate = new Date(curDate);
    tmrwDate.setDate(tmrwDate.getDate() + 1);
    if (date.getFullYear() === curDate.getFullYear() &&
        date.getMonth() === curDate.getMonth() &&
        date.getDate() === curDate.getDate()) {
            return 'Today';
    } else if (date.getFullYear() === tmrwDate.getFullYear() &&
        date.getMonth() === tmrwDate.getMonth() &&
        date.getDate() === tmrwDate.getDate()) {
            return 'Tomorrow';
    } else {
        return prettyPrintDate(date);
    }
}

export const formatStatus = (status) => {
    return status.substring(0, 1).toUpperCase() + status.substring(1).toLowerCase();
}

export const formatTime = (time) => {
    const hours = time.getHours() % 12;
    const min = time.getMinutes();
    if (time.getHours() > 12) {
        return hours + ':' + min + ' pm';
    } else {
        return hours + ':' + min + ' am';
    }
}

export const getTime = (date) => {
    const curDate = new Date();
    const tmrwDate = new Date(curDate);
    tmrwDate.setDate(tmrwDate.getDate() + 1);
    if (date.getFullYear() === curDate.getFullYear() &&
        date.getMonth() === curDate.getMonth() &&
        date.getDate() === curDate.getDate()) {
            const hours = date.getHours();
            const min = date.getMinutes();
            const hourDif = curDate.getHours() - hours;
            const minDif = curDate.getMinutes() - min;
            if (hourDif === 0) {
                if (minDif === 1) {
                    return '1 minute ago';
                } else {
                    return minDif + ' minutes ago';
                }
            } else if (hourDif === 1) {
                return '1 hour ago';
            } else {
                return hourDif + ' hours ago';
            }
    } else {
        return prettyPrintDate(date);
    }
}

export const prettyPrintDate = (date) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return daysOfWeek[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}