import { Theme } from '../../utils/theme';

export default (theme: Theme) => ({
  modal: {
    height: 460,
    width: 560,
    padding: 32,
    margin: '0 auto',
    background: 'white',
    position: 'relative',
    border: `1px solid ${theme.colorGrey}`,
    borderRadius: 4,
    '&:focus': {
      outlineColor: theme.colorPrimary
    }
  },
  closeModal: {
    position: 'absolute',
    top: 8,
    right: 8,
    cursor: 'pointer',
  },
})

export type Classes = {
  modal: string;
  closeModal:string;
}