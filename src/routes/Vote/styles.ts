import { Theme } from "../../utils/theme";

const column = (size: number) => ({
  margin: 8,
  padding: 16,
  width: `calc(${size}% - 48px)`,
  minWidth: (size * 5),
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
})

export default (theme: Theme) => ({
  root: {
    display: 'flex',
    padding: '64px 32px',
    background: theme.colorWhite,
  },
  colSm: column(25),
  colMd: column(50),
  colLg: column(75),
  colFull: column(100),
  modal: {
    height: 'auto'
  },
});

export type Classes = {
  root: string;
  colSm: string;
  colMd: string;
  colLg: string;
  colFull: string;
  modal: string;
};
