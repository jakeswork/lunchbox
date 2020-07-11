import Home from "./Home";
import Vote from './Vote';
import FOF from './404';
import { RouteConfiguration } from "./index.d";

const routeConfiguration: RouteConfiguration[] = [
  {
    path: "/",
    Component: Home,
    title: "Appetite | Find the perfect place to eat."
  },
  {
    path: "/vote/:id",
    Component: Vote,
    title: "Appetite | Vote for your favourite restaurants."
  },
  {
    path: "/404",
    Component: FOF,
    title: "Appetite | We couldn't find that vote..."
  }
];

export default routeConfiguration;
