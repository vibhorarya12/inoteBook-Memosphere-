import React from 'react';
import { Button, message } from 'antd';
const Msg = ({ onDisplayMessage }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info('Hello, Ant Design!');
  };
  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={() => onDisplayMessage(info)}>
        Display normal message
      </Button>
    </>
  );
};
export default Msg;