import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import * as Yup from 'yup';
import CommonStyles from 'components/CommonStyles';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import { useTheme } from '@mui/material';

export interface DialogFailTourGuideFormValues {
  firstName: string;
  lastName: string;
}

interface DialogFailTourGuideProps {
  isOpen: boolean;
  toggle: () => void;
  onSubmit?: () => void;
}

const DialogFailTourGuide = (props: DialogFailTourGuideProps) => {
  //! State
  const { isOpen, toggle, onSubmit = () => {} } = props;
  const t = useTranslations('FindLocalFriendPage');
  const theme = useTheme();
  //! Function

  //! Effect

  //! Render
  return (
    <CommonStyles.Dialog
      sx={{
        ['.MuiPaper-root']: { borderRadius: '1.5rem', width: 423 },
        ['.MuiDialogContent-root']: { padding: '3rem' },
      }}
      content={
        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CommonIcons.NotFound />

          <CommonStyles.Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              marginTop: '3.75rem',
              marginBottom: '5rem',
            }}
          >
            <CommonStylesClient.Typography
              type='mobiHeading3'
              sx={{ color: theme.colors?.client?.black }}
            >
              {t('failDialogTitle')}
            </CommonStylesClient.Typography>
            <CommonStylesClient.Typography
              type='text14'
              sx={{ color: theme.colors?.client?.darkGray }}
            >
              {t('failDialogSubTitle')}
            </CommonStylesClient.Typography>
          </CommonStyles.Box>

          <CommonStyles.Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <CommonStylesClient.Button
              sx={{
                width: 280,
                height: 48,
                background: theme.colors?.client?.coBaltBlue,
                borderRadius: '1rem',
                [':hover']: {
                  background: theme.colors?.client?.coBaltBlue,
                },
              }}
              onClick={onSubmit}
            >
              <CommonStylesClient.Typography
                type='mobiHeading4'
                sx={{ color: theme.colors?.client?.white }}
              >
                {t('failDialogButton')}
              </CommonStylesClient.Typography>
            </CommonStylesClient.Button>
            <CommonStylesClient.Button
              sx={{
                width: 280,
                height: 48,
                background: theme.colors?.client?.white,
                borderRadius: '1rem',
                border: 'none',
                boxShadow: 'none',
                [':hover']: {
                  background: theme.colors?.client?.white,
                },
              }}
              onClick={toggle}
            >
              <CommonStylesClient.Typography
                type='text14'
                sx={{ color: theme.colors?.client?.coBaltBlue }}
              >
                {t('closeButton')}
              </CommonStylesClient.Typography>
            </CommonStylesClient.Button>
          </CommonStyles.Box>
        </CommonStylesClient.Box>
      }
      open={isOpen}
      toggle={toggle}
      showCloseIcon
      disableClickOutside={false}
    />
  );
};

export default React.memo(DialogFailTourGuide);
