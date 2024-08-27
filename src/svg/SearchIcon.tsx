

import React from 'react';
import { Svg, Path } from 'react-native-svg';


export const SearchIcon = ({ color = "#292B32" }: { color?: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.8594 19.7383L16.6055 15.4844C16.5 15.4141 16.3945 15.3438 16.2891 15.3438H15.832C16.9219 14.0781 17.625 12.3906 17.625 10.5625C17.625 6.55469 14.3203 3.25 10.3125 3.25C6.26953 3.25 3 6.55469 3 10.5625C3 14.6055 6.26953 17.875 10.3125 17.875C12.1406 17.875 13.793 17.207 15.0938 16.1172V16.5742C15.0938 16.6797 15.1289 16.7852 15.1992 16.8906L19.4531 21.1445C19.6289 21.3203 19.9102 21.3203 20.0508 21.1445L20.8594 20.3359C21.0352 20.1953 21.0352 19.9141 20.8594 19.7383ZM10.3125 16.1875C7.18359 16.1875 4.6875 13.6914 4.6875 10.5625C4.6875 7.46875 7.18359 4.9375 10.3125 4.9375C13.4062 4.9375 15.9375 7.46875 15.9375 10.5625C15.9375 13.6914 13.4062 16.1875 10.3125 16.1875Z"
      fill={color}
    />
  </Svg>
);
