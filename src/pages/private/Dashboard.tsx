import React, { lazy, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { NavBar } from '../../components/NavBar';
import { PrivateRoutes } from '../../models';

import { AccountGuard } from '../../guards/account.guard';
import { RoutesWithNotFound } from '../../utilities/RoutesWithNotFound.utility';


const Home = lazy(() => import('./Home/Home'));
const About = lazy(() => import('./About/About'));
const QueryAccount = lazy(() => import('./Q_Accounts/QueryAccount'));
const QueryGroup = lazy(() => import('./Q_Group/QueryGroup'));
const QueryAdvanced = lazy(() => import('./Q_Advanced/QueryAdvanced'));
const EstadoSuc = lazy(() => import('./querys/Estado/EstadoSuc'));
const ApCiWeek = lazy(() => import('./querys/ApWeek/ApCiWeek'));
const Batery = lazy(() => import('./querys/Batery/Batery'));
const ApCi = lazy(() => import('./querys/ApCi/ApCi'));
const Alarm = lazy(() => import('./querys/Alarm/Alarm'));
const Users = lazy(() => import('./Users/Users'));
const Profile = lazy(() => import('./Profile/Profile'));
const Groups = lazy(() => import('./Groups/Groups'));
const UserAccounts = lazy( () => import('./Users/UserAccounts'));


export const Dashboard = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      
      <Header setOpenMenu={setOpenMenu} />

      {/* <Shade /> */}
      <main className='main'>
        <section className='navbar'>
          <NavBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </section>
        <section className='dashboard'>
          <RoutesWithNotFound>
            <Route path={PrivateRoutes.HOME} element={<Home />} />
            <Route path={PrivateRoutes.Q_ACCOUNT} element={<QueryAccount />} />
            <Route path={PrivateRoutes.INFO} element={<About />} />
            <Route path={PrivateRoutes.SETTINGS} element={<h1>Settings</h1>} />
            <Route path={PrivateRoutes.Q_GROUP} element={<QueryGroup />} />
            <Route path={PrivateRoutes.Q_ADVANCED} element={<QueryAdvanced />} />
            <Route element={<AccountGuard />}>
              <Route path={PrivateRoutes.STATE_SUC} element={<EstadoSuc />} />
              <Route path={PrivateRoutes.AP_CI_WEEK} element={<ApCiWeek />} />
              <Route path={PrivateRoutes.BATERY} element={<Batery />} />
              <Route path={PrivateRoutes.AP_CI} element={<ApCi />} />
              <Route path={PrivateRoutes.ALARM} element={<Alarm />} />
            </Route>
            <Route path={PrivateRoutes.USERS} element={<Users />} />
            <Route path={PrivateRoutes.USER_ACCOUNTS} element={<UserAccounts />} />
            <Route path={PrivateRoutes.PROFILE} element={<Profile />} />
            <Route path={PrivateRoutes.GROUPS} element={<Groups />} /> 
            <Route path='/' element={<Navigate to={PrivateRoutes.HOME} />} />
          </RoutesWithNotFound>
        </section>
      </main>

    </>
  )
}

export default Dashboard;
