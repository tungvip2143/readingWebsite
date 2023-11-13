'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIconsMui from 'components/CommonIconsMui';
import { useRouter } from 'next/navigation';
import { Topic, WIDTH_SIDEBAR } from 'constants/common';
import CommonIcons from 'components/Client/CommonIcons';

export interface SearchAndFiltersProps {
  textSearch?: string;
}

export interface SidebarContent {
  isOpenDrawer?: boolean;
}

const listSidebar = [
  { id: 1, name: Topic.EVENTS, path: '/Events', icon: <CommonIconsMui.CelebrationIcon /> },
  { id: 2, name: Topic.THREE_F, path: '/3F', icon: <CommonIconsMui.SportsSoccerIcon /> },
  { id: 3, name: Topic.TOP_PLUS, path: '/Top+', icon: <CommonIconsMui.CampaignIcon /> },
  {
    id: 4,
    name: Topic.THE_FACE_DEWEY,
    path: '/The-face-Dewey',
    icon: <CommonIconsMui.FaceRetouchingNaturalIcon />,
  },
  { id: 5, name: Topic.SHOCK, path: '/Shock', icon: <CommonIconsMui.WhatshotIcon /> },
  {
    id: 6,
    name: Topic.STUDY_CORNER,
    path: '/Study-corner',
    icon: <CommonIconsMui.SchoolIcon />,
  },
  { id: 7, name: Topic.CHARITY, path: '/Charity', icon: <CommonIcons.IconHandShank /> },
];

export const RenderConntentSidebar = ({ isOpenDrawer }: SidebarContent) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const router = useRouter();

  //! Function
  const handleNavigate = (path: string) => () => {
    router.push(path);
  };

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        position: 'fixed',
        padding: '0 1rem',
        width: isOpenDrawer ? '100%' : WIDTH_SIDEBAR,
        backgroundColor: `${theme?.colors?.custom?.bgnavy}`,
        height: '100vh',
      }}
    >
      {isOpenDrawer && (
        <CommonStylesClient.Box>
          <CommonStylesClient.Typography type='pcHeading3' sx={{ py: 4 }}>
            Mediwey magazine
          </CommonStylesClient.Typography>
          <CommonStylesClient.Divider />
        </CommonStylesClient.Box>
      )}
      {listSidebar?.map((item) => {
        return (
          <List key={item?.id}>
            <ListItem disablePadding>
              <ListItemButton onClick={handleNavigate(item?.path)}>
                <ListItemIcon sx={{ color: `${theme.colors?.white}` }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <CommonStylesClient.Typography
                      type='text16'
                      sx={{ color: `${theme.colors?.white}` }}
                    >
                      {item.name}
                    </CommonStylesClient.Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        );
      })}
    </CommonStylesClient.Box>
  );
};
const SidebarHome = () => {
  //! State

  //! Function

  //! Render
  return <RenderConntentSidebar />;
};

export default SidebarHome;
