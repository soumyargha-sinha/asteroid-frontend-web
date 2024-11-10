export const getStartAndEndDateStrings = (daysBeforeStart: number = 0, daysAfterStart: number = 8) => {
    const currentDate = getFirstMinuteOfDay(new Date());
    return {
        startDate: getDateStringPastDays(currentDate, daysBeforeStart),
        endDate: getDateStringPastDays(currentDate, daysAfterStart)
    }
}

export const generateQueryStringForUrl = (queryParams: any) => {
    const queryParamKeys = Object.keys(queryParams);
    const queryString = queryParamKeys.reduce((allParams: string, currentParam: string, index: number) => {
        allParams += `${currentParam}=${queryParams[currentParam]}${index !== (queryParamKeys.length - 1) ? '&' : ''}`;
        return allParams;
    }, '?');
    return queryString;
}

export const getTimeForCountdown = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const formattedTime = [
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0')
    ].join(':');
    return formattedTime;
};

export function isToday(dateValue: Date) {
    // const today = new Date();
    // today.setUTCHours(0, 0, 0, 0);
    // return dateValue.getUTCFullYear() === today.getUTCFullYear() &&
    //     dateValue.getUTCMonth() === today.getUTCMonth() &&
    //     dateValue.getUTCDate() === today.getUTCDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of local day

    return dateValue.getFullYear() === today.getFullYear() &&
        dateValue.getMonth() === today.getMonth() &&
        dateValue.getDate() === today.getDate();

}

const getDateStringPastDays = (currentDate: Date, daysToAdd: number) => {
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    return getUTCStringForDate(currentDate);
    // return currentDate.toISOString().split('T')[0];
}

const getUTCStringForDate = (inputDate: Date) => {
    const year = inputDate.getUTCFullYear();
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(inputDate.getUTCDate()).padStart(2, '0');
    const hours = String(inputDate.getUTCHours()).padStart(2, '0');
    const minutes = String(inputDate.getUTCMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const getFirstMinuteOfDay = (inputDate: Date) => {
    const startOfDay = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), 0, 0, 0, 0);
    return startOfDay;
}

export const getStringFromDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export const getMonthStringFromDate = (date: Date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${month} ${day}, ${hours}:${minutes}`;
};


// export const getUptoTwoDecimalPoints = (inputNumber: string | number) => {
//     inputNumber = Number(inputNumber);
//     return (Math.ceil(inputNumber * 100) / 100)
// }

export const getUptoTwoDecimalPoints = (inputNumber: string | number) => {
    inputNumber = Number(inputNumber);
    return Math.ceil(parseFloat((inputNumber * 100).toFixed(10))) / 100;
}

export const sortDataByColumnKey = (arr: any[], sortKey: string, sortDirection = 'asc', sortDataType: string) => {
    return arr.sort((a, b) => {
        const valueA = a[sortKey];
        const valueB = b[sortKey];

        const compare = (val1: any, val2: any) => {
            if (val1 < val2) return -1;
            if (val1 > val2) return 1;
            return 0;
        };

        let result = 0;

        switch (sortDataType) {
            case 'String':
                result = compare(String(valueA).toLowerCase(), String(valueB).toLowerCase());
                break;

            case 'Number':
                result = compare(Number(valueA), Number(valueB));
                break;

            case 'Date':
                const dateA = new Date(valueA);
                const dateB = new Date(valueB);
                result = compare(dateA.getTime(), dateB.getTime());
                break;

            default:
            // throw new Error(`Unsupported data type ${sortDataType}`);
        }

        return sortDirection === 'desc' ? -result : result;
    });
}