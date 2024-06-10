import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import ProductsList from './pages/ProductsList/ProductsList';
import ProductInfoPage from './pages/ProductInfoPage/ProductInfoPage';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/:products' element={<ProductsList/>} />
            <Route path='/:products/:id' element={<ProductInfoPage />} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/login' element={<Login />}/>
            <Route path='/signUp' element={<SignUp />}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
