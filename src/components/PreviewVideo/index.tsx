'use client';
import React, { useState } from 'react';
import CommonStyles from 'components/CommonStyles';
import ReactPlayer from 'react-player';
import CommonIcons from 'components/CommonIcons';

interface Prop {
  fileVideo: string;
}

export default function PreviewVideo({ fileVideo }: Prop) {
  return (
    <ReactPlayer
      url={fileVideo}
      playIcon={
        <CommonStyles.Button
          isIconButton
          sx={{
            display: 'inline-flex',
            padding: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '48px',
            background: 'rgba(252, 252, 253, 0.08)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <CommonIcons.PlayVideo />
        </CommonStyles.Button>
      }
      width='100%'
      height='41.125rem'
      playing={false}
      controls
    />
  );
}
