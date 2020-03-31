const fs = require("fs");
const _ = require("lodash");

const { applyPagination, equalsIgnoreCase } = require("../utils");

const rawData = fs.readFileSync("./data/clow-cards.json");
const cards = JSON.parse(rawData);

module.exports = {
  getCard: (req, res) => {
    res.status("200").json(_.filter(cards, { id: parseInt(req.params.id) }));
  },

  getCardsList: (req, res) => {
    const query = {
      filter: {
        name: req.query.name,
        sign: req.query.sign,
        type: req.query.type
      },
      sort: {
        order: req.query.order || "asc",
        orderBy: req.query.orderBy || "name"
      },
      page: {
        offset: req.query.offset,
        limit: req.query.limit
      }
    };

    let cardsList = cards;

    const definedFilters = _.pickBy(query.filter, _.identity);
    _.forEach(definedFilters, (value, key) => {
      cardsList = cardsList.filter(card =>
        equalsIgnoreCase(_.get(card, key), value)
      );
    });

    cardsList = _.orderBy(cardsList, query.sort.orderBy, query.sort.order);
    cardsList = applyPagination(cardsList, query.page.offset, query.page.limit);

    return res.status("200").json(cardsList);
  }
};
