const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require("./routes/userRoutes");
const theaterRoutes = require("./routes/theaterRoutes");
const showRoutes = require("./routes/showRoutes");
const movieRoutes = require("./routes/movieRoutes");

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');
const { title } = require("process");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book My Movie',
      version: '1.0.0',
      description: `
## 🔐 Authentication - Bearer Token Required

This API uses **JWT Bearer Token** for authentication.

To access protected routes, include this header:

\`\`\`
Authorization: Bearer <your_token>
\`\`\`

### How to Use in Swagger UI

1. Click the **"Authorize"** button at the top-right of the page.
2. Enter your token like this:

   \`\`\`
   Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
   \`\`\`

3. Click **Authorize** and then close the modal.
4. Now you can make authorized API requests directly from Swagger UI.
      `,
    },
    servers: [
      {
        url: 'http://localhost:4500',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    tags: [
      { name: 'Users', description: 'Operations about users' },
      { name: 'Movies', description: 'Operations about movies' },
      { name: 'Theaters', description: 'Operations about theaters' },
      { name: 'Shows', description: 'Operations about shows' },
    ],
  },
  apis: ['./routes/*.js'],
};


const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

dotenv.config();
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/theaters", theaterRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/shows", showRoutes);


const PORT = process.env.PORT || 4500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
