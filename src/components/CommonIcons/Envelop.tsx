import * as React from 'react';
import { SVGProps } from 'react';
const Envelop = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
    <g fill='#fff' fillRule='evenodd' clipRule='evenodd'>
      <path d='M2.25 5.25A.75.75 0 0 1 3 4.5h18a.75.75 0 0 1 .75.75V18a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5V5.25Zm1.5.75v12h16.5V6H3.75Z' />
      <path d='M2.447 4.743a.75.75 0 0 1 1.06-.046L12 12.483l8.493-7.786a.75.75 0 0 1 1.014 1.106l-9 8.25a.75.75 0 0 1-1.014 0l-9-8.25a.75.75 0 0 1-.046-1.06Z' />
    </g>
  </svg>
);
export default Envelop;
