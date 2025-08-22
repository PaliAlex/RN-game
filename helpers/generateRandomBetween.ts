export const generateRandomBetween = (min: number, max: number, exclude: number): number => {
    if (max - min <= 1) {
        return min === exclude ? max - 1 : min;
    }

    let rndNum = Math.floor(Math.random() * (max - min)) + min;

    while (rndNum === exclude) {
        rndNum = Math.floor(Math.random() * (max - min)) + min;
    }

    return rndNum;
};
