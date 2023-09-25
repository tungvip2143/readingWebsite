import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FastField, Form, Formik } from 'formik';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import CustomFields from 'components/CustomFields';

interface StillEmptyPlacesDetailContainerProps {}

interface FormFindTableWithDATE {
  checkInDate?: Date | null;
}

interface TableCount {
  count: number;
}

interface CheckInDate {
  onAccept?: (value: FormFindTableWithDATE) => void;
}

const CheckInDate = (props: CheckInDate) => {
  const { onAccept } = props;
  const theme = useTheme();

  return (
    <CommonStylesClient.Box
      sx={{
        padding: '0.75rem 0.875rem',
        background: theme.colors?.client.lightGray,
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem',
        postion: 'relative',
        svg: {
          marginTop: '4px',
        },
      }}
    >
      <CommonIcons.IconCalendarBlack />
      <FastField
        disablePast
        name='checkInDate'
        component={CustomFields.DatePickerField}
        onAccept={onAccept}
        sxContainer={{
          input: {
            padding: '0 !important',
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: '1.4rem',
            letterSpacing: '0.56px',
            color: theme.colors?.client?.midBlack,
            [':hover']: {
              cursor: 'pointer',
            },
            marginTop: '5px',
          },
          fieldset: {
            border: '0',
          },
          ['.MuiFormHelperText-root']: {
            position: 'absolute',
            width: 300,
            top: 34,
            left: '-27px',
            margin: 0,
          },
        }}
        isMobileDatePicker
      />
    </CommonStylesClient.Box>
  );
};

const TableCount = (props: TableCount) => {
  const { count = 0 } = props;
  const t = useTranslations('PlacesDetail');
  const theme = useTheme();
  return (
    <CommonStylesClient.Box
      sx={{
        padding: '0.875rem',
        border: `1px solid ${theme.colors?.client?.midGray}`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.625rem',
        borderRadius: '1rem',
      }}
    >
      <CommonStylesClient.Typography
        type='mobiHeading4'
        sx={{ color: theme.colors?.client?.midBlack }}
      >
        {count}
      </CommonStylesClient.Typography>
      <CommonStylesClient.Typography
        type='text14'
        sx={{
          color: theme.colors?.client?.darkGray,
          borderLeft: `1px solid ${theme.colors?.client?.midGray}`,
          paddingLeft: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {t('table')}
      </CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};
const StillEmptyPlacesDetailContainer = (props: StillEmptyPlacesDetailContainerProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('PlacesDetail');
  const [numberTable, setNumberTable] = useState<number>(0);

  const initialValues = {
    checkInDate: null,
  };

  //! Function
  const onSubmit = (values: FormFindTableWithDATE) => {
    const bodyParsed = {
      checkInDate: values.checkInDate?.toString(),
    };
    setNumberTable(10);
  };

  //! Render
  return (
    <Formik initialValues={initialValues} validateOnBlur validateOnChange onSubmit={onSubmit}>
      <Form>
        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            marginBottom: '3rem',
            gap: '1rem',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <CommonStylesClient.Typography
            type='pcHeading4'
            sx={{ color: theme.colors?.client?.black }}
          >
            {t('stillEmpty')}
          </CommonStylesClient.Typography>

          <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
            {/* Time */}
            <CheckInDate onAccept={onSubmit} />
            {/* Day */}
            <TableCount count={numberTable} />
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </Form>
    </Formik>
  );
};

export default React.memo(StillEmptyPlacesDetailContainer);
