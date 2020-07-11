import { Theme } from "../../../../utils/theme";

export default (theme: Theme) => ({
  button: {
    background: theme.colorPrimary,
    padding: 24,
    borderRadius: 100,
    cursor: 'pointer',
    border: 0,
    outline: 'none',
    color: 'white',
    position: 'fixed',
    bottom: 32,
    right: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chat: {
    position: 'fixed',
    right: 32,
    bottom: 124,
    height: 400,
    width: 320,
    margin: 0,
    padding: 24,
  },
  closeButton: {
    color: theme.colorGrey,
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 16
  },
  messageWrapper: {
    height: 286,
    marginBottom: 8,
    padding: 4,
    overflowY: 'scroll',
  },
  messageBubble: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > p': {
      color: theme.textPrimary,
      marginBottom: '4px 0',
      background: theme.colorPrimaryLight,
      borderRadius: 8,
      padding: '8px 16px',
    },
    '& > span': {
      marginTop: 24
    }
  },
  myMessage: {
    alignItems: 'flex-end',
    '& > p': {
      background: theme.colorPrimary,
      color: 'white',
    }
  }
});

export type Classes = {
  button: string;
  chat: string;
  closeButton: string;
  messageWrapper: string;
  messageBubble: string;
  myMessage: string;
};
