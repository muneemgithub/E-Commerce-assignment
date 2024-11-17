import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
// import { RouterProvider } from 'react-router-dom';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Productdetails from './Components/ProductDetail/productdetail';
import Layout from './Components/Layout/layout';
import { store } from './store';
import { Provider } from 'react-redux';


  const router = createBrowserRouter([{
    path:"/",
    element: <Layout />,
    children: [
        {
        path:"/",
        element: <App/>
      },
      {
        path:"product-details/:product_id",
        element: <Productdetails/>,
      },
  ]
}
    ],
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
<RouterProvider router={router} />
  </Provider>
);


