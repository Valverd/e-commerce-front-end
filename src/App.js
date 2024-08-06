import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import PrivateRoute from './auth/PrivateRoute';
import Home from './pages/Home/Home';
import ProductsList from './pages/ProductsList/ProductsList';
import ProductInfoPage from './pages/ProductInfoPage/ProductInfoPage';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import MyCart from './pages/MyCart/MyCart';

import {store, persistor} from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ToastContainer autoClose={3000} />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signUp' element={<SignUp />} />
              <Route path='/:products' element={<ProductsList />} />
              <Route path='/:products/:id' element={<ProductInfoPage />} />
              <Route path='/profile' element={<PrivateRoute> <Profile /> </PrivateRoute>} />
              <Route path='/my-cart' element={<PrivateRoute> <MyCart /> </PrivateRoute>} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
