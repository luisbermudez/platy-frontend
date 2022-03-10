import { Routes, Route } from "react-router-dom";
import {
  SignupForm,
  LoginForm,
  MapLocations,
  MapAddLocation,
  Profile,
  Home,
} from "./pages";
import { IsPrivate, IsAnon, CallAuthVerify } from "./components";
import { Navigate } from "react-router-dom";

function RootNavigation() {
  
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CallAuthVerify>
            <Home />
          </CallAuthVerify>
        }
      />
      <Route
        path="/map"
        element={
          <CallAuthVerify>
            <MapLocations />
          </CallAuthVerify>
        }
      />
      <Route
        path="/discover"
        element={
          <CallAuthVerify>
            <h1>Discover</h1>
          </CallAuthVerify>
        }
      />
      <Route
        path="/add-location"
        element={
          <CallAuthVerify>
            <MapAddLocation />
          </CallAuthVerify>
        }
      />
      <Route
        path="/events"
        element={
          <CallAuthVerify>
            <h1>Events</h1>
          </CallAuthVerify>
        }
      />

      {/* Private routes */}
      <Route
        path="/profile"
        element={
          <IsPrivate>
            <Profile />
          </IsPrivate>
        }
      />
      <Route
        path="/mylocations"
        element={
          <IsPrivate>
            <h1>My Locations</h1>
          </IsPrivate>
        }
      />
      <Route
        path="/favorites"
        element={
          <IsPrivate>
            <h1>My Favorites</h1>
          </IsPrivate>
        }
      />

      {/* Logged users */}
      <Route
        path="/signup"
        element={
          <IsAnon>
            <SignupForm />
          </IsAnon>
        }
      />
      <Route
        path="/login"
        element={
          <IsAnon>
            <LoginForm />
          </IsAnon>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RootNavigation;
