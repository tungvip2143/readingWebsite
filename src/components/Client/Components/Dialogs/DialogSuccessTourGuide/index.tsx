import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import * as Yup from 'yup';
import CommonStyles from 'components/CommonStyles';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import { useTheme } from '@mui/material';

export interface DialogSucessTourGuideFormValues {
  firstName: string;
  lastName: string;
}

interface DialogSucessTourGuideProps {
  isOpen: boolean;
  toggle: () => void;
  onSubmit?: () => void;
}

const DialogSucessTourGuide = (props: DialogSucessTourGuideProps) => {
  //! State
  const { isOpen, toggle, onSubmit = () => {} } = props;
  const t = useTranslations('FindLocalFriendPage');
  const theme = useTheme();
  const [timeLeft, setTimeLeft] = useState(5);
  //! Function

  //! Effect
  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(0);
      onSubmit();
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  //! Render
  return (
    <CommonStyles.Dialog
      sx={{
        ['.MuiPaper-root']: { borderRadius: '1.5rem', width: 423 },
        ['.MuiDialogContent-root']: { padding: '3rem' },
      }}
      content={
        <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', gap: '6.1875rem' }}>
          <CommonStyles.Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3rem',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <CommonIcons.Found />
            <CommonStylesClient.Typography
              type='mobiHeading3'
              sx={{ color: theme.colors?.client?.black }}
            >
              {t('successDialogTitle')}
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
                {t('successDialogButton')}
              </CommonStylesClient.Typography>
            </CommonStylesClient.Button>
            <CommonStylesClient.Typography
              type='text14'
              sx={{ color: theme.colors?.client?.darkGray }}
            >
              {t('autoRedirectContent', { second: `${timeLeft}s` })}
            </CommonStylesClient.Typography>
          </CommonStyles.Box>
        </CommonStylesClient.Box>
      }
      open={isOpen}
      toggle={toggle}
      disableClickOutside
    />
  );
};

export default React.memo(DialogSucessTourGuide);
