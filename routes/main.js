const express = require("express");
const { route } = require("../app");
const router = express.Router();
const controllers = require("../controllers");

router.get("/", async (req, res, next) => {
  const data = req.context;

  const itemCtr = controllers.item.instance();
  data.coffee = await itemCtr.get({ category: "coffee" });
  data.tea = await itemCtr.get({ category: "tea" });
  data.pastries = await itemCtr.get({ category: "pastries" });

  res.render("home", data);
});

router.get("/blog", (req, res, next) => {
  res.render("blog", req.context);
});

router.get("/items", async (req, res, next) => {
  const filter = req.query;
  const itemCtr = controllers.item.instance();
  const items = await itemCtr.get(filter);

  res.json({
    items,
  });
});

router.get("/menu", (req, res, next) => {
  res.render("menu", req.context);
});

router.get("/blog-single", (req, res, next) => {
  res.render("blog-single", req.context);
});

router.post("/order", async (req, res, next) => {
  // const orderData = req.body;
  // res.json(orderData);
  const orderCtr = controllers.order.instance();
  const order = await orderCtr.post(orderData)

  res.json(order);
});

module.exports = router;
