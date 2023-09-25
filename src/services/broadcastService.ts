import { BroadcastChannel } from 'broadcast-channel';
import pageUrls from 'constants/pageUrls';
import { detectBrowserHidden } from 'helpers/common';

export const KEY_BROADCAST_LOGOUT = 'KEY_BROADCAST_LOGOUT'

class Broadcast {
  channelSwitchUser() {
    return {
      initListener: () => {
        const channel = new BroadcastChannel(KEY_BROADCAST_LOGOUT);
        channel.addEventListener('message', () => {
          const { isHidden } = detectBrowserHidden();
          if (isHidden) {
            window.location.href = pageUrls.Homepage
          }
        });
      },

      postMessageReload: () => {
        const channel = new BroadcastChannel(KEY_BROADCAST_LOGOUT);
        channel.postMessage(KEY_BROADCAST_LOGOUT);
      },
    };
  }
}

export default new Broadcast();