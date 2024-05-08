const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const _PORT = 3000;

// data parser - used to parse POST data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: "1.0.0",
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /books:
 *  get:
 *    description: Get all books
 *    responses:
 *     200:
 *      description: Succes
 */

app.get("/books", (req, res) => {
  res.send([
    {
      id: 1,
      name: "The Hobbit",
      author: "J.R.R. Tolkien",
    },
  ]);
});


/**
 * @swagger
 * /book:
 *  post:
 *    description: Get one book
 *    parameters:
 *      - name: title
 *        description: Book title
 *        in: body
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 */
app.post("/book", (req, res) => {
  let title = req.body.title;
  res.send({ title });
});

app.listen(_PORT, () => {
  console.log(`Server is running on http://localhost:${_PORT}`);
});
