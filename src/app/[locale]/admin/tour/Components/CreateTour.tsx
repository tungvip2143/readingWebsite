'use client';

import CommonStyles from 'components/CommonStyles';
import React from 'react';
import Content from './Content';
import { Tour } from 'modules/tour/tour.interface';

interface ICreateTour {
  tour?: Tour;
  toggle: () => void;
}

export default function CreateTour(props: ICreateTour) {
  //! State
  const { tour, toggle } = props;

  //! Function

  //! Render
  return (
    <CommonStyles.Box>
      <Content tour={tour} toggle={toggle} />
    </CommonStyles.Box>
  );
}
