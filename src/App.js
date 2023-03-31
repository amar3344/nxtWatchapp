import {Route, Switch} from 'react-router-dom'

import Home from './pages/Home/home'
import Login from './pages/Login/login'
import ProtectedRoute from './components/ProtectedRoute/protectedRoute'
import NotFound from './pages/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <div className="react-app">
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/login" component={Login} />
      <Route path="notfound" component={NotFound} />
    </div>
  </Switch>
)

export default App
