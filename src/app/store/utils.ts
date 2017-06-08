import { request, reject, resolve } from 'redux-promised';

export const containsType = (action, type) => {
    return [request(type), reject(type), resolve(type)].includes(action.type);
};
