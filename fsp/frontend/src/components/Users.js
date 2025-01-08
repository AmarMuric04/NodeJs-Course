import { User } from "./User";

export const Users = ({ users }) => {
  return (
    <div className="flex flex-wrap gap-8 mt-20">
      <User users={users} />
    </div>
  );
};
