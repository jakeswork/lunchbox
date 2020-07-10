import withStyles from 'react-jss';
import { connect } from 'react-redux';

import Messaging from './Messaging';
import styles from './styles';
import { State } from '../../../../reducers'

const mapStateToProps = ({ user }: State) => ({ user })

const styled = withStyles(styles)(Messaging);

export default connect(mapStateToProps)(styled);
