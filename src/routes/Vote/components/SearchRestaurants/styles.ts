import { Theme } from "../../../../utils/theme";

export default (theme: Theme) => ({
  container: {
    maxWidth: 752,
    width: '100%',
    minWidth: 577,
    maxHeight: 'calc(100vh - 148px)',
    overflowY: 'scroll'
  },
});

export type Classes = {
  container: string;
};
