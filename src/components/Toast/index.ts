import withStyles from 'react-jss';

import styles from './styles';
import Toast from './Toast';

export default withStyles(styles)(Toast);

export { toast as emit } from 'react-toastify';
