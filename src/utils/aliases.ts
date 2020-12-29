import { User } from "telegraf/typings/telegram-types";
import { TAuthor } from "../database/queryes/types/types";

export const getFirstName = (user: User) => user.first_name || null;
export const getLastName = (user: User) => user.last_name || null;
export const getUsername = (user: User) => user.username ? `@${user.username}` : null;
export const getFirstAndLastName = (user: User) => `${getFirstName(user)} ${getLastName(user)}`;
export const getAuthorData = (user: User) => {
    return {
        firstName: getFirstName(user),
        lastName: getLastName(user),
        username: getUsername(user)
    }
}
export const getAuthor = ({firstName, lastName, username}: TAuthor) => {
    return `${firstName || ''} ${lastName || ''} ${username && `(${username})`}`;
}