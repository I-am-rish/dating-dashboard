import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import routes from './routes/index'
import './styles/style.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'




function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;
