import CommonStyles from 'components/CommonStyles';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import useToggleDialog from 'hooks/useToggleDialog';
import ShowTourguide from '../Components/ShowTourguide/ShowTourguide';
import DialogAddTourGuide from './DialogAddTourGuide';
import { Tour } from 'modules/tour/tour.interface';

interface DialogShowTourGuideProps {
  isOpen: boolean;
  toggle: () => void;
  tour: Tour;
}

export default function DialogShowTourGuide(props: DialogShowTourGuideProps) {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const { isOpen, toggle, tour } = props;

  const {
    open: openAddTourGuide,
    toggle: toggleAddTourGuide,
    shouldRender: shouldRenderAddTourGuide,
  } = useToggleDialog();

  //! Function

  //! Render
  return (
    <>
      {shouldRenderAddTourGuide && (
        <DialogAddTourGuide isOpen={openAddTourGuide} toggle={toggleAddTourGuide} tour={tour} />
      )}

      <CommonStyles.Dialog
        open={isOpen}
        toggle={toggle}
        title={
          <CommonStyles.Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <CommonStyles.Box>{t('Tour.localFriendInformation')}</CommonStyles.Box>
            <CommonStyles.Box>
              <CommonStyles.Button
                startIcon={<CommonIcons.AddIcon />}
                onClick={toggleAddTourGuide}
                sx={{
                  color: theme.colors?.white,
                  backgroundColor: theme.colors?.primary500,
                  '&.MuiLoadingButton-root:hover': {
                    backgroundColor: theme.colors?.primary500,
                    opacity: '0.6',
                  },
                }}
              >
                {t('Tour.addLocalFriendToTour')}
              </CommonStyles.Button>
            </CommonStyles.Box>
          </CommonStyles.Box>
        }
        content={<ShowTourguide tour={tour} />}
        disableClickOutside={false}
        maxWidth='md'
      />
    </>
  );
}
