function productsPagination(sortBy, page) {
  let offset = (page - 1) * 20;
  let sql;
  switch (sortBy) {
    case 'recent':
      sql = `SELECT
             product_id,product_name,product_images,product_price,product_desc,created_at
             FROM products ORDER BY created_at DESC LIMIT 20 OFFSET $1`;
      break;
    case 'oldest':
      sql = `SELECT
             product_id,product_name,product_images,product_price,product_desc,created_at
             FROM products ORDER BY created_at ASC LIMIT 20 OFFSET $1`;
      break;
    case 'highest_price':
      sql = `SELECT
             product_id,product_name,product_images,product_price,product_desc,created_at
             FROM products ORDER BY product_price DESC LIMIT 20 OFFSET $1`;
      break;
    case 'lowest_price':
      sql = `SELECT
             product_id,product_name,product_images,product_price,product_desc,created_at
             FROM products ORDER BY product_price ASC LIMIT 20 OFFSET $1`;
      break;
    default:
      break;
  }
  return { offset, sql };
}

module.exports = {productsPagination};
