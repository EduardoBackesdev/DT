import './App.css'
import './components/login/login'
import { Login } from './components/login/login'
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Menu } from './components/privatePages/menu/menu';
import store from './store/store'
import { Provider, } from 'react-redux';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'

const stores = createStore({
  authName:'token',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider store={stores}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>  
                  <Route path='/' element={<Login />} />
                    <Route element={<AuthOutlet fallbackPath='/' />}>   
                      <Route path='/menu' element={ <Menu />} />
                    </Route>  
                  <Route/>
                </Routes> 
            </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
