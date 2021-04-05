import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Song from "./Song";
import Artist from "./Artist";
import Playlist from "./Playlist";
import Album from "./Album";
import NotFound from "./NotFound";
import ErrorBoundary from "./ErrorBaoundry";

export default function Navbar() {
  return (
    <div>
      <nav>
        <h2>Music Service</h2>
        <Router>
          <Link to="/">Home</Link>
          <Switch>
            <ErrorBoundary>
              <Route exact path="/" component={Home} />
            </ErrorBoundary>
            <ErrorBoundary>
              <Route exact path="/song/:id" component={Song} />
            </ErrorBoundary>
            <ErrorBoundary>
              <Route exact path="/artist/:id" component={Artist} />
            </ErrorBoundary>
            <ErrorBoundary>
              <Route exact path="/album/:id" component={Album} />
            </ErrorBoundary>
            <ErrorBoundary>
              <Route exact path="/playlist/:id" component={Playlist} />
            </ErrorBoundary>
            <ErrorBoundary>
              <Route path="/" component={NotFound} />
            </ErrorBoundary>
          </Switch>
        </Router>
      </nav>
    </div>
  );
}
