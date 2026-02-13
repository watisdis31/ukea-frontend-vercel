import { useState } from "react";
import { loginApi } from "../../http/axios";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { showError, showSuccess } from "../../utils/swal";

export default function Login() {
  const [showDummy, setShowDummy] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  let navigation = useNavigate();

  function handleChange(event) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  async function login(event) {
    event.preventDefault();

    try {
      const response = await loginApi({
        method: "POST",
        url: "/users/login",
        data: {
          email: user.email,
          password: user.password,
        },
      });

      const access_token = response.data.access_token;
      localStorage.setItem("access_token", access_token);

      const decodeToken = jwtDecode(access_token);
      localStorage.setItem("role", decodeToken.role);

      showSuccess("Login Successful");

      setTimeout(() => {
        navigation("/");
      }, 1500);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";

      showError(message);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <form onSubmit={login}>
        <div className="bg-zinc-800 p-8 rounded-lg w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Login to UKEA
          </h1>
          <div className="mb-4">
            <label className="block text-zinc-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 rounded bg-zinc-700 text-white focus:outline-none"
              placeholder="example@mail.com"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="block text-zinc-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 rounded bg-zinc-700 text-white focus:outline-none"
              placeholder="Your password here"
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <button className="w-full bg-amber-500 text-black py-2 rounded hover:bg-amber-400 cursor-pointer">
            Login
          </button>

          <div className="mt-6 text-sm border-t border-zinc-700 pt-4">
            <button
              type="button"
              onClick={() => setShowDummy(!showDummy)}
              className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
            >
              {showDummy ? "Hide Dummy Account ▲" : "Show Dummy Account ▼"}
            </button>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                showDummy ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-zinc-400">
                <div className="mb-2">
                  <p className="text-amber-400 font-medium">Admin</p>
                  <p>Email: admin@mail.com</p>
                  <p>Password: admin123</p>
                </div>

                <div>
                  <p className="text-amber-400 font-medium">Staff</p>
                  <p>Email: wat@mail.com</p>
                  <p>Password: 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
