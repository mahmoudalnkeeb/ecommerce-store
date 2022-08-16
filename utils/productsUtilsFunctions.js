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
