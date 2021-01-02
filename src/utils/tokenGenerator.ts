import { ERanks } from "../database/types/types";

type TAdminType = ERanks.Admin | ERanks.SuperAdmin;

const tokenGenerator = (type: TAdminType) => {

    let length = 16
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let retVal = "";

    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    if (type === ERanks.Admin) return `${retVal}:${ERanks.Admin}`;
    return `${retVal}:${ERanks.SuperAdmin}`;
}

export default tokenGenerator;