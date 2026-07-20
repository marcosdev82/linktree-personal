import { createBrowserRouter, RouterProvider } from 'react-router';

import { Home } from './pages/home';
import { Admin } from './pages/admin';
import { Login } from './pages/login';
import { Networks } from './pages/networks';
import { Private } from './routes/Private';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/admin',
    element: <Private><Admin /></Private>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin/social',
    element: <Private><Networks /></Private>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;