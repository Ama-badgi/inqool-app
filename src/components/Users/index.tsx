import { useFetchUsers } from "../../hooks/useUsers";
import { Link } from "react-router";

function Users() {
  const { isFetching, isError, error, data: users } = useFetchUsers();

  if (isError) return <>Error: {error}</>;
  if (isFetching) return <>Loading...</>;
  if (!users || users.length === 0) return <p>No users found.</p>;

  return (
    <>
      <Link to="/">Home</Link>
      <h1>Users</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Banned</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>{user.banned ? "✅ Yes" : "❌ No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Users;
