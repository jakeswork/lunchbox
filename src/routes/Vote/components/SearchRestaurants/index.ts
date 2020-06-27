import withStyles from 'react-jss';
import { connect } from 'react-redux';

import { State } from '../../../../reducers';
import SearchRestaurants from './SearchRestaurants';
import styles from './styles';

const mapStateToProps = ({ user }: State) => ({ user })

const styled = withStyles(styles)(SearchRestaurants);

export default connect(mapStateToProps)(styled)
