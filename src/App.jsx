import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';

import { Home } from './pages/home';
import { Admin } from './pages/admin';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Networks } from './pages/networks';
import { Aparence } from './pages/aparence';
import { ProfilePage } from './pages/profile';
import { Private } from './routes/Private';
import { Header } from './compents/Header';
import { Container } from './compents/Layout/Container';
import { NaviSidebar } from './compents/NavSidebar';
import { Preview } from './compents/Preview';

function AppLayout() {
  return (
    <>
      <Header />
      <Container>
        <NaviSidebar />
        <Outlet />
        <Preview />
      </Container>
    </>
  );
}

function AuthLayout() {
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/admin',
        element: (
            <Admin />
        ),
      },
      {
        path: '/admin/social',
        element: (
            <Networks />
        ),
      },
      {
        path: '/admin/profile',
        element: (
            <ProfilePage />
        ),
      },
      {
        path: '/admin/aparence',
        element: (
          <Private>
            <Aparence />
          </Private>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;