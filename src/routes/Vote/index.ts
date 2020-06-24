import withStyles from 'react-jss';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { State } from '../../reducers'
import { Room } from '../../types/constants';
import Vote from './Vote';
import styles from './styles';
import { SET_USER_ROOM } from '../../reducers/user/types';

const mapStateToProps = ({ user }: State) => ({ user })

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUserRoom: (payload: Room) => dispatch({ type: SET_USER_ROOM, payload })
})

const styled = withStyles(styles)(Vote)

const routed = withRouter(styled)

export default connect(mapStateToProps, mapDispatchToProps)(routed)

