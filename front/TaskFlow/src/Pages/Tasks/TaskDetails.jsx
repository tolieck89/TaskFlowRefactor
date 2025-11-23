import BackButton from '../../Components/BackButton';
import { Flex, Form, Descriptions, Switch, Input, Button, Tag } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTask, addComment } from '../../app/Reducers/TaskSlicer';
import TaskForm from './TaskForm';
import dayjs from 'dayjs';

const TaskDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [task, setTask] = useState(location.state?.item || {});
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const { TextArea } = Input;

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

  const renderChangeLog = (log) => {
    return log.map((entry, index) => (
      <div key={index}>
        {Object.entries(entry).map(([key, value], i) => (
          <div key={i}>
            <strong>{key}</strong>: {JSON.stringify(value)}
          </div>
        ))}
      </div>
    ));
  };
  const currentUser = useSelector((state) => state.auth.authUser);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    let comment = {};
    comment.text = values.taskComment;
    comment.sendAt = dayjs().format('DD-MM-YY-HH-mm-ss');
    comment.sendBy = currentUser;
    const id = task.id;

    console.log(comment);

    const updateTask = {
      id,
      comment,
    };
    dispatch(addComment(updateTask));
    form.resetFields();
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
        key: '12',
        label: 'Commentas',
        children: JSON.stringify(task.comment),
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
                // console.log(entry, index),

                <Tag key={index}>{renderChangeLog(changeLog)}</Tag>
              ))}
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
        <>
          <Descriptions title="Task info" layout="vertical" bordered items={items(task)} />

          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            form={form}
          >
            <Form.Item
              name="taskComment"
              label="Leave the comment"
              tooltip="Say 'Hello' to my little friend!"
            >
              <TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Form>
        </>
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
            <Descriptions.Item label="Created at">{task.createdAt}</Descriptions.Item>
            <Descriptions.Item label="Edited at">{task.editedAt}</Descriptions.Item>
          </Descriptions>
        </>
      )}
    </>
  );
};

export default TaskDetails;
