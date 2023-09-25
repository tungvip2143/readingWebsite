import React, { Fragment } from 'react';
import CommonStyles from '.';
import CommonIcons from 'components/CommonIcons';
import { TypeOfFilterHeader } from 'interfaces/common';
import useToggleDialog from 'hooks/useToggleDialog';

type OptionsRenderFilterHeader = {
  open: boolean;
  toggle: () => void;
};

export type RenderComponentHeadFilter = (options: OptionsRenderFilterHeader) => React.ReactNode;

interface Props<T> {
  type?: TypeOfFilterHeader;
  label?: string | React.ReactNode;
  renderComponent?: RenderComponentHeadFilter;
}

const HeadFilters = <T,>({
  type = TypeOfFilterHeader.dialog,
  renderComponent,
  label,
}: Props<T>) => {
  const { open, toggle, shouldRender } = useToggleDialog();
  const isOpenAnDialog = type === TypeOfFilterHeader.dialog;

  const renderContent = () => {
    if (isOpenAnDialog) {
      if (!shouldRender) {
        return;
      }
    }

    return renderComponent && renderComponent({ open, toggle });
  };

  return (
    <Fragment>
      {renderContent()}

      <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {label}
        <CommonStyles.Button
          isIconButton
          onClick={(e) => {
            e.stopPropagation();
            if (type === TypeOfFilterHeader.dialog) {
              toggle();
            }
          }}
        >
          <CommonIcons.FilterIcon />
        </CommonStyles.Button>
      </CommonStyles.Box>
    </Fragment>
  );
};

export default HeadFilters;
