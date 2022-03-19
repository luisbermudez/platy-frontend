import * as PATHS from "../utils/paths";
import {
  SignupForm,
  LoginForm,
  MapLocations,
  MapAddLocation,
  Profile,
  Home,
  MyLocations,
  VideolocationDetails,
  EditVideolocation
} from "../pages";

export const gralRoutes = () => {
  return [
    {
      path: PATHS.HOMEPAGE,
      element: <Home />,
    },
    {
      path: PATHS.MAP,
      element: <MapLocations />,
    },
    {
      path: PATHS.DISCOVER,
      element: <h1>Discover</h1>,
    },
    {
      path: PATHS.ADDLOCATION,
      element: <MapAddLocation />,
    },
    {
      path: PATHS.EVENTS,
      element: <h1>Events</h1>,
    },
    {
      path: PATHS.DETAILS,
      element: <VideolocationDetails />,
    },
  ];
};

export const privateRoutes = () => {
    return [
      {
        path: PATHS.PROFILE,
        element: <Profile />,
      },
      {
        path: PATHS.MYLOCATIONS,
        element: <MyLocations />,
      },
      {
        path: PATHS.FAVORITES,
        element: <h1>My Favorites</h1>,
      },
      {
        path: PATHS.EDIT,
        element: <EditVideolocation />,
      },
    ];
}

export const anonRoutes = () => {
    return [
      {
        path: PATHS.SIGNUP,
        element: <SignupForm />,
      },
      {
        path: PATHS.LOGIN,
        element: <LoginForm />,
      },
    ];
}