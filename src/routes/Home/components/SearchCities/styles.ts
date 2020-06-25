import { Theme } from "../../../../utils/theme"

export default (theme: Theme) => ({
  suggestion: {
    cursor: 'pointer',
    padding: 16,
    borderRadius: 4,
  },
  suggestionHighlighted: {
    background: theme.colorGrey,
  },
});

export type Classes = {
  suggestion: string;
  suggestionHighlighted: string;
}
