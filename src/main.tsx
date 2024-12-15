import './createPost.js';

import { Devvit, useState } from '@devvit/public-api';



Devvit.configure({
  redditAPI: true,
  redis: true,
});


Devvit.addCustomPostType({
  name: 'Typing Tornado',
  height: 'tall',
  render: (context) => {
    
    const [username] = useState(async () => {
      const currUser = await context.reddit.getCurrentUser();
      return currUser?.username ?? 'anon';
    });

    const [webviewVisible, setWebviewVisible] = useState(false);

    const onMessage = async (msg: WebViewMessage) => {
      switch (msg.type) {
        case 'initialData':
          break;
        default:
          throw new Error(`Unknown message type: ${msg satisfies never}`);
      }
    };

    const onShowWebviewClick = () => {
      setWebviewVisible(true);
      context.ui.webView.postMessage('myWebView', {
        type: 'initialData',
        data: {
          username: username,
        },
      });
    };
    return (
      <vstack grow padding="small">
        <vstack
          grow={!webviewVisible}
          height={webviewVisible ? '0%' : '100%'}
          alignment="middle center"
        >
          <text size="xlarge" weight="bold">
           Typing Tornado
          </text>
          <spacer />
          <vstack alignment="start middle">
            <hstack>
              <text size="medium">Username : </text>
              <text size="medium" weight="bold">
                {' '}
                {username ?? ''}
              </text>
            </hstack>
            
          </vstack>
          <spacer />
          <button onPress={onShowWebviewClick} backgroundColor="#ff6f6f" color="black">Play</button>
        </vstack>
        <vstack grow={webviewVisible} height={webviewVisible ? '100%' : '0%'}>
          <vstack border="thick" borderColor="black" height={webviewVisible ? '100%' : '0%'}>
            <webview
              id="myWebView"
              url="page.html"
              onMessage={(msg) => onMessage(msg as WebViewMessage)}
              grow
              height={webviewVisible ? '100%' : '0%'}
            />
          </vstack>
        </vstack>
      </vstack>
    );
  },
});

export default Devvit;
