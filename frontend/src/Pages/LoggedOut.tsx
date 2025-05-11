import Login from "../Components/Login";
import Signup from "../Components/Signup";

export default function LoggedOut(
  { setIsLoggedIn,
    setUser
  }: { setIsLoggedIn: (isLoggedIn: boolean) => void,
    setUser: (user: string) => void
  }
) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
          </div>
          <div className="col-md-6">
            <Signup setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
          </div>
        </div>
      </div>
    );
}
