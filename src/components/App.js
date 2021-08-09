import React from "react";
import Header from "./ui/Header";
import {
  createTheme,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import theme from "./ui/Theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  // wrap app in themeProvider and switch route from react-routr
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <div>Home</div>} />
          <Route exact path="/services" component={() => <div>services</div>} />
          <Route
            exact
            path="/customsoftware"
            component={() => <div>customisation</div>}
          />
          <Route
            exact
            path="/mobileapps"
            component={() => <div>Mobile apps</div>}
          />
          <Route
            exact
            path="/website"
            component={() => <div>website development</div>}
          />
          <Route
            exact
            path="/revolution"
            component={() => <div>revolution"</div>}
          />
          <Route exact path="/about" component={() => <div>about</div>} />
          <Route exact path="/contact" component={() => <div>contact</div>} />
          <Route exact path="/estimate" component={() => <div>estimate</div>} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
