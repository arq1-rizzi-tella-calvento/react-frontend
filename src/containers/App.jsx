import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SurveyConfirmation from './SurveySummary.jsx';
import SubjectsPoll from '../components/SubjectsPoll.jsx';
import { surveyOptions, submitSurvey, editSurvey, updateSurvey } from '../actions/subjects.js';
import Summary from './Summary';

const FourOhFour = () => <h1>404</h1>;
const buildPoll = (fetchFunc, submitFunc) => {
  return ({ match }) => <SubjectsPoll match={match} fetch={fetchFunc} submit={submitFunc} />
}


const App = () => (
  <BrowserRouter>
    <div className='container-fluid' style={{paddingBottom: 25 + 'px', paddingTop: 25 + 'px'}}>
      <Switch>
        <Route exact path="/:token" component={SignIn} />
        <Route exact path="/signup/:token" component={SignUp} />
        <Route exact path="/survey/:token" render={buildPoll(surveyOptions, submitSurvey)}/>
        <Route exact path="/survey/:token/edit" render={buildPoll(editSurvey, updateSurvey)}/>
        <Route exact path="/summary" component={SurveyConfirmation} />
        <Route exact path="/director/:id" component={Summary} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App
