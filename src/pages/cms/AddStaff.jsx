import { useState } from "react";
import { addStaffApi } from "../../http/axios";
import { showError, showSuccess } from "../../utils/swal";

export default function AddStaff() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  function handleChange(event) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  async function register(event) {
    event.preventDefault();

    const token = localStorage.getItem("access_token");

    try {
      await addStaffApi({
        method: "POST",
        url: "/users/register",
        data: {
          username: user.username,
          email: user.email,
          password: user.password,
          phoneNumber: user.phoneNumber,
          address: user.address,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSuccess("Staff successfully added");

      setUser({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      });
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";

      showError(message);
    }
  }

  return (
    <div className="flex bg-zinc-950 text-zinc-200 min-h-screen">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Add Staff</h1>

        <div className="bg-zinc-900 p-6 rounded w-full max-w-md">
          <form className="space-y-4" onSubmit={register}>
            <div>
              <label className="block mb-1 text-sm text-zinc-400">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="w-full p-3 bg-zinc-800 rounded focus:outline-none"
                placeholder="Enter username"
                value={user.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-zinc-400">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 bg-zinc-800 rounded focus:outline-none"
                placeholder="Enter email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-zinc-400">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full p-3 bg-zinc-800 rounded focus:outline-none"
                placeholder="Enter password"
                value={user.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-zinc-400">
                Phone Number
              </label>
              <input
                type="number"
                name="phoneNumber"
                className="w-full p-3 bg-zinc-800 rounded focus:outline-none"
                placeholder="Enter phone number"
                value={user.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-zinc-400">
                Address
              </label>
              <input
                type="text"
                name="address"
                className="w-full p-3 bg-zinc-800 rounded focus:outline-none"
                placeholder="Enter address"
                value={user.address}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-black py-2 rounded hover:opacity-90 font-semibold cursor-pointer"
            >
              Add Staff
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
