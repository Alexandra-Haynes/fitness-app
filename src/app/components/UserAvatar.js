import React from 'react'

const UserAvatar = ({ avatarUrl = "/assets/avatar/default-avatar.png" }) => {
  return (
    <div>
      <img
        src={avatarUrl}
        alt="User avatar"
        className="h-8 w-8"
      />
    </div>
  );
};

export default UserAvatar
