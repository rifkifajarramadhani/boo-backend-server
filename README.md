# Node.js RESTful API with MongoDB + mongo-memory-server (for mongoDB testing)

This project is a RESTful API built with Node.js, Express, and MongoDB. It's designed to provide a solid foundation for building scalable and maintainable server-side applications.

For the endpoint required for the tasks:
  - GET /profile-render/:id => Render the pages (requirement no 1), run add user endpoint first before access this endpoint in web app
  - POST /profile => Add new user
  - GET /profile/:id => Get user profile
  - POST /profile/:profileId/comments => Add comment by specific user, votes for the comment also include in this endpoint
  - GET /profile/:profileId/comments => Get cooments in profile page
  - POST /profile/:profileId/comments/:commentId => Like / unlike comment
  - GET /profile/:profileId/comments/:commentId => Get like count for each user comment

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js (v16 or later recommended)
- npm (normally comes with Node.js)
- MongoDB

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. Clone the repository:

```bash
git clone https://github.com/rifkifajarramadhani/boo-backend-server.git
```

2. Navigate to the project directory:

```bash
cd boo-backend-server
```

3. Install dependencies:

```bash
npm install
```

4. Copy `.env.example` to `.env` and update it with your settings:

```bash
cp .env.example .env
```

5. Start the server:

```bash
npm run start:dev
```

Your API should now be running on [http://localhost:3000](http://localhost:3000).

## Running the tests

Explain how to run the automated tests for this system:

```bash
npm test
```

Or run through every file manually

```bash
npm test profile-post.test.js
npm test profile-get.test.js
npm test comment-post.test.js
npm test comment-get.test.js
npm test like-post.test.js
```

## Built With

* [Node.js](https://nodejs.org/) - The runtime server environment
* [Express](https://expressjs.com/) - The web framework used
* [MongoDB](https://www.mongodb.com/) - The database used
* [Mongoose](https://mongoosejs.com/) - The ORM
* [MongoDB Memory Server](https://github.com/nodkz/mongodb-memory-server/) - MongoDB testing tools which run in memory

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/yourusername/yourprojectname/tags).

## Authors

* **Rifki Fajar Ramadhani** - *Initial work* - rifkifajarramdhani (https://github.com/rifkifajarramadhani)
```

Remember to replace placeholders like `yourusername`, `yourprojectname`, and other project-specific details with the actual information relevant to your project. This template is designed to be flexible and can be expanded based on your project's needs, such as adding sections for API endpoints, request/response examples, or additional configuration steps.
