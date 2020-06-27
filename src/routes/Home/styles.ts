import { Theme } from "../../utils/theme";

export default (theme: Theme) => ({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  headingImg: {
    maxWidth: 420,
    marginRight: 32
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 32,
    position: 'relative',
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
    height: 360,
    display: 'flex',
    flexDirection: 'column',
  },
  nextButton: {
    width: '100%'
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
  joinVotePanel: {
    padding: 16,
    position: 'absolute',
    bottom: -208,
    right: 0,
    left: 0,
    borderRadius: 4,
    border: `1px solid ${theme.colorGrey}`,
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
  }
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
  linkWrapper: string;
  link: string;
  copyButton: string;
  copyButtonIcon: string;
  joinVotePanel: string;
}
