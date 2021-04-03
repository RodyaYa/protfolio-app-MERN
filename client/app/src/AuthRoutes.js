import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import MemoriesPage from "./pages/Memories/MemoriesPage";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import CreateMemory from "./pages/Memories/CreateMemory";
import SingleMemoryPage from "./pages/Memories/SingleMemoryPage";

export const AuthRoutes = () => {
  return (
    <Switch>
      <Route path="/main" exact>
        <MainPage />
      </Route>

      <Route path="/memories" exact>
        <Header />
        <MemoriesPage />
      </Route>

      <Route path="/memories/by-tags/:tags" exact>
        <Header />
        <MemoriesPage />
      </Route>

      <Route path="/memories/create">
        <Header />
        <CreateMemory />
      </Route>

      <Route path="/memories/:id" exact>
        <Header />
        <SingleMemoryPage />
      </Route>

      <Route path="/about" exact>
        <Header />
        <AboutPage />
      </Route>

      <Route path="/contacts" exact>
        <Header />
        <ContactPage />
      </Route>
      <Redirect from="/" to="/main" />
    </Switch>
  );
};
