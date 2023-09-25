import React from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useFormikContext } from 'formik';
import { FormPlaceFilterValues } from 'components/Client/PlacesPage/PlacesContainer';

interface PopularFilterProps {
  afterOnChangeTag?: () => void;
}

interface ChipProps {
  label: string;
  tag: string;
  afterOnChangeTag?: () => void;
}

interface popularFilterData {
  title: string;
  total: number;
}

const Chip = (props: ChipProps) => {
  //! State
  const { label, afterOnChangeTag, tag } = props;
  const { values, setFieldValue } = useFormikContext<FormPlaceFilterValues>();
  const selected = values?.type?.includes(tag);
  const theme = useTheme();

  //! Function
  const toggleSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const type = event?.currentTarget?.id;

    if (values?.type !== undefined) {
      let newType = values?.type;
      if (newType?.includes(type)) {
        newType = newType.filter((item) => {
          return item !== type;
        });
        setFieldValue('type', newType);
      } else {
        newType = [...newType, type];
        setFieldValue('type', newType);
      }
      afterOnChangeTag && afterOnChangeTag();
    }
  };

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '1.5rem',
        width: 'fit-content',
        border: `1px solid ${
          selected ? theme.colors?.client?.coBaltBlue : theme.colors?.client?.midGray
        }`,
        cursor: 'pointer',
      }}
      id={tag}
      onClick={toggleSelect}
    >
      <CommonStylesClient.Typography
        type='title12'
        sx={{
          color: selected ? theme.colors?.client?.coBaltBlue : theme.colors?.client?.darkGray,
          fontWeight: 600,
        }}
      >
        {label}
      </CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};

const PopularFilter = (props: PopularFilterProps) => {
  //! State
  const t = useTranslations('TourPage');
  const theme = useTheme();

  const popularFilterData = [
    {
      title: 'Pub',
      total: 10,
    },
    {
      title: 'Bar',
      total: 10,
    },
    {
      title: 'Swimming Pool',
      total: 340,
    },
    {
      title: 'Private Bathroom',
      total: 200,
    },
    {
      title: 'Outdoor',
      total: 100,
    },
    {
      title: 'Hotels',
      total: 340,
    },
    {
      title: 'BAR',
      total: 115,
    },
  ];

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box>
      <CommonStylesClient.Typography
        type='mobiHeading3'
        sx={{ marginBottom: '1rem', color: theme.colors?.client?.black }}
      >
        {t('popularFilter')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {popularFilterData.map((items: popularFilterData, index: number) => {
          const label = `${items?.title} (${items?.total})`;
          return (
            <Chip
              label={label}
              key={index}
              tag={items?.title}
              afterOnChangeTag={props.afterOnChangeTag}
            />
          );
        })}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(PopularFilter);
