import { useState, useEffect } from "react";
import { Users } from "./components/Users";
import Input from "./components/Input";
import { Spinner } from "./assets/icons";

function App() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/users");
        if (!response.ok) {
          throw new Error("Failed during fetch of users.");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  const handleCreateAccount = async () => {
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        body: JSON.stringify({ fname, lname, email }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const data = await response.json();
        setSuccess(null);
        setError(data);
        throw new Error("Failed to create the user.");
      }

      const updatedUsers = await response.json();
      setUsers((prevUsers) => [...prevUsers, updatedUsers.user]);

      setSuccess(updatedUsers);
    } catch (error) {
      console.error("Failed to create the user.", error.message);
    }
  };

  return (
    <main className="bg-slate-700 h-screen w-full text-white">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[6rem] playwrite text-orange-400">Hello!</h1>
        {success && (
          <div className="flex my-4">
            <p className="text-center text-black bg-green-400 bg-opacity-50 border-2 border-green-600 px-4 py-2 rounded-md">
              {success.message}
            </p>
          </div>
        )}
        {error && (
          <div className="flex my-4">
            <p className="text-center text-black bg-red-400 bg-opacity-50 border-2 border-red-600 px-4 py-2 rounded-md">
              {error.message}
            </p>
          </div>
        )}
        <form
          className="flex flex-col gap-4 text-black"
          onSubmit={(e) => {
            e.preventDefault();
            setIsSubmitting(true);
            handleCreateAccount();
            setIsSubmitting(false);
          }}
        >
          <Input
            error={error}
            name="fname"
            type="text"
            placeholder="first-name"
            onChange={(e) => setFName(e.target.value)}
            value={fname}
          />
          <Input
            error={error}
            name="lname"
            type="text"
            placeholder="last-name"
            onChange={(e) => setLName(e.target.value)}
            value={lname}
          />
          <Input
            error={error}
            name="email"
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            error={error}
            name="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className="bg-orange-400 py-4 px-4 rounded-[2rem] hover:rounded-none transition-all font-semibold">
            {isSubmitting ? "Creating..." : "Create an account!"}
          </button>
        </form>
        <p>Current users:</p>
        {users && users?.length > 0 && <Users users={users} />}
        {!users && <Spinner />}
        {users?.length === 0 && <p>No users found.</p>}
      </div>
    </main>
  );
}

export default App;
