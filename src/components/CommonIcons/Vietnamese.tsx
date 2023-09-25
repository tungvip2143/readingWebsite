import * as React from 'react';
import { SVGProps } from 'react';

const Vietnamese = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
    <path fill='#D80027' d='M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z' />
    <path
      fill='#FFDA44'
      d='m12 8.174.863 2.657h2.794l-2.26 1.642.863 2.657L12 13.488 9.74 15.13l.863-2.657-2.26-1.642h2.794L12 8.174Z'
    />
  </svg>
);
export default Vietnamese;
