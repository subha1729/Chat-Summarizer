import "../styles/userInfo.css";

function UserInfo({ user }) {

  if (!user) return null;

  return (
    <div className="user-info">
      <img
        src={
          user.avatar ||
          "/default-avatar.png"
        }
        alt="avatar"
        className="user-avatar"
      />

      <div>
        <h2>
          Welcome, {user.username}
        </h2>

        <p>{user.email}</p>
      </div>
    </div>
  );
}

export default UserInfo;