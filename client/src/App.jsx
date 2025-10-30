import { RouterProvider } from 'react-router-dom';
import { router } from './Routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
