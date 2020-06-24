import Home from "./Home";
import Vote from './Vote';
import FZF from './404';
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
  },
  {
    path: "/404",
    Component: FZF,
    title: "Lunchbox | We couldn't find that vote..."
  }
];

export default routeConfiguration;
