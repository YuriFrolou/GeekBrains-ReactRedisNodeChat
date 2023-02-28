export const createArrayOfObj = (obj) => {
    const arr = [];
    for (const i in obj) {
        arr.push(obj[i])
    }
    return arr;
};

export const createArrayOfRedisData = (obj) => {
    const arr = [];
    for (const i in obj) {
        arr.push(JSON.parse(obj[i]))
    }
    return arr;
};