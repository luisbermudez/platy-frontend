import { Routes, Route } from "react-router-dom";
import { IsPrivate, IsAnon, CallAuthVerify } from "./components";
import { Navigate } from "react-router-dom";
import { gralRoutes, privateRoutes, anonRoutes } from "./config/routes";

function RootNavigation() {
  return (
    <Routes>
      {gralRoutes({}).map((route) => (
        <Route
          key={route.path}
          path={route.path}
          // element={<CallAuthVerify>{route.element}</CallAuthVerify>}
          element={route.element}
        />
      ))}

      {/* Private routes */}
      {privateRoutes({}).map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<IsPrivate>{route.element}</IsPrivate>}
        />
      ))}

      {/* Logged users */}
      {anonRoutes({}).map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<IsAnon>{route.element}</IsAnon>}
          // element={route.element}
        />
      ))}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RootNavigation;
