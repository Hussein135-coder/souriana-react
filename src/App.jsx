import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Error from "./pages/Error";
import Home from "./pages/Home";
import PersistLogin from "./components/Auth/PersistLogin";
import Layout from "./components/Layout";
import RequireAuth from "./components/Auth/RequireAuth";
import Authed from "./components/Auth/Authed";
import Login from "./pages/Login";
import Money from "./pages/Money";
import Analytics from "./pages/Analytics";
import { AnimatePresence } from "framer-motion";
function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route element={<Layout />}>
            <Route element={<PersistLogin />}>
              <Route path="*" element={<Error />} />
              <Route path="/" element={<Home />} />

              <Route element={<Authed />}>
                <Route path="login" element={<Login />} />
              </Route>

              {/* Protected Routes */}

              <Route element={<RequireAuth />}>
                <Route path="money" element={<Money />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
