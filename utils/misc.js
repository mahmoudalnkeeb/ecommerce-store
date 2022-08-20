function calcRate({
  fiveStarsCount,
  fourStarsCount,
  threeStarsCount,
  twoStarsCount,
  oneStarCount,
}) {
  const total =
    fiveStarsCount +
    fourStarsCount +
    threeStarsCount +
    twoStarsCount +
    oneStarCount;

  const ratesWeight = {
    five: 5 * fiveStarsCount,
    four: 4 * fourStarsCount,
    three: 3 * threeStarsCount,
    two: 2 * twoStarsCount,
    one: 1 * oneStarCount,
  };
  const rate =
    (ratesWeight.five +
      ratesWeight.four +
      ratesWeight.three +
      ratesWeight.two +
      ratesWeight.one) /
    total;
  return rate.toFixed(1);
}
function pagination(filter, page) {
  let offset = (page - 1) * 20;
  let sql;
  switch (filter) {
    case 'recent':
      sql = `SELECT
             product_id,product_name,product_img,product_price,product_desc,created_at
             FROM products ORDER BY created_at DESC LIMIT 20 OFFSET $1`;
      break;
    case 'oldest':
      sql = `SELECT
             product_id,product_name,product_img,product_price,product_desc,created_at
             FROM products ORDER BY created_at ASC LIMIT 20 OFFSET $1`;
      break;
    case 'highest_price':
      sql = `SELECT
             product_id,product_name,product_img,product_price,product_desc,created_at
             FROM products ORDER BY product_price DESC LIMIT 20 OFFSET $1`;
      break;
    case 'lowest_price':
      sql = `SELECT
             product_id,product_name,product_img,product_price,product_desc,created_at
             FROM products ORDER BY product_price ASC LIMIT 20 OFFSET $1`;
      break;
    default:
      break;
  }
  return { offset, sql };
}

module.exports = { calcRate, pagination };
