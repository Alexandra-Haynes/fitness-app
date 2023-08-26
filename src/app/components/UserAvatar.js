import React from 'react'
import Image from 'next/image';

const UserAvatar = ({ avatarUrl = "/assets/avatar/default-avatar.png" }) => {
  return (
    <div>
      <Image
        src={avatarUrl}
        width={8}
        height={8}
        alt="User avatar"
        className="h-8 w-8"
      />
    </div>
  );
};

export default UserAvatar
