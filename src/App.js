import {Route, Switch} from 'react-router-dom'

import Home from './pages/Home/home'
import Login from './pages/Login/login'
import Trending from './pages/Trending/trending'
import ProtectedRoute from './components/ProtectedRoute/protectedRoute'
import NotFound from './pages/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <div className="react-app">
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/trending" component={Trending} />
      <Route path="notfound" component={NotFound} />
    </div>
  </Switch>
)

export default App
