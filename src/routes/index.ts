import Home from "./Home";
import Vote from './Vote';
import { RouteConfiguration } from "./index.d";

const routeConfiguration: RouteConfiguration[] = [
  {
    path: "/",
    Component: Home,
    title: "Lunchbox | Find the perfect place to eat."
  },
  {
    path: "/vote/:id",
    Component: Vote,
    title: "Lunchbox | Vote for your favourite restaurants."
  }
];

export default routeConfiguration;
