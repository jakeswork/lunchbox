const column = (size: number) => ({
  margin: 8,
  padding: 16,
  width: `calc(${size}% - 48px)`,
  minWidth: (size * 5),
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
})

export default {
  root: {
    display: 'flex',
    padding: '64px 32px',
  },
  colSm: column(25),
  colMd: column(50),
  colLg: column(75),
  colFull: column(100),
};

export type Classes = {
  root: string;
  colSm: string;
  colMd: string;
  colLg: string;
  colFull: string;
};
