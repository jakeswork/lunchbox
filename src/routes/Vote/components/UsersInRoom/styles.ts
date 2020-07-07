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
  }
});

export type Classes = {
  list: string;
  listItem: string;
  listItemText: string;
  tooltip: string;
};
