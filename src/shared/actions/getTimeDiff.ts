const getTimeDiff = (rollback: Date) => {
    const nowMS = Date.now();
    const rollbackMS = Date.parse(rollback.toString());
    return +((nowMS - rollbackMS) / 1000);
}

export default getTimeDiff;