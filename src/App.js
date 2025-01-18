import './App.css'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import SpecificState from './components/SpecificState'
import About from './components/About'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/state/:stateCode" component={SpecificState} />
    <Route exact path="/about" component={About} />
  </Switch>
)

export default App
