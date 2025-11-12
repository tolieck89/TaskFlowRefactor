import { Form, Input, Radio, Select, Space, DatePicker, Button } from 'antd';
import { useUserModal } from '../../app/hooks/useUserModal';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from './TaskSlicer';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import priorities from '../../Components/Priorities';
import { editTask } from './TaskSlicer';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const TaskForm = ({ form, isEdit = false, task = {}, onSuccess }) => {
  const user = useSelector((state) => state.auth.authUser);

  const { TextArea } = Input;
  const taskBeforeChange = task;
  const { close } = useUserModal();
  const disp = useDispatch();
  const onFinish = (values) => {
    console.log('Form submitted') 

    if (isEdit) {
      values.deadline = dayjs(values.deadline).format('YYYY-MM-DD');
      const updateTask = {
        ...task,
        ...values,
      };

      function changelog() {
        const log = [];

    for (const key in taskBeforeChange) {
  if (taskBeforeChange[key] !== updateTask[key]) {
    const when = dayjs().format('DD-MM-YY-HH-mm-ss');
    const change = {
      'Value: ': { [key]: updateTask[key] },
      'Was: ': taskBeforeChange[key],
      'Current: ': updateTask[key],
      'Edited by: ': { user },
      'Edited at: ': when,
    };
    log.push(change);
  }
}
        console.log('Кінцевий лог: ', log);
if (log.length > 0) {
  updateTask.changeLog = [...(updateTask.changeLog || []), ...log];
}      }
            changelog();

      disp(editTask(updateTask));
      onSuccess?.(updateTask);
    } else {
      values.deadline = dayjs(values.deadline).format('YYYY-MM-DD');
      values.taskAtatus = 'New';
      values.createdBy = user;
      disp(addTask(values));
      form.resetFields();
      close();
    }
  };

  const users = useSelector((state) => state.users);

  const projects = useSelector((state) => state.projects);

  const projectsOptions = projects.map((project) => ({
    label: project.key,
    value: project.key,
  }));

  const priorityOprions = priorities.map((priority) => ({
    label: priority.priority,
    value: priority.priority,
  }));

  const [issueOptions, setissueOptions] = useState([]);
  const [usersOptions, setUserOptions] = useState([]);

  const variant = Form.useWatch('variant', form);

  const handleChangeProject = (value) => {
    const selectedIssues = projects.find((p) => String(p.key) === String(value))?.issuetype || [];
    const selectedUsers = projects.find((p) => String(p.key) === String(value))?.group || [];

    const formattedIssues = selectedIssues.map((type) => ({
      label: type,
      value: type,
    }));
    const formattedUsers = selectedUsers.map((type) => ({
      label: type,
      value: type,
    }));
    setissueOptions(formattedIssues);
    setUserOptions(formattedUsers);
  };
  useEffect(() => {
    if (isEdit && task?.taskProject) {
      handleChangeProject(task.taskProject);
    }
  }, [isEdit, task?.taskProject]);

  const handleChange = (value) => {};

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
      form={form}
    >
      <Form.Item
        name="taskSummary"
        label="Summary"
        tooltip="Say 'Hello' to my little friend!"
        rules={[{ required: true, message: 'Please input summary' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="taskProject" label="Select project">
        <Select
          mode="single"
          showSearch
          filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
          style={{ width: '100%' }}
          placeholder="Select project"
          onChange={handleChangeProject}
          options={projectsOptions}
        />
      </Form.Item>
      <Form.Item name="taskPriority" label="Select priority">
        <Select
          mode="single"
          showSearch
          filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
          style={{ width: '100%' }}
          placeholder="Select priority"
          onChange={handleChange}
          options={priorityOprions}
        />
      </Form.Item>

      <Form.Item name="issueType" label="Choose issue type">
        <Select
          mode="single"
          showSearch
          filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
          style={{ width: '100%' }}
          placeholder="Select issue type"
          onChange={handleChange}
          options={issueOptions}
          rules={[{ required: true, message: 'Please choose the issue type' }]}
        />
      </Form.Item>

      <Form.Item name="taskDescription" label="Task description">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item name="assignee" label="Assign to">
        <Select
          mode="single"
          showSearch
          filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
          style={{ width: '100%' }}
          placeholder="Select issue assignee"
          onChange={handleChange}
          options={usersOptions}
          rules={[{ required: true, message: 'Please choose the assignee' }]}
        />
      </Form.Item>
      <Form.Item name="allowedWatchers" label="Allowed watchers">
        <Select
          mode="multiple"
          showSearch
          filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
          style={{ width: '100%' }}
          placeholder="Select allowed watchers"
          onChange={handleChange}
          options={usersOptions}
        />
      </Form.Item>

      <Form.Item name="deadline" label="Deadline">
        <DatePicker />
      </Form.Item>
      {isEdit &&
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item> }
    </Form>
  );
};

export default TaskForm;
