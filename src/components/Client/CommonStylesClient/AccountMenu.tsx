import * as React from 'react';
import { useTranslations } from 'next-intl';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material';
import useAuth from 'hooks/useAuth';
import CommonStyles from '.';
import CommonStylesClient from '.';
import CommonIconsClient from '../CommonIcons';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogLogin from '../Components/Dialogs/DialogLogin';
import DialogSignUp, { FormSignUpValues } from '../Components/Dialogs/DialogSignUp';
import DialogVerify from '../Components/Dialogs/DialogVerify';
import { showError, showSuccess } from 'helpers/toast';
import { RequestSignUp } from 'modules/signUp/signUp.interface';
import { RequestVerifyRegisterCustomer } from 'modules/verifyRegisterCustomer/verifyRegisterCustomer.interface';
import CommonIcons from 'components/CommonIconsMui';
import { ProviderSocial, Method, Roles, OTPAction } from 'constants/common';
import { IMG_URL } from 'constants/apiUrls';
import { useRouter } from 'next/navigation';
import pageUrls from 'constants/pageUrls';
import useGetListGetProfileCustomer from 'modules/getProfileCustomer/hooks/useGetListGetProfileCustomer';
import cachedKeys from 'constants/cachedKeys';
import useFiltersHandler from 'hooks/useFiltersHandler';
import LoginModel from 'models/login.model';
import DialogForgotPassword, {
  FormForgotPasswordValues,
} from '../Components/Dialogs/DialogForgotPassword';
import DialogVerifyForgotPassword from '../Components/Dialogs/DialogVerifyForgotPassword';
import DialogNewPassword from '../Components/Dialogs/DialogNewPassword';
import {
  RequestChangePassword,
  RequestChangePasswordEmail,
  RequestForgotPassword,
  RequestResendOTP,
  RequestVerifyForgotPassword,
} from 'modules/forgotPassword/forgotPassword.interface';
import SignUpModel from 'models/signup.model';
import VerifySignupModel from 'models/verifySignup.model';
import ForgotPasswordModel from 'models/forgotPassword.model';
import VerifyForgotPasswordModel from 'models/verifyForgotPassword.model';
import ChangePasswordModel from 'models/changePassword.model';
import { useGet } from 'stores/useStore';
import { isEmpty } from 'lodash';
import DialogNewPasswordEmail from '../Components/Dialogs/DialogNewPasswordEmail';
import ChangePasswordEmailModel from 'models/changePasswordEmail.model';
import ReSendOTPdModel from 'models/resendOTP.model';

interface AccountMenu {}

interface Item {
  icon: React.ReactNode;
  label: string;
  showCount?: boolean;
  count?: number;
}

interface Information {
  avatar: string;
  name: string;
  phoneNumber: string;
}

function AccountMenu(props: AccountMenu) {
  //! State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [signUpForm, setSignUpForm] = React.useState<FormSignUpValues | null>(null);
  const [forgotPasswordForm, setForgotPasswordForm] =
    React.useState<FormForgotPasswordValues | null>(null);

  const phoneNumberSignup = signUpForm?.phoneNumber || '';
  const emailSignup = signUpForm?.email || '';
  const phoneNumberForgotPasword = forgotPasswordForm?.phoneNumber || '';
  const phoneCodeForgotPasword = forgotPasswordForm?.phoneCode || '';
  const emailForgotPassword = forgotPasswordForm?.email || '';

  const open = Boolean(anchorEl);
  const t = useTranslations();
  const tIndex = useTranslations('Index');
  const theme = useTheme();
  const auth = useAuth();
  const route = useRouter();

  const isLogged = auth.isLogged || false;
  const name =
    auth?.user?.role !== Roles.VENDOR
      ? `${auth?.user?.firstName} ${auth?.user?.lastName}` || ''
      : `${auth?.user?.name}` || '';

  const avatar =
    auth?.user?.role !== Roles.VENDOR ? auth?.user?.avatar || '' : auth?.user?.thumbnail || '';
  const phone = `0${auth?.user?.phone}` || '';
  const user = auth?.user;
  const isCustomer = auth?.user?.role === Roles.CUSTOMER;

  const { filters } = useFiltersHandler({
    page: undefined,
    perPage: undefined,
  });
  const { data, isLoading } = useGetListGetProfileCustomer(filters, {
    isTrigger: !!isLogged && isCustomer,
    refetchKey: cachedKeys.refetchGetProfile,
  });

  const numberOfTourBooking = data?.data?.data?.TourBooking.length;
  const numberOfWishList =
    (data?.data?.data?.WishListTour?.length || 0) + (data?.data?.data?.WishListVendor?.length || 0);
  const numberOfVendorBooking = data?.data?.data?.ReservationVendor.length;

  const listMenuAccount = [
    {
      id: 1,
      label: t('Account.bookingVendor'),
      showCount: isLogged,
      count: numberOfVendorBooking,
      href: pageUrls.MyBookingVendor,
      icon: <CommonIconsClient.IconTicket />,
    },
    {
      id: 2,
      label: t('Account.bookingTour'),
      showCount: isLogged,
      count: numberOfTourBooking,
      href: pageUrls.MyBookingTour,
      icon: <CommonIconsClient.IconLocation />,
    },

    {
      id: 3,
      label: t('Account.wishList'),
      showCount: isLogged,
      count: numberOfWishList,
      href: pageUrls.WishListVendor,
      icon: <CommonIconsClient.IconHeart />,
    },
    {
      id: 4,
      label: t('Account.profile'),
      showCount: isLogged,
      href:
        auth.user?.role === Roles.CUSTOMER ? pageUrls.Customer.Profile : pageUrls.Articles.Profile,
      icon: <CommonIconsClient.IconProfileUser />,
    },
  ];
  //! Dialog
  const {
    shouldRender: shouldRenderLoginDialog,
    open: openLoginDialog,
    toggle: toggleLoginDialog,
  } = useToggleDialog();

  const {
    shouldRender: shouldRenderSignUpDialog,
    open: openSignUpDialog,
    toggle: toggleSignUpDialog,
  } = useToggleDialog();

  const {
    shouldRender: shouldRenderVerify,
    open: openVerifyDialog,
    toggle: toggleVerifyDialog,
  } = useToggleDialog();

  const {
    shouldRender: shouldRenderForgotPasswordDialog,
    open: openForgotPasswordDialog,
    toggle: toggleForgotPasswordDialog,
  } = useToggleDialog();

  const {
    shouldRender: shouldRenderVerifyForgotPasswordDialog,
    open: openVerifyForgotPasswordDialog,
    toggle: toggleVerifyForgotPasswordDialog,
  } = useToggleDialog();

  const {
    shouldRender: shouldRenderNewPasswordDialog,
    open: openNewPasswordDialog,
    toggle: toggleNewPasswordDialog,
  } = useToggleDialog();

  const {
    shouldRender: shouldRenderNewPasswordEmailDialog,
    open: openNewPasswordEmailDialog,
    toggle: toggleNewPasswordEmailDialog,
  } = useToggleDialog();

  //! Function
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.signOut();
    setAnchorEl(null);
  };

  const renderlistMenuAccount = () => {
    if (auth.user?.role === Roles.TOUR_GUIDE) {
      return (
        <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {listMenuAccount?.slice(3, 4)?.map((item) => {
            return (
              <MenuItem key={item?.id} onClick={() => handleNavigate(item?.href)}>
                <Item
                  icon={item?.icon}
                  label={item?.label}
                  showCount={item?.showCount}
                  count={item?.count}
                />
              </MenuItem>
            );
          })}
        </CommonStylesClient.Box>
      );
    }
    if (auth.user?.role === Roles.VENDOR) {
      return undefined;
    }
    if (auth.user?.role === Roles.CUSTOMER) {
      return (
        <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {listMenuAccount?.slice()?.map((item) => {
            return (
              <MenuItem key={item?.id} onClick={() => handleNavigate(item?.href)}>
                <Item
                  icon={item?.icon}
                  label={item?.label}
                  showCount={item?.showCount}
                  count={item?.count}
                />
              </MenuItem>
            );
          })}
        </CommonStylesClient.Box>
      );
    }
    return (
      <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {listMenuAccount?.slice(0, 3)?.map((item) => {
          return (
            <MenuItem key={item?.id} onClick={() => handleNavigate(item?.href)}>
              <Item
                icon={item?.icon}
                label={item?.label}
                showCount={item?.showCount}
                count={item?.count}
              />
            </MenuItem>
          );
        })}
      </CommonStylesClient.Box>
    );
  };

  const handleNavigate = (href: string) => {
    return route.push(href);
  };
  const Item = ({ icon, label, count, showCount = false }: Item) => {
    return (
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Label */}
        <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.75rem' }}>
          {icon}
          <CommonStylesClient.Typography type='title16' sx={{ color: theme.colors?.client?.black }}>
            {label}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>

        {/* Count */}
        {showCount && (
          <CommonStylesClient.Typography
            type='title14'
            sx={{
              color: theme.colors?.client?.white,
              background: theme.colors?.client?.red,
              borderRadius: '1rem',
              padding: '0 8px',
            }}
          >
            {count}
          </CommonStylesClient.Typography>
        )}
      </CommonStylesClient.Box>
    );
  };

  const Information = ({ avatar, name, phoneNumber }: Information) => {
    return (
      <CommonStylesClient.Box sx={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            alignItems: 'center',
            width: '100%',
            ['.MuiAvatar-root']: {
              width: 48,
              height: 48,
              margin: 0,
            },
          }}
        >
          <Avatar src={`${IMG_URL}/${avatar}`} />
          <CommonStylesClient.Box
            sx={{
              display: 'flex',
              gap: '4px',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <CommonStylesClient.Typography
              type='title16'
              sx={{
                color: theme.colors?.client.black,
              }}
            >
              {name}
            </CommonStylesClient.Typography>
            <CommonStylesClient.Typography
              type='text14'
              sx={{ color: theme.colors?.client.darkGray }}
            >
              {phoneNumber}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
        {/* BUTTON */}
        <CommonStylesClient.Button
          variant='outlined'
          sx={{
            border: `1px solid ${theme.colors?.client?.coBaltBlue}`,
            background: theme.colors?.client.white,
            textAlign: 'center',
            borderRadius: '1rem',
            padding: '6px 1rem',
            textTransform: 'capitalize',
          }}
          onClick={handleLogout}
        >
          <CommonStylesClient.Typography sx={{ color: theme.colors?.client?.coBaltBlue }}>
            {t('Account.logout')}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Button>
      </CommonStylesClient.Box>
    );
  };

  const LoginSignup = () => {
    return (
      <CommonStylesClient.Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <CommonStylesClient.Button
          sx={{
            background: theme.colors?.client.coBaltBlue,
            textAlign: 'center',
            borderRadius: '1rem',
            padding: '6px 1rem',
            textTransform: 'capitalize',
            width: 130,
          }}
          onClick={toggleLoginDialog}
        >
          <CommonStylesClient.Typography sx={{ color: theme.colors?.client?.white }}>
            {t('Account.login')}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Button>

        <CommonStylesClient.Button
          variant='outlined'
          sx={{
            border: `1px solid ${theme.colors?.client?.coBaltBlue}`,
            background: theme.colors?.client.white,
            textAlign: 'center',
            borderRadius: '1rem',
            padding: '6px 1rem',
            textTransform: 'capitalize',
            width: 130,
            height: 36.5,
          }}
          onClick={toggleSignUpDialog}
        >
          <CommonStylesClient.Typography sx={{ color: theme.colors?.client?.coBaltBlue }}>
            {t('Account.signUp')}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Button>
      </CommonStylesClient.Box>
    );
  };

  //! Render
  return (
    <React.Fragment>
      {shouldRenderLoginDialog && (
        <DialogLogin
          isOpen={openLoginDialog}
          toggle={toggleLoginDialog}
          onClickSignUp={() => {
            toggleLoginDialog();
            toggleSignUpDialog();
          }}
          onClickForgotPassword={() => {
            toggleForgotPasswordDialog();
            toggleLoginDialog();
          }}
          onClickLoginGoogle={() => {
            (async () => {
              try {
                const body = {
                  role: Roles.CUSTOMER,
                  provider: ProviderSocial.GOOGLE,
                };
                await auth?.signInGoogle(body);
                toggleLoginDialog();
              } catch (error) {
                showError(error);
              }
            })();
          }}
          onClickLoginFacebook={() => {
            (async () => {
              try {
                const body = {
                  role: Roles.CUSTOMER,
                  provider: ProviderSocial.FACEBOOK,
                };
                await auth?.signInFacebook(body);
                toggleLoginDialog();
              } catch (error) {
                showError(error);
              }
            })();
          }}
          onSubmitLogin={(values, helpersFormik) => {
            (async () => {
              try {
                helpersFormik.setSubmitting(true);
                const requestPayload = LoginModel.parseBodyToRequest(values);
                await auth?.signInPhone(requestPayload);
                toggleLoginDialog();
              } catch (error) {
                showError(error);
              } finally {
                helpersFormik.setSubmitting(false);
              }
            })();
          }}
        />
      )}
      {shouldRenderSignUpDialog && (
        <DialogSignUp
          isOpen={openSignUpDialog}
          toggle={toggleSignUpDialog}
          onClickSignIn={() => {
            toggleSignUpDialog();
            toggleLoginDialog();
          }}
          onSubmitSignUp={async (values, helpersFormik) => {
            try {
              helpersFormik.setSubmitting(true);
              const body: RequestSignUp = {
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phoneNumber,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
                phoneCode: values.phoneCode,
                acceptTerm: values.acceptTerm,
                gender: values.gender,
              };
              const requestPayload = SignUpModel.parseBodyToRequest(body);
              //! Call API SignUp
              //! If Done -> turn off signUpDialog -> turn on verifyDialog
              await auth.signUp(requestPayload);
              setSignUpForm(values);
              toggleSignUpDialog();
              toggleVerifyDialog();
            } catch (error) {
              showError(error);
            } finally {
              helpersFormik.setSubmitting(false);
            }
          }}
          onClickLoginGoogle={() => {
            (async () => {
              try {
                const body = {
                  role: Roles.CUSTOMER,
                  provider: ProviderSocial.GOOGLE,
                };
                await auth?.signInGoogle(body);
                toggleSignUpDialog();
              } catch (error) {
                showError(error);
              }
            })();
          }}
          onClickLoginFacebook={() => {
            (async () => {
              try {
                const body = {
                  role: Roles.CUSTOMER,
                  provider: ProviderSocial.FACEBOOK,
                };
                await auth?.signInFacebook(body);
                toggleSignUpDialog();
              } catch (error) {
                showError(error);
              }
            })();
          }}
        />
      )}
      {shouldRenderVerify && (
        <DialogVerify
          isOpen={openVerifyDialog}
          toggle={toggleVerifyDialog}
          phoneNumber={phoneNumberSignup}
          email={emailSignup}
          onSubmitVerify={async (values, helpersFormik) => {
            try {
              helpersFormik.setSubmitting(true);
              const phoneNumberValues = signUpForm?.phoneNumber || '';
              const phonePrefix = signUpForm?.phoneCode || '';
              const email = signUpForm?.email || '';
              const otp = values?.otp || '';
              const body: RequestVerifyRegisterCustomer = {
                phoneCode: phonePrefix || '',
                otp: otp,
                phone: phoneNumberValues,
                email: email,
              };

              const requestPayload = VerifySignupModel.parseBodyToRequest(body);
              await auth.verifyRegisterCustomer(requestPayload);
              showSuccess(t('SignUp.success'));
              toggleVerifyDialog();
              toggleLoginDialog();
            } catch (error) {
              showError(error);
            } finally {
              helpersFormik.setSubmitting(false);
            }
          }}
          onSubmitReSendOTP={() => {
            (async () => {
              try {
                const body: RequestResendOTP = {
                  action: OTPAction.CUSTOMER_REGISTER,
                  role: Roles.CUSTOMER,
                  method: isEmpty(signUpForm?.phoneNumber) ? Method.EMAIL : Method.PHONE,
                  phone: signUpForm?.phoneNumber || '',
                  phoneCode: signUpForm?.phoneCode || '',
                  email: signUpForm?.email || '',
                };
                const requestPayload = ReSendOTPdModel.parseBodyToRequest(body);
                //! Call API SignUp
                //! If Done -> turn off signUpDialog -> turn on verifyDialog
                await auth.resendOTP(requestPayload);
                showSuccess(t('SignUp.reSendSuccess'));
              } catch (error) {
                showError(error);
              }
            })();
          }}
        />
        // eslint-disable-next-line react/jsx-no-comment-textnodes
      )}
      {shouldRenderForgotPasswordDialog && (
        <DialogForgotPassword
          isOpen={openForgotPasswordDialog}
          toggle={toggleForgotPasswordDialog}
          onSubmitForgotPassword={(values, helpersFormik) => {
            (async () => {
              try {
                helpersFormik.setSubmitting(true);
                const phoneNumberValues = values?.phoneNumber;
                const phonePrefix = values?.phoneCode;
                const email = values?.email;
                const method = isEmpty(email) ? Method.PHONE : Method.EMAIL;

                const body: RequestForgotPassword = {
                  phone: phoneNumberValues,
                  phoneCode: phonePrefix,
                  email: email,
                  role: Roles.CUSTOMER,
                  method: method,
                };
                //! Call API SignUp
                //! If Done -> turn off signUpDialog -> turn on verifyDialog
                const requestPayload = ForgotPasswordModel.parseBodyToRequest(body);
                await auth.forgotPassword(requestPayload);
                toggleVerifyForgotPasswordDialog();
                toggleForgotPasswordDialog();
                setForgotPasswordForm(values);
              } catch (error) {
                showError(error);
              } finally {
                helpersFormik.setSubmitting(false);
              }
            })();
          }}
        />
      )}
      {shouldRenderVerifyForgotPasswordDialog && (
        <DialogVerifyForgotPassword
          isOpen={openVerifyForgotPasswordDialog}
          toggle={toggleVerifyForgotPasswordDialog}
          phoneNumber={phoneNumberForgotPasword}
          email={emailForgotPassword}
          onSubmitVerify={async (values, helpersFormik) => {
            try {
              helpersFormik.setSubmitting(true);
              const phoneNumberValues = phoneNumberForgotPasword || '';
              const phonePrefix = phoneCodeForgotPasword || '';
              const email = emailForgotPassword || '';
              const isEmail = !isEmpty(email);
              const body: RequestVerifyForgotPassword = {
                phoneCode: phonePrefix,
                role: Roles.CUSTOMER,
                otp: values.otp,
                phone: phoneNumberValues,
                email: email,
              };

              const requestPayload = VerifyForgotPasswordModel.parseBodyToRequest(body);
              await auth.verifyForgotPassword(requestPayload);
              showSuccess(t('ForgotPassword.successVerify'));
              toggleVerifyForgotPasswordDialog();
              if (isEmail) {
                toggleNewPasswordEmailDialog();
                return;
              }
              toggleNewPasswordDialog();
            } catch (error) {
              showError(error);
            } finally {
              helpersFormik.setSubmitting(false);
            }
          }}
          onSubmitReSendOTP={() => {
            (async () => {
              try {
                const phoneNumberValues = phoneNumberForgotPasword;
                const phonePrefix = phoneCodeForgotPasword;
                const email = emailForgotPassword;
                const method = isEmpty(email) ? Method.PHONE : Method.EMAIL;

                const body: RequestResendOTP = {
                  action: OTPAction.FORGOT_PASSWORD,
                  role: Roles.CUSTOMER,
                  method: method,
                  phone: phoneNumberValues,
                  phoneCode: phonePrefix,
                  email: email,
                };
                const requestPayload = ReSendOTPdModel.parseBodyToRequest(body);
                //! Call API SignUp
                //! If Done -> turn off signUpDialog -> turn on verifyDialog
                await auth.resendOTP(requestPayload);
                showSuccess(t('SignUp.reSendSuccess'));
              } catch (error) {
                showError(error);
              }
            })();
          }}
        />
      )}
      {shouldRenderNewPasswordDialog && (
        <DialogNewPassword
          isOpen={openNewPasswordDialog}
          toggle={toggleNewPasswordDialog}
          phoneNumber={phoneNumberForgotPasword}
          phoneCode={phoneCodeForgotPasword}
          onSubmitChangePassword={async (values, helpersFormik) => {
            try {
              helpersFormik.setSubmitting(true);

              const body: RequestChangePassword = {
                phone: values.phoneNumber,
                password: values.password,
                confirmPassword: values.confirmPassword,
                phoneCode: values.phoneCode,
                role: Roles.CUSTOMER,
              };

              const requestPayload = ChangePasswordModel.parseBodyToRequest(body);
              await auth.changePassword(requestPayload);
              showSuccess(t('ForgotPassword.success'));
              toggleNewPasswordDialog();
              toggleLoginDialog();
            } catch (error) {
              showError(error);
            } finally {
              helpersFormik.setSubmitting(false);
            }
          }}
        />
      )}
      {shouldRenderNewPasswordEmailDialog && (
        <DialogNewPasswordEmail
          isOpen={openNewPasswordEmailDialog}
          toggle={toggleNewPasswordEmailDialog}
          email={emailForgotPassword}
          onSubmitChangePassword={async (values, helpersFormik) => {
            try {
              helpersFormik.setSubmitting(true);

              const body: RequestChangePasswordEmail = {
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
                role: Roles.CUSTOMER,
              };

              const requestPayload = ChangePasswordEmailModel.parseBodyToRequest(body);
              await auth.changePasswordEmail(requestPayload);
              showSuccess(t('ForgotPassword.success'));
              toggleNewPasswordEmailDialog();
              toggleLoginDialog();
            } catch (error) {
              showError(error);
            } finally {
              helpersFormik.setSubmitting(false);
            }
          }}
        />
      )}
      <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <CommonStyles.Tooltip title={isLogged ? t('Account.accountSettings') : tIndex('login')}>
          {isLogged ? (
            user?.role === Roles.CUSTOMER || user?.role === Roles.ADMIN ? (
              <IconButton
                onClick={handleClick}
                size='small'
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar src={`${IMG_URL}/${avatar}`} sx={{ width: 36, height: 36 }} />
              </IconButton>
            ) : (
              <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={`${IMG_URL}/${avatar}`}
                  alt='Avatar Tour Guide'
                  sx={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '48px',
                    backgroundColor: theme.colors?.bgyellow400,
                    marginRight: '1rem',
                  }}
                />
                <CommonStyles.Typography
                  variant='h4'
                  sx={{
                    color: theme.colors?.client.darkGray,
                    fontSize: '1rem',
                    fontWeight: 500,
                    marginRight: '0.25rem',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    maxWidth: '100px',
                  }}
                >
                  {name}
                </CommonStyles.Typography>

                <IconButton
                  onClick={handleClick}
                  size='small'
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                >
                  <CommonStyles.Box
                    sx={{
                      color: theme.colors?.client.darkGray,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.5rem 0.75rem',
                      cursor: 'pointer',
                      position: 'relative',
                      // '&:hover': {
                      //   backgroundColor: theme.colors?.custom?.greyBackground,
                      //   borderRadius: '0.625rem',
                      // },
                    }}
                  >
                    <CommonIcons.ArrowDownIcon />
                  </CommonStyles.Box>
                </IconButton>
              </CommonStyles.Box>
            )
          ) : (
            <CommonStylesClient.Button
              sx={{
                width: '10.5rem',
                background: theme.colors?.client?.coBaltBlue,
                borderRadius: '16px',
                textTransform: 'capitalize',
              }}
              onClick={handleClick}
            >
              {tIndex('login')}
            </CommonStylesClient.Button>
          )}
        </CommonStyles.Tooltip>
      </CommonStyles.Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            padding: '2rem 1.5rem',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
            ul: {
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              li: {
                width: '284px',
                padding: '5px',
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {renderlistMenuAccount()}

        {/* <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <MenuItem onClick={handleClose}>
            <Item icon={<CommonIcons.IconProfile2User />} label={t('Account.hostYourHome')} />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Item icon={<CommonIcons.IconFrag />} label={t('Account.hostAnExperience')} />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Item icon={<CommonIcons.IconInfoCircle />} label={t('Account.help')} />
          </MenuItem>
        </CommonStylesClient.Box> */}
        {/*  */}
        {isLogged ? (
          <Information avatar={avatar} name={name} phoneNumber={phone} />
        ) : (
          <LoginSignup />
        )}
        {/*  */}
      </Menu>
    </React.Fragment>
  );
}

export default AccountMenu;
