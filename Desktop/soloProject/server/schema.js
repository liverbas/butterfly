/* eslint-disable quotes */
const graphql = require("graphql");
const DBModels = require("./database/model");

const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } =
  graphql;

const AssociationType = new GraphQLObjectType({
  name: "Associations",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    theme: { type: GraphQLString },
    website: { type: GraphQLString },
    img: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    interest: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {

    hello: {
      type: GraphQLString,
      resolve() {
        return "hello query graphql";
      },
    },

    associations: {
      type: new GraphQLList(AssociationType),
      resolve() {
        return DBModels.Association.find({});
      },
    },
  },
});

const MutationQuery = new GraphQLObjectType({
  name: "Mutation",
  fields: {

    addUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        interest: { type: GraphQLString },
      },
      
      resolve (parent, args) {
        let user = new DBModels.User({
          id: args.id,
          firstname: args.firstname,
          lastname: args.lastname,
          interest: args.interest,
        });
        return user.save();
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
  mutation: MutationQuery,
});

module.exports = schema;
