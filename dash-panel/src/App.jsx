import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/Loginfolder/LoginForm';
import HomePanel from './components/DashboardPanel/HomePanel.jsx/HomePanel';
import Overview from './components/DashboardPanel/PagesLinks.jsx/Overview';
import Admin from './components/DashboardPanel/PagesLinks.jsx/Admin';
import Blog from './components/DashboardPanel/PagesLinks.jsx/Blog';
import EventsDates from './components/DashboardPanel/PagesLinks.jsx/EventsDates';
import Images from './components/DashboardPanel/PagesLinks.jsx/Images';
import Videos from './components/DashboardPanel/PagesLinks.jsx/Videos';

function App() {

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <Routes>
          <Route path='/' element ={<LoginForm/>} />


          {/* Dashboard Routes */}
          <Route path='dashboard' element= {<HomePanel/>}>
          <Route index element= {<Overview/>}/>
          <Route path='admin' element= {<Admin/>}/>
          <Route path='blog' element= {<Blog/>}/>
          <Route path='eventsdates' element= {<EventsDates/>}/>
          <Route path='images' element= {<Images/>}/>
          <Route path='videos' element= {<Videos/>}/>
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App;
