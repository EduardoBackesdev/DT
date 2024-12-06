import './App.css'
import './components/login/login'
import { Login } from './components/login/login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Menu } from './components/privatePages/menu/menu';
import store from './store/store'
import { Provider, } from 'react-redux';

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>  
                  <Route path='/menu' element={!!localStorage.getItem('token') ? <Menu /> : <Login /> } />
                  <Route path='/' element={!!localStorage.getItem('token') ? <Navigate to='/menu'/> : <Login />} />
                </Routes> 
            </BrowserRouter>
        </Provider>
      </QueryClientProvider>
  )
}

export default App
