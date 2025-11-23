import React, { useState } from 'react';
import { Button, Drawer, Radio, Space, Row, Col, Flex } from 'antd';
const Filters = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');
  const showDrawer = () => {
    setOpen(true);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Flex justify="flex-end" align="center" gap="small">
        <Button type="primary" onClick={showDrawer}>
          Filter
        </Button>
      </Flex>

      <Drawer title="Filters" width={280} onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={onClose}>
            OK
          </Button>
        </Space>
      </Drawer>
    </>
  );
};
export default Filters;
