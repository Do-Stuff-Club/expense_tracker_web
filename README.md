This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install all required packages:

```bash
yarn install
```

Next, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The test login is:

- Username: potato@potato.com
- Password: asdfasdf

Currently a user can create and edit "categories," which are groups of "tags." The information will be automatically persisted on the test server https://expense-tracker-test-api.herokuapp.com/

Each page has a dedicated file under `pages/`, and re-usable components are in `components/`. The `redux` folder is for client-side storage code, and the `pages/_app.tsx` is a special file used by Next.js.

## General links
* Framework I'm using: https://nextjs.org/docs/getting-started
* Main Component Library (see for styling and stuff too): https://material-ui.com/getting-started/usage/
* Client-side data: https://redux.js.org/tutorials/essentials/part-1-overview-concepts
