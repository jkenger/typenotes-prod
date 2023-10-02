import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Layout from "./components/Layout";
import Public from "./components/Public";
import DashLayout from "./components/DashLayout";
const Login = lazy(() => import("./features/auth/Login"));
const Welcome = lazy(() => import("./features/auth/Welcome"));
const NotesList = lazy(() => import("./features/notes/NotesList"));
const UsersList = lazy(() => import("./features/users/UsersList"));
const RememberLogin = lazy(() => import("./features/auth/RememberLogin"));
import ProtectedRoute from "./components/ProtectedRoute";
import Refreshing from "./components/Refreshing";
import { capitalize } from "./components/helpers/capitalize";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== "/") {
      document.title = capitalize(pathname.replace("/", ""));
    }
  }, [pathname]);
  return (
    <Suspense fallback={<Refreshing />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />

          <Route path="login" element={<Login />} />
          <Route element={<RememberLogin />}>
            {/* /login */}

            {/* Protected */}
            <Route path="dashboard" element={<DashLayout />}>
              {/* /dashboard */}
              <Route index element={<Welcome />} />
              {/* /dashboard/notes */}
              <Route path="notes">
                <Route index element={<NotesList />} />
              </Route>
              {/* /dashboard/users */}
              <Route element={<ProtectedRoute />}>
                <Route path="users">
                  {/* <Route index element={<NewUser />} /> */}
                  <Route index element={<UsersList />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
