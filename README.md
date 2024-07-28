# adamu

A to-do web application based on Express.js (backend) and Svelte (frontend). <sup>Named after The Bear's character Sydney Adamu!</sup>

## Features

- Backend API (Express)

  - Create to-do item (POST /todos)
  - Get all to-do items (GET /todos)
  - Get specific to-do item (GET /todos)
  - Update to-do item (PATCH /todos)
  - Delete to-do item (DELETE /todos)

- Frontend (Svelte)

  - Show list of to-do items
  - Handle toggling completed status for each item
  - Handle adding to-do item
  - Handle deleting to-do item
  - Handle renaming to-do item
  - Strike-through for finished items
  - Proper CSS for to-do list

## Set-up

### Preqrequisites

- Node.js
- npm

### Installation

0. Assuming you have cloned the repository...
1. Install dependencies for both backend and frontend.

```sh
cd adamu/backend
npm install
```

```sh
cd adamu/frontend
npm install
```

### Running

0. These next two steps have to be done at the same time - keep both backend and frontend running synchronously
1. Start the backend server:

```sh
cd adamu/backend
node app.js
```

2. Start the frontend server

```sh
cd adamu/frontend
npm run dev
```

3. Open browser and navigate to the localhost link shown on the shell after starting the frontend server (example: http://localhost:5173/)

## To-do

- [ ] Frontend: Mobile sizing support/media query

## Credits

- [kevmodrome](https://twitter.com/kevmodrome) for his [Notification Toast](https://svelte.dev/repl/2254c3b9b9ba4eeda05d81d2816f6276?version=4.2.18) code
