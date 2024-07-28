import { useEffect, useState } from "react";
import { deleteUserById, getAllUsers } from "../../services/apiCalls";
import "./Admin.css";
import { Input } from "../../components/Input/Input";

export const Admin = () => {
    const [users, setUsers] = useState([]);

  const passport = JSON.parse(localStorage.getItem("passport"));
  const token = passport.token;

  useEffect(() => {
    const bringAllUsers = async () => {
      try {
        const allUsers = await getAllUsers(token);
        console.log('Response from API:', allUsers); 
        if (allUsers.success) {
          console.log('Setting users data:', allUsers.data);
          setUsers(allUsers.data);
        } else {
          console.error('Failed to fetch users:', allUsers);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    bringAllUsers();
  }, [token]);

  const deleteUserHandler = async (e) => {
    const id = parseInt(e.target.name, 10); 
    const res = await deleteUserById(token, id);

    if (res.success) {
      const remainingUsers = users.filter(user => user.id !== id);
      setUsers(remainingUsers);
    } else {
      console.error('Failed to delete user:', res.message);
    }
  };

  return (
    <div className="container">
      <h1>Admin</h1>
      <div className="users-container">
        <div className="table-row">
          <div className="content">id</div>
          <div className="content">email</div>
          <div className="content">is active?</div>
          <div className="content">actions</div>
        </div>
        {users.map((user) => (
          <div className="table-row" key={user.id}>
            <div className="content">{user.id}</div>
            <div className="content">{user.email}</div>
            <div className="content">
              {user.is_active ? "active" : "inactive"}
            </div>
            <div className="content">
              <Input
                type="button"
                name={user.id}
                className="button-send"
                value="🛇"
                click={deleteUserHandler}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
