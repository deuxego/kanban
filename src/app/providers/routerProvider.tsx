import { Signin, Signup } from 'pages/auth';
import { BoardPage } from 'pages/board/board-page';
import { AuthLayout, MainLayout } from 'pages/layouts';
import { MainPage } from 'pages/main';
import { WorkspacePage } from 'pages/workspace';
import { RouterProvider as BaseRouterProvider, createBrowserRouter } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'signin',
        element: <Signin />
      },
      {
        path: 'signup',
        element: <Signup />
      }
    ]
  },

  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/workspace/',
        element: <WorkspacePage />
      },
      {
        path: '/workspace/:workspaceId',
        element: <WorkspacePage />
      },
      {
        path: '/workspace/:workspaceId/board/:boardId',
        element: <BoardPage />
      }
    ]
  }
]);

export const RouterProvider = () => {
  return <BaseRouterProvider router={router} />;
};
