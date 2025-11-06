import React from 'react';
import { Space, Switch } from 'antd';
import { useDispatch } from 'react-redux';
import { switchTheme } from '../../Layout/layoutSlicer';

const Profile = () => {
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(switchTheme());
  };
  return (
    <div>
      Here will be Profile soon.
      <Space direction="vertical">
        <Switch
          checkedChildren="Dark"
          unCheckedChildren="Light"
          defaultChecked
          onChange={handleToggle}
        />
      </Space>
    </div>
  );
};

export default Profile;
