const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Pijar Mahir Backend API Clone",
    description: "Pijar Mahir Backend API Clone",
  },
  host: "localhost:3000",
  definitions: {
    AddCollection: {
      $name: "Best Seller",
      $slug: "best-seller",
      $numOrder: 1,
    },
    AddCoursesToCollection: {
      $coursesId: [199, 4863],
    },
    RemoveCourseFromCollection: {
      $courseId: 199,
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
