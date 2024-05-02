import React, {FC} from 'react';
import {StatusBar} from 'react-native';

interface IStatusbarProps {
  backgroundColor: string;
}

const Statusbar: FC<IStatusbarProps> = ({backgroundColor}) => {
  return (
    <StatusBar
      animated={true}
      backgroundColor={backgroundColor}
      barStyle={'dark-content'}
    />
  );
};

export default Statusbar;
