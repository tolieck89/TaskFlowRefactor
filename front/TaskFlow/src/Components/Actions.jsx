//Actions.jsx

import { DeleteOutlined, EditOutlined, EyeOutlined, CopyOutlined, LockOutlined } from '@ant-design/icons';
import { Popconfirm, Tooltip, Space } from 'antd';
import { Link } from 'react-router-dom';

const ActionsBlock  = ({onView, onEdit, onDelete, onCopy, onLock, item}) => {

 const getPath = (item) => {
  switch (item.type) {
    case 'group':
      return `/settings/groups/${item.id}`;
    case 'project':
      return `/projects/${item.id}`;
    case 'user':
      return `/users/${item.id}`;
    default:
      return '/'; ncds
  }
};

    return (
           
        <Space>
        
            <Tooltip title="View">
                <Link to={getPath(item)} state={{ item }}>

                <EyeOutlined 
                style={{cursor: 'pointer'}} />
                </Link>
            </Tooltip>
        
        {onEdit && (
            <Tooltip title='Edit record'>
                <EditOutlined 
                onClick={() => onEdit(item)}
                style={{cursor: 'pointer'}}

                />
            </Tooltip>
        )}
        
        {onDelete && (
            <Tooltip title='remove item'>
                <Popconfirm title="Do you really wanna live forever?" onConfirm={() => onDelete(item)}>            
                    <DeleteOutlined 
                        onClick={() => onDelete(item)}
                        style={{cursor: 'pointer'}}
                    />
                </Popconfirm>
             </Tooltip>
        ) }

        {onCopy && (
            <Tooltip title="Clone record">
                <CopyOutlined
                onClick={()=>onCopy(item)}
                />
            </Tooltip>
        )}    
        
        {onLock && (
            <Tooltip title="Lock">
                <LockOutlined
                    onClick={()=>onLock(item)}
                />
            </Tooltip>
        )}
        
        </Space>
)
}

export default ActionsBlock;