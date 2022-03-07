import { Routes, Route } from "react-router-dom";
import {
  SignupForm,
  LoginForm,
  MapLocations,
  MapAddLocation,
  Profile,
} from "./pages";
import { IsPrivate, IsAnon } from "./components";

function RootNavigation() {
  return (
    <Routes>
      <Route path="/" element={<h2>Home</h2>} />
      <Route path="/map" element={<MapLocations />} />
      <Route path="/discover" element={<h1>Discover</h1>} />
      <Route path="/add-location" element={<MapAddLocation />} />
      <Route path="/events" element={<h1>Events</h1>} />

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
    </Routes>
  );
}

export default RootNavigation;
