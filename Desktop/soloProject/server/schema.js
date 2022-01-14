/* eslint-disable quotes */
const graphql = require("graphql");
const Asso = require("./database/model");

const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString } =
  graphql;

const AssociationType = new GraphQLObjectType({
  name: "Associations",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    theme: { type: GraphQLString },
    website: { type: GraphQLString },
    img: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    hello: {
      type: GraphQLString,
      resolve () {
        return "world";
      },
    },
    associations: {
      type: new GraphQLList(AssociationType),
      resolve () {
        return Asso.find({});
      },
    },
  },
});

/* id:String,  
name: String,
theme: String,
website: String,
img: String,
socialMedia: [socialMediaSchema],
funding: String, */

const schema = new GraphQLSchema({
  query: RootQuery,
});

module.exports = schema;
