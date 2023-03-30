import {Route, Switch} from 'react-router-dom'

import Home from './pages/Home/home'
import Login from './pages/Login/login'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <div className="react-app">
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </div>
  </Switch>
)

export default App
