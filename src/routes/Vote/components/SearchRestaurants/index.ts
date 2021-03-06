import withStyles from 'react-jss';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../../../reducers';
import { OptionalUserPayload, SET_USER } from '../../../../reducers/user/types';
import SearchRestaurants from './SearchRestaurants';
import styles from './styles';

const mapStateToProps = ({ user }: State) => ({ user })

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUser: (payload: OptionalUserPayload) => dispatch({ type: SET_USER, payload })
})

const styled = withStyles(styles)(SearchRestaurants);

export default connect(mapStateToProps, mapDispatchToProps)(styled)
