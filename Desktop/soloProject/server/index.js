/* eslint-disable quotes */
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const router = require("./router.js");

const PORT = 4000;
app.use(cors());
app.use(bodyparser.json());
app.use(router);

const mongoDBClient = require("./database/db");

const schema = require("./schema");

//accès  à l'interface GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);



app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  mongoDBClient();
});
