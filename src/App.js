import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
//containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
//login 
const Login = React.lazy(()=> import("./Components/Login/Login"));
const pageNotFound = React.lazy(() =>import('./Components/404/404'));
class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/" name="Login Page" render={(props) => <Login {...props} />} />            
                      
            <Route exact path="/404" name="Page 404" render={(props) => <pageNotFound {...props} />} />
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
//       <Router>

//           <Switch>

//             <Route exact path='/'>
//               <Login />
//             </Route>

//             <>
//             <Navbar />
//               <Switch>
//                 <Route exact path='/Home' component={Home} />

//                 <Route exact path='/admins' component={Admin} />

//                 <Route exact path='/admins/create/' component={CreateAdmin} />

//                 <Route exact path='/admins/:id' component={AdminDetails} />
                  
//                 <Route exact path='/users' component={User} />

//                 <Route exact path='/users/create/' component={CreateUser} />

//                 <Route exact path='/users/:id' component={UserDetails} />

//                 <Route exact path='/cards' component={Card} />

//                 <Route exact path='/cards/create' component={CreateCard} />

//                 <Route exact path='/cards/:id' component={CardDetails} />

//                 <Route exact path='/organizations' component={Organization} />

//                 <Route exact path='/organizations/create/' component={CreateOrganization} />

//                 <Route exact path='/organizations/:id' component={OrganizationDetails} />

//                 <Route exact path='/activities' component={Activity} />

//                 <Route exact path='/activities/create/' component={CreateActivity} />

//                 <Route exact path='/activities/:id' component={ActivityDetails} />

//                 <Route exact path='/details' component={Detail} />

//                 <Route exact path='/details/create/' component={CreateDetail} />

//                 <Route exact path='/details/:id' component={DetailDetails} />

//                 <Route path='*' component={pageNotFound} />
//                 </Switch>
//             </>
            

//           </Switch>

//       </Router>
    );
  }
}
export default App
