import React from 'react'

//home
 const Home = React.lazy(() => import( './Components/Home/Home'));

// admin
const Admin = React.lazy(()=>import  ('./Components/Admin/Admin'));
const AdminDetails = React.lazy(()=>import  ('./Components/Admin/AdminDetails'));
const AdmCreateAdminin = React.lazy(()=>import  ('./Components/Admin/CreateAdmin'));
//user
const User = React.lazy(()=>import  ('./Components/User/User'));
const UserDetails = React.lazy(()=>import  ('./Components/User/UserDetails'));
const CreateUser = React.lazy(()=>import  ('./Components/User/CreateUser'));
//card
const Card = React.lazy(()=>import  ('./Components/Card/Card'));
const CardDetails = React.lazy(()=>import  ('./Components/Card/CardDetails'));
//Activity
const Activity = React.lazy(()=>import  ('./Components/Activity/Activity'));
const ActivityDetails = React.lazy(()=>import  ('./Components/Activity/ActivityDetails'));
const CreateActivity = React.lazy(()=>import  ('./Components/Activity/CreateActivity'));
//Detail
const Detail = React.lazy(()=>import  ('./Components/Detail/Detail'));
const AdmDetailDetailsin = React.lazy(()=>import  ('./Components/Detail/DetailDetails'));
const CreateDetail = React.lazy(()=>import  ('./Components/Detail/CreateDetail'));
//Organization
const Organization = React.lazy(()=>import  ('./Components/Organization/Organization'));
const OrganizationDetails = React.lazy(()=>import  ('./Components/Organization/OrganizationDetails'));
const CreateOrganization = React.lazy(()=>import  ('./Components/Organization/CreateOrganization'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Home', name: 'Home', component: Home },
  { path: '/admins', name: 'Admin', component: Admin },
  { path: '/users', name: 'User', component: User },
  { path: '/cards', name: 'Account', component: Card},
  { path: '/organizations', name: 'Organizations', component : Organization},
  { path: '/activities', name: 'Ativity', component : Activity},
  { path: '/details', name: 'Detail', component: Detail},
  { path: '/cards/:id' , name: 'Accounts', component:CardDetails} 


]
export default routes
 