[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install all required packages:

```bash
yarn install
```

Running install also configures the git hooks for the dev environment. Please run yarn install again to ensure you have the githooks set up.

Next, run the development server:

```bash
yarn dev
```

This will let you open the website on localhost:3000.

Use VSCode to edit files, and install all suggested plugins.

Other yarn scripts:

| Name | Command | Description |
| --- | --- | --- |
| `yarn all_check` | `./git_hooks/pre-push` | Runs all code checks and prints summary at teh end. |
| `yarn type_check` | `tsc ./` | Checks types |
| `yarn lint_check` | `eslint ./` | Runs ESLint and prints any warnings or errors |
| `yarn format_check` | `prettier --check ./` | Checks formatting using Prettier |
| `yarn reformat` | `prettier --write ./` | Reformats files using Prettier |

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The test login is:

-   Username: potato@potato.com
-   Password: asdfasdf

Currently a user can create and edit "categories," which are groups of "tags." The information will be automatically persisted on the test server https://expense-tracker-test-api.herokuapp.com/

Each page has a dedicated file under `pages/`, and re-usable components are in `components/`. The `redux` folder is for client-side storage code, and the `pages/_app.tsx` is a special file used by Next.js.

### Dependencies

-   NextJS: generates the webserver and serves React components from `pages/`
-   ReactJS: functional UI design
-   Redux: allows shared state between NextJS pages
-   React-Cookie: for storing authentication tokens

## General links

-   Framework I'm using: https://nextjs.org/docs/getting-started
-   Main Component Library (see for styling and stuff too): https://material-ui.com/getting-started/usage/
-   Client-side data: https://redux.js.org/tutorials/essentials/part-1-overview-concepts
-   Figma Mocks: https://www.figma.com/file/7BFFhw1Gk07gBDjh0aXNSV/tags?node-id=0%3A1

### File organization

Below are notes on how the files are organized, and what each module is used for.

#### Pages

The `pages/` folder contains a single file for each webpage. The URLs of each webpage correspond directly to their names and file structure under `pages/`, as per https://nextjs.org/docs/routing/introduction. The `_app.js` page contains special shared functionality.

All files that are not in subfolders do not require authentication to access. This includes `login`, `sign_up`, and `welcome`, and may be expanded in the future. All files that are in one of the three subfolders require a user to be logged in to access. They are effectively a part of the `app`.

The app page are broken up into three modules:

-   dashboard
-   expense
-   category

**Dashboard** is the default landing page, and will contain the views and graphics for viewing expense summaries.

**Expense** is where a user will be able to create/edit/delete expenses. The default view will be a spreadsheet summary.

**Category** is where a user will be able to create new categories and customize the tags in each category.

#### API

The `api/` folder contains functions that call the external API server to fetch and post data. The API is separated into three categories, matching the three page groups. Each folder has two files:

-   call.ts
-   types.ts

Types should be defined in `types.ts` and should specify input and output types of each call function in `call.ts`. The inputs should be named \*Params, and the outputs should be name \*Data

Call functions should be named \*Call, and should always return a Promise of some Data type. The Params should be supplied by the pages, and the outgoing Data will go to the Redux actions.

#### Redux

The `redux/` folder contains a typical Redux setup. Please start by reading a bit about redux: https://redux.js.org/.

All update actions are created using `redux-thunk` as store updates require API data which must execute asynchronously (we don't know how long the API will take to respond). All action creators should be named \*Action.

`store.ts` contains the root store definitions, and combines reducers/state from the three slices (slices is a Redux term), which match up with the three API and page groups. Slices are defined with three files: `action.ts`, `types.ts`, `reducer.ts`.

All state and action types must be defined in `types.ts`.

All action creators are defined in `action.ts`. They should all take in a \*Data type as input (defined in `api/`), and then output an \*Action type (defined in the neighboring `types.ts` file).
