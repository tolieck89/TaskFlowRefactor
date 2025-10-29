import React from 'react';
import { DeleteOutlined, EditOutlined, EyeOutlined, CopyOutlined, LockOutlined } from '@ant-design/icons';
import { Popconfirm, Tooltip, Space } from 'antd';

const ActionsBlock  = ({onView, onEdit, onDelete, onCopy, onLock, item}) => {

    return (
           
        <Space>
        
        { onView && (
            <Tooltip title="View">
                <EyeOutlined 
                onClick={() => onView(item)}
                style={{cursor: 'pointer'}}
                / >
            </Tooltip>
        )}
        
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