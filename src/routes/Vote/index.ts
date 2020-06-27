import withStyles from 'react-jss';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { State } from '../../reducers'
import { User } from '../../types/constants';
import Vote from './Vote';
import styles from './styles';
import { SET_USER, OptionalUserPayload, UPDATE_USER } from '../../reducers/user/types';

const mapStateToProps = ({ user }: State) => ({ user })

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUser: (payload: User) => dispatch({ type: SET_USER, payload }),
  updateUser: (payload: OptionalUserPayload) => dispatch({ type: UPDATE_USER, payload })
})

const styled = withStyles(styles)(Vote)

const routed = withRouter(styled)

export default connect(mapStateToProps, mapDispatchToProps)(routed)

