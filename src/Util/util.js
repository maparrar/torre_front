export const deepCopy = object => JSON.parse(JSON.stringify(object));
export const getUniqueId = () => new Date().valueOf();

export default {deepCopy, getUniqueId};
