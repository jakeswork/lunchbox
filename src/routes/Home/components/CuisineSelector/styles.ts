import { Theme } from "../../../../utils/theme";

export default (theme: Theme) => ({
  pill: {
    padding: '8px 16px',
    margin: 4,
    borderRadius: 32,
    background: theme.colorGrey,
    cursor: 'pointer',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  pillActive: {
    backgroundColor: theme.colorPrimary,
    color: 'white'
  },
  root: {
    textAlign: 'center',
    margin: '8px 0',
    maxHeight: 152,
    overflowY: 'scroll',
  }
});

export type Classes = {
  pill: string;
  root: string;
  pillActive: string;
}
