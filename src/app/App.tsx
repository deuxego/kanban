import { QueryClientProvider } from 'react-query';
import { RouterProvider } from './providers';
import { queryClient } from 'shared/consts';
import './styles/index.css';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider />
    </QueryClientProvider>
  );
};

export default App;
