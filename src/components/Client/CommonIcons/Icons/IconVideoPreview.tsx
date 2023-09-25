import * as React from 'react';
import { SVGProps } from 'react';
const IconVideoPreview = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlSpace='preserve'
    width={props?.width}
    height={props?.height}
    viewBox='0 0 512 512'
    {...props}
  >
    <path
      d='M256 0C114.616 0 0 114.616 0 256s114.616 256 256 256 256-114.616 256-256S397.384 0 256 0z'
      style={{
        fill: '#88c5cc',
      }}
    />
    <path
      d='M204 84h176c4.4 0 8 3.6 8 8v328c0 4.4-3.6 8-8 8H132c-4.4 0-8-3.6-8-8V168l80-84z'
      style={{
        fill: '#f5f5f5',
      }}
    />
    <path
      d='M196 168c4.4 0 8-3.6 8-8V84l-80 84h72z'
      style={{
        fill: '#e6e6e6',
      }}
    />
    <circle
      cx={256}
      cy={272}
      r={72}
      style={{
        fill: '#e16b5a',
      }}
    />
    <path
      d='M239.472 241.984C237.564 240.892 236 241.8 236 244v56c0 2.2 1.564 3.108 3.472 2.016l49.056-28.032c1.916-1.092 1.916-2.876 0-3.968l-49.056-28.032z'
      style={{
        fill: '#f5f5f5',
      }}
    />
  </svg>
);
export default IconVideoPreview;
