import getOneCategory from "../../database/queryes/getOneCategory"
import getStatsCategoryByInterval from "../../database/queryes/getStatsCategoryByInterval";

const intervalConstructor = async (categoryId: string) => {
    const category = await getOneCategory(categoryId);
    if(!category) return;
    const {limit, intervalValue} = category;

    const checkStats = async () => {
        const statsCount = await getStatsCategoryByInterval(categoryId, intervalValue);
        if (statsCount >= limit) {
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
            return;
        }
        return;
    }

    setInterval(checkStats, intervalValue);
}