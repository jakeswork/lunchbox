import withStyles from 'react-jss';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import styles from './styles';
import Selection from './Selection';
import { State } from '../../../../reducers';
import { OptionalUserPayload, SET_USER } from '../../../../reducers/user/types';

const mapStateToProps = ({ user }: State) => ({ user })

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUser: (payload: OptionalUserPayload) => dispatch({ type: SET_USER, payload })
})

const styled = withStyles(styles)(Selection);

export default connect(mapStateToProps, mapDispatchToProps)(styled);
