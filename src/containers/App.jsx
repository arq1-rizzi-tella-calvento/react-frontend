import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SurveyConfirmation from './SurveySummary.jsx';
import SubjectsPoll from '../components/SubjectsPoll.jsx';
import Summary from './Summary';

const FourOhFour = () => <h1>404</h1>;

const App = () => (
  <BrowserRouter>
    <div className='container'>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/survey/:user_id" component={SubjectsPoll} />
        <Route exact path="/summary" component={SurveyConfirmation} />
        <Route exact path="/director/:id" component={Summary} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App
