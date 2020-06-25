import withStyles from "react-jss";
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { withRouter } from 'react-router-dom';

import Home from "./Home";
import styles from "./styles";
import { State } from '../../reducers'
import { SET_USER } from '../../reducers/user/types';

const mapStateToProps = (state: State) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUser: (payload: any) => dispatch({ type: SET_USER, payload })
})

const routed = withRouter(Home);

const styled = withStyles(styles)(routed)
 
export default connect(mapStateToProps, mapDispatchToProps)(styled)
