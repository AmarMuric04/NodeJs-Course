export const User = ({ users }) => {
  return users.map((user) => (
    <div
      key={user.email}
      className="bg-white p-8 rounded-md text-black flex flex-col"
    >
      <p>First Name: {user.fname}</p>
      <p>Last Name: {user.lname}</p>
      <p className="text-orange-400 font-bold text-lg">Email: {user.email}</p>
    </div>
  ));
};
