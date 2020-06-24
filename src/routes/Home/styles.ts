import { Theme } from "../../utils/theme";

export default (theme: Theme) => ({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  headingImg: {
    maxWidth: 360,
    marginRight: 32
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 72,
  },
  dotsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  dot: {
    width: 8,
    margin: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: theme.colorGrey
  },
  dotActive: {
    backgroundColor: theme.colorPrimary
  },
  slide: {
    paddingTop: 24,
    height: 360,
    display: 'flex',
    alignItems: 'space-around',
    flexDirection: 'column',
  },
  nextButton: {
    width: '100%'
  },
  suggestionsWrapper: {
    borderRadius: 4,
    border: `1px solid ${theme.colorGrey}`,
    padding: '16px 24px',
    margin: '4px 0',
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    maxHeight: 160,
    overflowY: 'scroll',
    zIndex: 2,
    backgroundColor: 'white'
  },
  suggestion: {
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.colorGrey}`,
    marginTop: 8,
    paddingBottom: 4,
    marginBottom: 4,
  },
  link: {
    textDecoration: 'none',
    fontSize: 16,
    fontFamily: 'monospace',
    color: theme.colorPrimary,
    padding: 16,
    margin: '16px 0',
    display: 'block',
    background: theme.colorGrey,
    borderRadius: 4,
    overflowX: 'scroll',
  },
  linkWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 32,
  },
});

export type Classes = {
  main: string;
  headingImg: string;
  buttonsContainer: string;
  dotsWrapper: string;
  dot: string;
  slide: string;
  dotActive: string;
  nextButton: string;
  suggestionsWrapper: string;
  suggestion: string;
  linkWrapper: string;
  link: string;
  copyButton: string;
  copyButtonIcon: string;
}
