import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/Loginfolder/LoginForm';
import Overview from './components/DashboardPanel/PagesLinks.jsx/Overview';
import Admin from './components/DashboardPanel/PagesLinks.jsx/Admin';
import Blog from './components/DashboardPanel/PagesLinks.jsx/Blog';
import EventsDates from './components/DashboardPanel/PagesLinks.jsx/EventsDates';
import Videos from './components/DashboardPanel/PagesLinks.jsx/Videos';
import SideNavbar from './components/DashboardPanel/SideNavbar';
import HomePanel from './components/DashboardPanel/HomePanel.jsx/HomePanel';
import Settings from './components/DashboardPanel/PagesLinks.jsx/Settings';
import Images from './components/DashboardPanel/PagesLinks.jsx/Images';

function App() {

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <Routes>
          <Route path='/' element ={<LoginForm/>} />


          {/* Dashboard Routes */}
          <Route path='dashboard' element= {<SideNavbar/>}>

          <Route index element= {<HomePanel/>}/>
          <Route path='dashpanel/overview' element= {<Overview/>}/>
          <Route path='dashpanel/admin' element= {<Admin/>}/>
          <Route path='dashpanel/blog' element= {<Blog/>}/>
          <Route path='dashpanel/events&dates' element= {<EventsDates/>}/>
          <Route path='dashpanel/images' element= {<Images/>}/>
          <Route path='dashpanel/videos' element= {<Videos/>}/>
          <Route path='dashpanel/settings' element= {<Settings/>}/>
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App;
