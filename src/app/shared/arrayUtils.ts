export const getIndexById = (list, id) => {
    console.log(list, id);
    for (let item of list) {
        if (item._id === id) {
            return list.indexOf(item);
        }
    }
    return null;
};

export const getItemById = (list, id) => {
    return list[getIndexById(list, id)];
};
