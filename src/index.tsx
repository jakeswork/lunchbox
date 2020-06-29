import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ThemeProvider } from 'react-jss';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import routes from "./routes";
import theme from './utils/theme';
import store from './reducers';

render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            {routes.map(({ path, Component, title }) => (
              <Route
                key={path}
                path={path}
                exact
                render={() => (
                  <>
                    <Helmet>
                      <title>{title}</title>
                    </Helmet>
                    <Component />
                  </>
                )}
              />
            ))}
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
