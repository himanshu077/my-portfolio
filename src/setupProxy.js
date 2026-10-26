// `npm start` only: serves /api/contact with the same handler Vercel runs in production.
const express = require("express");
const contactHandler = require("../api/contact");

module.exports = function (app) {
  app.post("/api/contact", express.json(), contactHandler);
};
