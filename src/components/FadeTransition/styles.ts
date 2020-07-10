import { TransitionStatus } from "react-transition-group/Transition";

type TransitionStyles = {
  [key in TransitionStatus]: any
}

export const transitionStyles: TransitionStyles = {
  entering: {
    opacity: 1,
    transform: 'scale(1)',
  },
  entered: {
    opacity: 1,
    transform: 'scale(1)',
  },
  exiting: {
    opacity: 0,
    transform: 'scale(0.9)'
  },
  exited: {
    opacity: 0,
    transform: 'scale(0.9)'
  },
  unmounted: {}
};

export default {
  root: ({ timeout = 300 }) => ({
    transition: `all ${timeout}ms ease-in-out`,
    opacity: 0,
    transform: 'scale(0.9)',
    transformOrigin: 'right'
  })
};

export type Classes = {
  root: string;
}
