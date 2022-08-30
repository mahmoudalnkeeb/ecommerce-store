class ProductRate {
  constructor(pool) {
    this.pool = pool;
  }

  async getProductRate(productId) {
    let client = await this.pool.connect();
    try {
      // todo
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async userProductRate(rateId, userId) {
    let client = await this.pool.connect();
    try {
      // todo
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async newRate(value, text, userId, productId) {
    let client = await this.pool.connect();
    try {
      // todo
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async updateRate() {
    let client = await this.pool.connect();
    try {
      // todo
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async deleteRate() {
    let client = await this.pool.connect();
    try {
      // todo
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  // [PRIVATE METHODS]

  async #getRates(productId) {
    let client = await this.pool.connect();
    try {
      // todo
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async #calcProductRate(productId) {
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
}
