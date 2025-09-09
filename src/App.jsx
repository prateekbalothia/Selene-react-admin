import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import './App.css'
import MenuBar from './Components/Menu/MenuBar'
import Dashboard from './Components/Dashboard/Dashboard'
import Sitesetting from './Components/Site setting/Sitesetting'
import Navbar from './Components/Navbar/Navbar'
import Addnav from './Components/Navbar/Addnav'
import AddMedia from './Components/Media/AddMedia'
import Media from './Components/Media/Media'

function App() {
  


  return (
    <>
      <BrowserRouter>
        
            <MenuBar />
            <div className="content">
              <Routes>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/site-setting' element={<Sitesetting/>}/>
                <Route path='/menu' element={<Navbar/>}/>
                <Route path='/add-navitem' element={<Addnav/>}/>
                <Route path='/all-media' element={<Media/>}/>
                <Route path='/add-media' element={<AddMedia/>}/>
              </Routes>
            </div>

      </BrowserRouter>
    </>
  )
}

export default App
