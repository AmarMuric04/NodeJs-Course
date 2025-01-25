const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const fs = require("fs");
const path = require("path");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const app = express();

const authorsPath = "authors.json";
const booksPath = "books.json";

function getDataFromFile(path) {
  let jsonData = fs.readFileSync(path, "utf8");

  let dataArray = [];
  if (jsonData.trim()) {
    dataArray = JSON.parse(jsonData);
  }

  return dataArray;
}

function addToFile(newItem, path) {
  try {
    const data = getDataFromFile(path);

    data.push(newItem);

    fs.writeFileSync(path, JSON.stringify(data, null, 2));

    console.log("Item added successfully!");
  } catch (err) {
    console.error("Error updating JSON:", err);
  }
}

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents an author of a book",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: GraphQLList(BookType),
      resolve: (author) => {
        return getDataFromFile(booksPath).filter(
          (book) => book.authorId === author.id
        );
      },
    },
  }),
});

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book, written by an author.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return getDataFromFile(authorsPath).find(
          (author) => book.authorId === author.id
        );
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    book: {
      type: BookType,
      description: "A book.",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_, args) =>
        getDataFromFile(booksPath).find((book) => book.id === args.id),
    },
    books: {
      type: new GraphQLList(BookType),
      description: "List of All books",
      resolve: () => getDataFromFile(booksPath),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of All authors",
      resolve: () => getDataFromFile(authorsPath),
    },
    author: {
      type: AuthorType,
      description: "An author.",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_, args) =>
        getDataFromFile(authorsPath).find((author) => author.id === args.id),
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add a book",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        };

        addToFile(book, booksPath);

        return book;
      },
    },
    addAuthor: {
      type: AuthorType,
      description: "Add an author",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => {
        const author = {
          id: authors.length + 1,
          name: args.name,
        };

        addToFile(author, authorsPath);

        return author;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log("Server Running on http://localhost:5000/graphql");
});
