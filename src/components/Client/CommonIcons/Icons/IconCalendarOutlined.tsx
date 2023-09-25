import * as React from 'react';
import { SVGProps } from 'react';

const IconCalendarOutlined = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} fill='none' {...props}>
    <path
      stroke='#151B33'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d='M6.667 1.667v2.5M13.334 1.667v2.5M2.917 7.575h14.166M17.5 7.084v7.083c0 2.5-1.25 4.167-4.167 4.167H6.667c-2.917 0-4.167-1.667-4.167-4.167V7.084c0-2.5 1.25-4.167 4.167-4.167h6.666c2.917 0 4.167 1.667 4.167 4.167Z'
    />
    <path
      stroke='#151B33'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M13.08 11.417h.007M13.08 13.917h.007M9.996 11.417h.008M9.996 13.917h.008M6.912 11.417h.008M6.912 13.917h.008'
    />
  </svg>
);

export default IconCalendarOutlined;
