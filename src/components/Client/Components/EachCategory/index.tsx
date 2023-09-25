import React from 'react';
import { useTheme } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import HeadingList from './Components/HeadingList';
import TourDetail from '../Tour';
import { Tour } from 'modules/tour/tour.interface';
import { IMG_URL } from 'constants/apiUrls';
import pageUrls from 'constants/pageUrls';

interface EachCategoryProps {
  isHideBorderBottom?: boolean;
  label: string;
  href?: string;
  allNumber: number;
  tours: Tour[];
  hiddenShowAll?: boolean;
}

const EachCategory = (props: EachCategoryProps) => {
  //! State
  const {
    label = '',
    href = '',
    allNumber = 0,
    isHideBorderBottom = true,
    tours = [],
    hiddenShowAll = false,
  } = props;
  const theme = useTheme();
  //! Function
  const tourList = hiddenShowAll ? tours : tours?.slice(0, 6);

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        borderBottom: isHideBorderBottom ? 'none' : `1px solid ${theme.colors?.client?.midGray}`,
        marginBottom: isHideBorderBottom ? 0 : '1rem',
      }}
    >
      <HeadingList label={label} href={href} allNumber={allNumber} hiddenShowAll={hiddenShowAll} />
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          flexDirection: 'row',
          padding: '1.5rem 0',
        }}
      >
        {tourList.map((el: Tour) => {
          return (
            <CommonStylesClient.Box key={el.id} sx={{ width: 287 }}>
              <TourDetail
                key={el.id}
                image={`${IMG_URL}/${el.thumbnail}`}
                name={el?.name || ''}
                place={el.Area?.name || ''}
                price={Number(el?.defaultPrice || 0)}
                rating={Number(el.avgRate)}
                href={`${pageUrls.DetailTour}${el.id}`}
              />
            </CommonStylesClient.Box>
          );
        })}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(EachCategory);
