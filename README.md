# Argus Dashboard project
## Project launch
* Use `docker run`
* or `npm install && npm start` to start server on `$PORT` (default 3000)
* or `NODE_ENV="production" webpack` and point nginx / other web-server to `dist` folder
## Short overview
Project is built with [React](https://facebook.github.io/react/). It uses [Redux](https://github.com/rackt/redux) as application state storage, react-router for routing.

For handling asynchronyous actions [Redux-Saga](yelouafi.github.io/redux-saga/) are utilizied implementing [CQRS](https://msdn.microsoft.com/en-us/library/jj591569.aspx) pattern for better isolation of async logic.

Project uses [ducks](https://github.com/erikras/ducks-modular-redux) philosophy for organizing redux-related stuff. Additionally each module if exports sagas, will provide named export `sagas` which should be an array of sagas, related to this module.

Please, for the sake of consistency, do **not** add any other async-related middlewares (like `redux-thunk`, `redux-promise`, etc.) - all of these could be easily expressed with sagas.

Project contains a sample AJAX request to demonstrate working with async API. Please, **never** issue redux actions in `componentWillMount`/`constructor`, use `componentDidMount` instead.

Project uses [CSS Modules](https://github.com/css-modules/css-modules) for isolating component CSS. CSS files are set up to bypass CSS modules, that is done if any component in `node_modules` will require css to be included.

Project implements simple hot module reload support (without maintaining internal state). Please do not add `hmre` transform without explicit need.

Project JavaScript style guide is based on [eslint-config-airbnb](https://github.com/airbnb/javascript)

## TODO
* Add `redux-form` for handling form data
* Add demo how websocket streaming / any dynamic "streaming" could be implemented with sagas pull approach
* Add `react-helmet` for handling title / meta-tags / etc.
* Integrate `better-npm-run` to add webpack build as `npm run build`
