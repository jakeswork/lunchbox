import withStyles from 'react-jss';
import { connect } from 'react-redux';

import UsersInRoom from './UsersInRoom';
import styles from './styles';
import { State } from '../../../../reducers';

const mapStateToProps = ({ user }: State) => ({ user })

const styled = withStyles(styles)(UsersInRoom);

export default connect(mapStateToProps)(styled)
