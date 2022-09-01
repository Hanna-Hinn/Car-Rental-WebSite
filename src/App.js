import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useAuthContext } from "./store/auth-context";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoadBackDrop from "../src/common/loadBackDrop";

const Auth = React.lazy(() => import("./components/Authentication/Auth"));
const Layout = React.lazy(() => import("./components/Layout/layout"));
const NotFound = React.lazy(() => import("./components/pages/notfound"));
const LandingPage = React.lazy(() => import("./components/pages/landingPage"));

function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <Suspense
      fallback={
        <div>
          <LoadBackDrop open={true} />
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<ProtectedRoute user={!isLoggedIn} />}>
            <Route path="/login" element={<Auth isLogin={true} />} />
            <Route path="/signup" element={<Auth isLogin={false} />} />
          </Route>

          <Route element={<ProtectedRoute user={isLoggedIn} />}>
            <Route path="/list" element={<Layout mode="list" />} />
            <Route path="/list/view/:id" element={<Layout mode="view" />} />
            <Route path="/history" element={<Layout mode="history" />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
