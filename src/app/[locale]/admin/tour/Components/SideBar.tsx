import CommonStyles from 'components/CommonStyles';
import React, { useState } from 'react';
import { SxProps, useTheme } from '@mui/material';
import { uniq } from 'lodash';

interface Props {
  list: any;
  sxContainItem?: SxProps;
  sxContainItemSelected?: SxProps;
}

export default function SideBar(props: Props) {
  //! State
  const theme = useTheme();
  const { list, sxContainItem, sxContainItemSelected } = props;
  const [checkedList, setCheckedList] = useState<string[]>([]);

  //! Function
  const isChecked = (id: string) => checkedList.indexOf(id) !== -1;

  const onSelectCheckBox = (event: React.ChangeEvent<HTMLInputElement>, data: any) => {
    setCheckedList((prev) => {
      if (prev.includes(data.id)) {
        const nextData = prev.filter((el) => el !== data.id);
        return nextData;
      }
      return uniq([...prev, data.id]);
    });
  };

  //! Render
  return (
    <CommonStyles.Box sx={{width: '20%'}}>
      {list.map((el: any) => {
        const isItemChecked = isChecked(el.id);
        return (
          <CommonStyles.Box
            key={el.id}
            sx={
              isItemChecked
                ? {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    padding: '0.375rem 0.75rem',
                    ...sxContainItemSelected,
                  }
                : {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    padding: '0.375rem 0.75rem',
                    ...sxContainItem,
                  }
            }
          >
            <CommonStyles.Box
              sx={{
                '& span': {
                  width: '1.5rem',
                  height: '1.5rem',
                },
              }}
            >
              <CommonStyles.CheckBox
                checked={isItemChecked}
                onChange={(event) => onSelectCheckBox(event, el)}
                color='primary'
              />
            </CommonStyles.Box>

            <CommonStyles.Box
              sx={
                isItemChecked
                  ? { color: theme.colors?.primary700, fontSize: '0.875rem' }
                  : {
                      fontSize: '0.875rem',
                      color: theme.colors?.custom?.textGreyLighter,
                    }
              }
            >
              {el.value}
            </CommonStyles.Box>
          </CommonStyles.Box>
        );
      })}
    </CommonStyles.Box>
  );
}
