import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1>Welcome {user.name}</h1>
          <i>@{user.username}</i>
        </>
      ) : (
        <>
          <h1>Welcome</h1>
        </>
      )}
    </>
  );
}

export default Home;
