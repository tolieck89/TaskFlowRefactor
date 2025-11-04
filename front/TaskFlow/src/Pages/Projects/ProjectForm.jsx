import { Form, Input, Radio, Select, Space} from 'antd';
import { useUserModal } from '../../app/hooks/useUserModal';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from './ProjectSlicer';


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

const ProjectForm = ({ form }) => {
    const {close} = useUserModal();
    const disp = useDispatch();

const onFinish = values => {
  const project = {
    ...values.project,
    id: Date.now(), 
    projectTasks: [],
    type: "project"
  };

  disp(addProject(project));
  form.resetFields();
  close();
};


const variant = Form.useWatch('variant', form);

const users = useSelector(state => state.users);

const options = users.map(user =>({
 label: user.name,
 value: user.id,
}));


const handleChange = value => {
  console.log(`selected ${value}`);
};

  return (
    <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
    validateMessages={validateMessages}
    form={form}
  >
    <Form.Item name={['project', 'name']} label="Project name"  tooltip="it must be unique title" rules={[{ required: true, message: 'Please input project name!' }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['project', 'key']} label="Project key" tooltip="it must be unique title" rules={[{required: true, message: 'Please input project key!' }]}>
      <Input />
      </Form.Item>
      
    <Form.Item name={['project', 'group']}  label="Grant access for"  >
     <Select
    mode="multiple"
    showSearch 
      filterOption={(input, option) =>
    option.label.toLowerCase().includes(input.toLowerCase())
  }

    style={{ width: '100%' }}
    placeholder="Select at least one employee or group"
    defaultValue={[]}
    onChange={handleChange}
    options={options}
    
  />
    </Form.Item>
    <Form.Item name={['project', 'issuetype']}  label="Issue types"  >
     <Select
    mode="tags"
    style={{ width: '100%' }}
    placeholder="Input isue types for this project"
   
    onChange={handleChange}
  
  
  />
    </Form.Item>
    <Form.Item name={['project', 'description']} label="Project description">
      <Input />
      </Form.Item>


    <Form.Item label="isProtected" name={['project', 'isProtected']}>
          <Radio.Group>
            <Radio value="yes"> Yes </Radio>
            <Radio value="no"> No </Radio>
          </Radio.Group>
        </Form.Item>
    
  </Form>
  );
}

export default ProjectForm;