import * as React from 'react';
import { SVGProps } from 'react';
const PlayVideo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={48} height={48} fill='none' {...props}>
    <path
      fill='#FCFCFD'
      d='M23.94 4c-11.04 0-20 8.96-20 20s8.96 20 20 20 20-8.96 20-20S35 4 23.94 4Zm6 24.46-5.8 3.34c-.72.42-1.52.62-2.3.62-.8 0-1.58-.2-2.3-.62a4.57 4.57 0 0 1-2.3-4v-6.7c0-1.66.86-3.16 2.3-4 1.44-.84 3.16-.84 4.62 0l5.8 3.34a4.57 4.57 0 0 1 2.3 4c0 1.68-.86 3.18-2.32 4.02Z'
    />
  </svg>
);
export default PlayVideo;
