import Home from "./Home";
import Vote from './Vote';
import FOF from './404';
import { RouteConfiguration } from "./index.d";

const routeConfiguration: RouteConfiguration[] = [
  {
    path: "/appetite/",
    Component: Home,
    title: "Appetite | Find the perfect place to eat."
  },
  {
    path: "/appetite/vote/:id",
    Component: Vote,
    title: "Appetite | Vote for your favourite restaurants."
  },
  {
    path: "/appetite/404",
    Component: FOF,
    title: "Appetite | We couldn't find that vote..."
  }
];

export default routeConfiguration;
