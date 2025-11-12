import BackButton from '../../Components/BackButton';
import {
  Flex,
  Form,
  Descriptions,
  Select,
  Badge,
  Switch,
  Input,
  Button,
  DatePicker,
  Tag,
} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskForm from './TaskForm';
import dayjs from 'dayjs';

const TaskDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [task, setTask] = useState(location.state?.item || {});

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        taskSummary: task.taskSummary,
        taskPriority: task.taskPriority,
        allowedWatchers: task.allowedWatchers,
        taskProject: task.taskProject,
        taskAtatus: task.taskAtatus,
        issueType: task.issueType,
        id: task.id,
        deadline: task.deadline ? dayjs(task.deadline) : null,
        createdAt: task.createdAt,
        assignee: task.assignee,
        taskDescription: task.taskDescription || '',
      });
    }
  }, [task]);

  const boxStyle = {
    marginBottom: 24,
    width: '100%',
  };

  const items = (task) => {
    const changeLog = task.changeLog;
    return [
      {
        key: '1',
        label: 'Task ID',
        children: task.id,
      },
      {
        key: '2',
        label: 'Summary',
        children: task.taskSummary,
      },
      {
        key: '3',
        label: 'Created at',
        children: new Date(task.createdAt).toLocaleString(),
      },

      {
        key: '4',
        label: 'Edited at',
        children: task.editedAt || '',
      },

      {
        key: '5',
        label: 'Status',
        children: task.taskAtatus,
      },

      {
        key: '6',
        label: 'Proprity',
        children: task.taskPriority,
      },
      {
        key: '7',
        label: 'Project',
        children: task.taskProject,
      },
      {
        key: '8',
        label: 'Issue type',
        children: task.issueType,
      },
      {
        key: '9',
        label: 'Assignee',
        children: task.assignee,
      },
      {
        key: '10',
        label: 'Allowed watchers',
        children:
          Array.isArray(task.allowedWatchers) && task.allowedWatchers.length > 0 ? (
            <>
              {task.allowedWatchers.map((user, index) => (
                <Tag key={index}>{user}</Tag>
              ))}
            </>
          ) : (
            '-'
          ),
      },
      {
        key: '11',
        label: 'Changelog',
        children:
          Array.isArray(changeLog) && changeLog.length > 0 ? (
            <>
              {changeLog.map((entry, index) => (


<Tag key={index}>{JSON.stringify(entry)}</Tag>              ))}
            </>
          ) : (
            '-'
          ),
      },
    ];
  };

  const [editMode, setEditMode] = useState(false);

  if (!task) return <div>❌ Task not found</div>;

  return (
    <>
      <Flex style={boxStyle} justify="space-between" align="center">
        <BackButton />
        <Switch
          checked={editMode}
          onChange={setEditMode}
          checkedChildren="Edit"
          unCheckedChildren="View"
        />
      </Flex>

      <h2>{task.id}</h2>

      {!editMode ? (
        <Descriptions title="Task info" layout="vertical" bordered items={items(task)} />
      ) : (
        <>
          <TaskForm
            form={form}
            isEdit={true}
            task={task}
            onSuccess={(updatedTask) => {
              setTask(updatedTask);
              setEditMode(false);
              navigate(`/tasks/${updatedTask.id}`, { state: { item: updatedTask } });
            }}
          />
          <Descriptions layout="vertical" bordered>
            <Descriptions.Item label="Created at">
              {new Date(task.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Edited at">
              {new Date(task.editedAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Allowed watchers"></Descriptions.Item>
       
          </Descriptions>
        </>
      )}
    </>
  );
};

export default TaskDetails;
