import './App.css';
import 'antd/dist/antd.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Landing from './components/layout/Landing';
import NotFound from './views/NotFound';
import { Auth } from './views/Auth';
import Home from './views/Home';
import Profile from './views/profile/Profile';
import Groups from './views/Groups';
import ProtectedRoute from './protected/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Auth authRoute='login'/>}/>
        <Route path='/register' element={<Auth authRoute='register'/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/groups' element={<Groups/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
