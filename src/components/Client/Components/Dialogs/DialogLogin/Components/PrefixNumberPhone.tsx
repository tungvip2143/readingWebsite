import React, { useState } from 'react';
import { Field } from 'formik';
import { useTheme } from '@mui/material';
import { isString, uniqBy } from 'lodash';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CustomFields from 'components/CustomFields';
import CommonIcons from 'components/Client/CommonIcons';
import useGetListPrefixPhone from 'modules/prefixPhone/hooks/useGetListPrefixPhone';
import { convertToFormSelect } from 'helpers/common';

interface PrefixNumberPhoneProps {
  readOnly?: boolean;
}

const parseContryCode = (countryCode: string) => {
  if (!isString(countryCode)) {
    return 0;
  }

  let nextCountryCode = countryCode;
  nextCountryCode = nextCountryCode.replaceAll(' ', '');
  return Number(nextCountryCode);
};

const PrefixNumberPhone = (props: PrefixNumberPhoneProps) => {
  //! State
  const { readOnly = false } = props;
  const [openSelect, setOpenSelect] = useState(false);
  const { data, isLoading: isLoadingListProvince } = useGetListPrefixPhone();

  const optionProvinces =
    uniqBy(
      convertToFormSelect(data || [], 'countryCallingCode', 'countryCode')
        ?.sort((a, b) => {
          return parseContryCode(a?.countryCallingCode) - parseContryCode(b?.countryCallingCode);
        })
        ?.map((el) => ({
          ...el,
          label: `+${el.label} ${el.value}`,
          // value: `+${el.value}`,
        })),
      'value'
    ) || [];

  const theme = useTheme();
  //! Function

  //! Render
  return (
    <Field
      name='phoneCode'
      placeholder={'Prefix'}
      component={CustomFields.SelectField}
      options={optionProvinces}
      loading={isLoadingListProvince}
      fullWidth
      open={openSelect}
      onOpen={() => setOpenSelect(true)}
      onClose={() => setOpenSelect(false)}
      sx={{
        borderRight: `1px solid ${theme.colors?.client?.gray}`,
        borderRadius: '0 !important',
        boxShadow: 'none',
        width: 'fit-content',
        '.MuiSelect-select': {
          width: 'fit-content',
          paddingRight: '4px',
          padding: '0 !important',
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: '160%',
          letterSpacing: '0.03rem',
          color: theme.colors?.client?.darkGray,
        },
        '.MuiOutlinedInput-notchedOutline': { border: 0 },
        '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          border: 0,
        },
        '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: 0,
        },
        '& .icon-chevron-down': {
          svg: {
            width: '0.75rem',
            height: '0.75rem',
          },
          marginLeft: '5px',
          marginRight: '8px',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      }}
      readOnly={true}
      sxContainer={{ width: 54 }}
      IconComponent={() => {
        return (
          <CommonStylesClient.Box
            className='icon-chevron-down'
            onClick={() => {
              setOpenSelect(true);
            }}
          >
            <CommonIcons.IconChevronDown />
          </CommonStylesClient.Box>
        );
      }}
    />
  );
};

export default React.memo(PrefixNumberPhone);
