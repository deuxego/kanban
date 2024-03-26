import { Navigate, Outlet } from 'react-router-dom';
import { useInit } from 'shared/hooks';
import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/sidebar';

export const MainLayout = () => {
  const isAuth = useInit();

  return isAuth ? (
    <div className="flex relative main-container">
      <Sidebar />

      <div className="relative w-full">
        <Outlet />
      </div>

      <Navbar />
    </div>
  ) : (
    <Navigate to={'/auth/signup'} />
  );
};

export const AuthLayout = () => {
  return (
    <div className="flex-x-center pt-[200px] h-[100vh]">
      <Outlet />
    </div>
  );
};
