type TLevels = {
    normal: number,
    stress: number,
    notGood: number,
    redAlert: number
} 

const markerProvider = (value: number, config: TLevels = {
    normal: 1,
    stress: 3,
    notGood: 5,
    redAlert: 10
}) => {
    const levels = {
        normal: '🟢', 
        stress: '🟡', 
        notGood: '🟠', 
        redAlert: '🔴'
    }
    if (value >= config.redAlert) return levels.redAlert;
    if (value >= config.notGood) return levels.notGood;
    if (value >= config.stress) return levels.stress;
    if (value >= config.normal) return levels.normal;
    return '♥️';
}

export default markerProvider;