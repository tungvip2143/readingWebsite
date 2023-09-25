import CommonStyles from 'components/CommonStyles';
import React from 'react';
import { Formik, Form, FastField, FormikValues, FormikHelpers } from 'formik';
import CustomFields from 'components/CustomFields';
import { SelectOption, SetBooleanState, SetOptionsValue } from 'interfaces/common';
import { useTranslations } from 'next-intl';
import CreateService from '../Components/CreateService/CreateService';
import ShowService from '../Components/ShowService/ShowService';
import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogAddService from './DialogAddService';
import { Tour } from 'modules/tour/tour.interface';

interface DialogShowServiceProps {
  isOpen: boolean;
  toggle: () => void;
  tour: Tour;
}

export default function DialogShowService(props: DialogShowServiceProps) {
  //! State
  const { isOpen, toggle, tour } = props;
  const t = useTranslations();
  const theme = useTheme();
  const {
    open: openCreateService,
    toggle: toggleCreateService,
    shouldRender: shouldRenderCreateService,
  } = useToggleDialog();

  //! Function

  //! Render
  return (
    <>
      {shouldRenderCreateService && (
        <DialogAddService isOpen={openCreateService} toggle={toggleCreateService} tour={tour} />
      )}

      <CommonStyles.Dialog
        open={isOpen}
        toggle={toggle}
        title={
          <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CommonStyles.Box>{t('Tour.serviceInformation')}</CommonStyles.Box>
            <CommonStyles.Box>
              <CommonStyles.Button
                startIcon={<CommonIcons.AddIcon />}
                onClick={toggleCreateService}
                sx={{
                  color: theme.colors?.white,
                  backgroundColor: theme.colors?.primary500,
                  '&.MuiLoadingButton-root:hover': {
                    backgroundColor: theme.colors?.primary500,
                    opacity: '0.6',
                  },
                }}
              >
                {t('Tour.addService')}
              </CommonStyles.Button>
            </CommonStyles.Box>
          </CommonStyles.Box>
        }
        content={<ShowService tour={tour} />}
        disableClickOutside={false}
        maxWidth='md'
      />
    </>
  );
}
