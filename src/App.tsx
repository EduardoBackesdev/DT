import './App.css'
import './components/login/login'
import { Login } from './components/login/login'
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Menu } from './components/privatePages/menu/menu';
import store from './store/store'
import { Provider } from 'react-redux';

const queryClient = new QueryClient();

function App() {

  const isAutthenticated = ()=>!!localStorage.getItem('token')

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
            <Routes>        
                  <Route path='/' element={<Login/>}/> 
                  <Route path='menu' element={ isAutthenticated() ? <Menu /> : <Navigate to="/" replace /> }/>
            </Routes>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
