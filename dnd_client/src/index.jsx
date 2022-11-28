import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import './app.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import MessengerCustomerChat from 'react-messenger-customer-chat';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <MessengerCustomerChat
      pageId={`${process.env.REACT_APP_FB_MESSENGER_CHAT_PAGE_ID}`}
      appId={`${process.env.REACT_APP_FB_MESSENGER_CHAT_APP_ID}`}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
