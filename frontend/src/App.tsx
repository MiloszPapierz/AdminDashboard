import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/authentication/LoginPage";
import RequireAuth from "./components/authentication/RequireAuth";
import MainPage from "./components/MainPage";
import Dashboard from "./components/dashboard/Dashboard";
import OrderList from "./components/order/OrderList";
import ProductList from "./components/product/ProductList";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route
        path="dashboard"
        element={
          <RequireAuth>
            <MainPage>
              <Dashboard />
            </MainPage>
          </RequireAuth>
        }
      />
      <Route
        path="products"
        element={
          <RequireAuth>
            <MainPage>
              <ProductList />
            </MainPage>
          </RequireAuth>
        }
      />
      <Route
        path="orders"
        element={
          <RequireAuth>
            <MainPage>
              <OrderList />
            </MainPage>
          </RequireAuth>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
