import { useEffect } from 'react';
import Broadcast from 'services/broadcastService';

export default () => {
  useEffect(() => {
    Broadcast.channelSwitchUser().initListener();
  }, []);
};