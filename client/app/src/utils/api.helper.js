module.exports = {
  buildSearchQuery: (filterObject) => {
    let filterQuery = "?";
    const keys = Object.keys(filterObject);

    keys.forEach((key) => {
      filterQuery += `${key}=${filterObject[key]}&`;
    });

    return filterQuery;
  },
};
