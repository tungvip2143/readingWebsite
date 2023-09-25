import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import React from 'react';
import { useTranslations } from 'next-intl';
import { TourGuide } from 'modules/tour-guide/tour-guide.interface';
import DialogViewDetails from '../Dialog/DialogViewDetails';
import CommonIcons from 'components/CommonIcons';
import { useTheme } from '@mui/material';
import { Product } from 'modules/service/service.interface';

interface ICellActions {
  data: Product;
}

const CellActions = (props: ICellActions) => {
  //! State
  const t = useTranslations();
  const { data } = props;
  const theme = useTheme();
  const {
    shouldRender: shouldRenderDetailDialog,
    open: openDetailsDialog,
    toggle: toggleDetailsDialog,
  } = useToggleDialog();
  //! Function

  //! Render
  return (
    <>
      {shouldRenderDetailDialog && (
        <DialogViewDetails isOpen={openDetailsDialog} toggle={toggleDetailsDialog} data={data} />
      )}

      <CommonStyles.Box sx={{ width: 80 }}>
        <CommonIcons.EditIcon
          sx={{ cursor: 'poiter', color: theme.colors?.primary500 }}
          onClick={toggleDetailsDialog}
        />
      </CommonStyles.Box>
    </>
  );
};

export default React.memo(CellActions);
