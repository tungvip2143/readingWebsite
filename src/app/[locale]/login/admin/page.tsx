'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { FastField, Form, Formik } from 'formik';
import { useTheme } from '@mui/material';
import * as Yup from 'yup';

import pageUrls from 'constants/pageUrls';
import CustomFields from 'components/CustomFields';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIconsMui';
import useAuth from 'hooks/useAuth';
import { LOGO_IMAGE_PATH, Roles } from 'constants/common';
import { showError } from 'helpers/toast';
import Loading from 'components/CommonStyles/Loading';

export default function Login() {
  const t = useTranslations();
  const [error, setError] = useState<string>();
  const router = useRouter();
  const theme = useTheme();
  const auth = useAuth();

  const role = auth?.user?.userType;
  const isLogining = auth?.isLogining;
  const isLogged = auth?.isLogged;

  useEffect(() => {
    // Check to redirect to the page with corresponding role
    if (isLogged && !!role) {
      const redirectHandler = new Map<Roles, () => void>();
      redirectHandler.set(Roles.ADMIN, () => router.push(pageUrls.Admin));
      redirectHandler.set(Roles.TOUR_GUIDE, () => router.push(pageUrls.LocalFriend.Home));
      redirectHandler.set(Roles.CUSTOMER, () => router.push(pageUrls.Homepage));
      redirectHandler.set(Roles.VENDOR, () => router.push(pageUrls.Vendor.Home));

      redirectHandler.get(role)?.();
    }
  }, [isLogged, role]);

  if (!isLogining && isLogged) {
    return (
      <CommonStyles.Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: theme.colors?.bgwhite,
        }}
      >
        <Loading />
      </CommonStyles.Box>
    );
  }

  return (
    <CommonStyles.Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.colors?.bgneutral500,
      }}
    >
      <CommonStyles.Box
        sx={{
          background: theme.colors?.white,
          width: '23.4375em',
          height: '39em',
          padding: '1.75em 1.25em',
          borderRadius: '8px',
          boxShadow: `0px 17px 35px rgba(50, 50, 105, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.05)`,
        }}
      >
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required(t('Validation.empty', { name: t(`Login.username`) })),
            password: Yup.string().required(t('Validation.empty', { name: t(`Login.password`) })),
          })}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                setSubmitting(true);
                if (error) setError(undefined);
                auth?.signIn({
                  username: values.username,
                  password: values.password,
                });
              } catch (error) {
                showError(error);
              } finally {
                setSubmitting(false);
              }
            })();
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <CommonStyles.Box
                    sx={{
                      display: 'flex',
                      gap: '0.5rem',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={LOGO_IMAGE_PATH.src}
                      alt='logo'
                      style={{ width: '55px', height: '55px' }}
                    />
                  </CommonStyles.Box>

                  <CommonStyles.Typography
                    sx={{ fontSize: '1.25em', color: theme.colors?.bgneutral500 }}
                  >
                    {t('Login.welcomeBack')}
                  </CommonStyles.Typography>
                </CommonStyles.Box>

                <FastField
                  component={CustomFields.TextField}
                  iconInput={<CommonIcons.PersonIcon />}
                  name='username'
                  label={t('Login.username')}
                  placeholder={t('Login.usernamePlaceholder')}
                />

                <FastField
                  component={CustomFields.TextField}
                  type='password'
                  name='password'
                  iconInput={<CommonIcons.LockIcon />}
                  placeholder={t('Login.passwordPlaceholder')}
                  label={t('Login.password')}
                />

                <CommonStyles.Button
                  sx={{ background: theme.colors?.primary500, mt: 2 }}
                  type='submit'
                  loading={isSubmitting || isLogining || isLogged}
                >
                  {t('Login.submit')}
                </CommonStyles.Button>
              </Form>
            );
          }}
        </Formik>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
}
