module.exports = (collection, pagination) => {
  const total  = collection.length;
  const limit  = pagination.limit || 10;
  const offset = pagination.offset || 0;
  const docs   = collection.slice(offset, offset + limit - 1);

  return {
    docs,
    total,
    limit,
    offset,
  };
};
