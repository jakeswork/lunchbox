import { Theme } from "../../../../utils/theme";

export default (theme: Theme) => ({
  list: {
    padding: 0,
    margin: '16px 0',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '8px 0',
  },
  listItemText: {
    marginBottom: 0,
    marginLeft: 8
  },
  tooltip: {
    fontFamily: theme.fontFamily,
  },
  confettiWrapper: {
    userSelect: 'none',
    pointerEvents: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2
  },
  overflow: {
    maxHeight: 224,
    overflowY: 'scroll',
    marginBottom: 24
  },
  pill: {
    padding: '8px 16px',
    margin: '16px 4px',
    borderRadius: 32,
    background: theme.colorPrimary,
    display: 'inline-block',
    verticalAlign: 'middle',
    '& > span': {
      color: 'white'
    }
  }
});

export type Classes = {
  list: string;
  listItem: string;
  listItemText: string;
  tooltip: string;
  confettiWrapper: string;
  overflow: string;
  pill: string;
};
