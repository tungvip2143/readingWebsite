'use client';

import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import ProfileSetting from 'components/Client/Components/Profile/ProfileSetting';
import PersonalInformation from 'components/Client/Components/Profile/PersonalInformation';

interface ProfileProps {}

const Profile = (props: ProfileProps) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
      }}
    >
      <ProfileSetting />
      <PersonalInformation />
    </CommonStylesClient.Box>
  );
};

export default Profile;
