import { createBrowserRouter, RouterProvider } from 'react-router';

import { Home } from './pages/home';
import { Admin } from './pages/admin';
import { Login } from './pages/login';
import { Networks } from './pages/networks';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/admin',
    element: <Admin />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin/social',
    element: <Networks />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;