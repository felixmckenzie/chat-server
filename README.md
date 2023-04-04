# Chat Server

A Server for a chat application that enables real-time communication between users.

## Technologies Used

- Typescript
- Graphql
- Express
- Apollo Server
- Prisma

## Concepts Learned

**Graphql Subscriptions** define events in the schema, clients subscribe to these events to receive chat messages

**The WebSocket Protocol** Is the transport layer for real-time communication between server and client. When a client subscribes to an event, a WebSocket connection is established, and the server uses this connection to send updates when the subscribed event is triggered.

**PubSub** manages the flow of messages between publishers and subscribers.

## Tests

To run the test

- Ensure you have PostgreSQL installed locally
- Create a .env.test file and declare a DATABASE_URL e.g. "postgresql://prisma:prisma@localhost:5432/test"
- Create a prisma user with permissions to write to the Database https://www.postgresql.org/docs/8.0/sql-createuser.html
- npm install
- npm run jest
