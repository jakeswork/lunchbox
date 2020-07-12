import { Theme } from "../../utils/theme";

const column = (size: number) => ({
  margin: '8px 8px 0',
  padding: '16px 16px 0',
  width: `calc(${size}% - 48px)`,
  minWidth: (size * 5),
  display: 'flex',
  flexDirection: 'column',
})

export default (theme: Theme) => ({
  logo: {
    position: 'absolute',
    top: 24,
    left: 24,
    userSelect: 'none',
  },
  root: {
    display: 'flex',
    padding: '64px 32px 0',
    background: theme.colorWhite,
  },
  colSm: column(25),
  colMd: column(50),
  colLg: column(75),
  colFull: column(100),
  modal: {
    height: 'auto'
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    '& > img': {
      width: 180,
      marginLeft: 16
    }
  },
});

export type Classes = {
  logo: string;
  root: string;
  colSm: string;
  colMd: string;
  colLg: string;
  colFull: string;
  modal: string;
  header: string;
};
