const markerProvider = (value: number) => {
    const levels = {
        normal: '🟢', 
        stress: '🟡', 
        notGood: '🟠', 
        redAlert: '🔴'
    }
    if (value >= 10) return levels.redAlert;
    if (value >= 5) return levels.notGood;
    if (value >= 3) return levels.stress;
    if (value >= 1) return levels.normal;
}

export default markerProvider;