import { IUser } from './../database/types/types';
import { User } from "telegraf/typings/telegram-types";

export const getFirstName = (user: User) => user.first_name || null;
export const getLastName = (user: User) => user.last_name || null;
export const getUsername = (user: User) => user.username ? `@${user.username}` : null;

export const getFirstAndLastName = (user: User) => {
    return `${getFirstName(user) || ''} ${getLastName(user) || ''}`.trim() || null;
}

export const getAuthorData = (user: User) => {
    return {
        firstName: getFirstName(user),
        lastName: getLastName(user),
        username: getUsername(user)
    }
}
export const getAuthor = ({firstName, lastName, userName}: IUser) => {
    return `${firstName || ''} ${lastName || ''} ${userName ? `(${userName})` : ''}`;
}