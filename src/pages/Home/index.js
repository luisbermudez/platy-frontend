import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  
  return (
    <>
      {isLoggedIn
        ? !loading && (
            <>
              <h1>Welcome {user.name}</h1>
              <i>@{user.username}</i>
            </>
          )
        : !loading && (
            <>
              <h1>Welcome</h1>
            </>
          )}
    </>
  );
}

export default Home;
