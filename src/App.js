import { useEffect } from 'react';
import { connect } from 'react-redux';
import Dashboard from './components/Dashboard';
import setAuthToken from './utils/setAuthToken';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './routing/PrivateRoute';
import PublicRoute from './routing/PublicRoute';
import SignUp from './components/SignUp';

const App = ({ token, loading }) => {
  useEffect(() => {
    setAuthToken(token);
    return () => {
      setAuthToken(null);
    };
  }, [token]);
  return (
    <div>
      <Router>
        <>
          <Switch>
            <PublicRoute exact token={token} path='/login' component={Login} />
            {/* <PublicRoute
              exact
              token={token}
              path='/signup'
              component={SignUp}
            /> */}
            <PrivateRoute
              loading={loading}
              token={token}
              path='/'
              component={Dashboard}
            />
          </Switch>
        </>
      </Router>
    </div>
  );
};

const mapStateToProps = ({ user: { token, loading } }) => ({
  token,
  loading,
});
export default connect(mapStateToProps)(App);
