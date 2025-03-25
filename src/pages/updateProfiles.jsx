import React from "react";

const Profile = React.lazy(()=>import('../components/account/profile.jsx'));

const ProfilePage  = () => (
    <div>
        <Profile/>
    </div>
)
export default ProfilePage ;