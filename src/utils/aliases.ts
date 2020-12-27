import { User } from "telegraf/typings/telegram-types";

export const getFirstName = (user: User) => user.first_name || 'Коллега';
export const getLastName = (user: User) => user.last_name || '';
export const getUsername = (user: User) => user.username ? `@${user.username}` : 'none';
export const getFirstAndLastName = (user: User) => `${getFirstName(user)} ${getLastName(user)}`;