import {
  Table,
  Tag,
  Space,
  Card,
  Button,
  Form,
  Drawer,
  Row,
  Col,
  Input,
  DatePicker,
  Select,
  Tooltip,
} from 'antd';
import { useEffect, useState } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { connect } from 'react-redux';
import useToggle from '../../Hooks/useToggle';
import {
  getStudents,
  selectStudent,
  updateStudent,
  deleteStudent,
} from '../../redux/actions/student';
// const { Option } = Select;

const Student = ({
  list,
  getStudents,
  selectStudent,
  updateStudent,
  deleteStudent,
  selected,
}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // render: (text) => <a>{text}</a>,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      ellipsis: true,
    },
    {
      title: 'Registration No.',
      dataIndex: 'regNo',
      key: 'regNo',
      ellipsis: true,
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (tags) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Tooltip placement='left' title='Edit'>
            <Button
              onClick={() => {
                console.log({ record });
                selectStudent(record);
                toggle();
              }}
              icon={<BsPencil className='text-primary' />}
            />
          </Tooltip>
          <Tooltip placement='right' title='Delete'>
            <Button
              onClick={() => deleteStudent(record.id)}
              danger
              icon={<BsTrash className='text-danger' />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  const [visible, toggle] = useToggle(false);
  const [filtered, setFiltered] = useState(undefined);

  const onSearch = (txt) => {
    if (txt) {
      setFiltered(
        list.filter((item) => {
          const regex = new RegExp(`${txt}`, 'gi');
          return (
            item.name.match(regex) ||
            item.email.match(regex) ||
            item.regNo.match(regex)
          );
        })
      );
    } else {
      setFiltered(undefined);
    }
  };
  useEffect(() => {
    getStudents();
    return () => {};
  }, []);
  return (
    <>
      <Card
        title='Students'
        hoverable
        extra={
          <Input
            type='search'
            placeholder='Search student'
            style={{ width: 200 }}
            allowClear
            onChange={(e) => {
              onSearch(e.currentTarget.value);
            }}
          />
        }
      >
        <Table columns={columns} dataSource={filtered || list} />
      </Card>
      <StudentForm
        visible={visible}
        toggle={() => {
          toggle();
          selectStudent(undefined);
        }}
        selected={selected}
        updateStudent={updateStudent}
      />
    </>
  );
};

const StudentForm = ({ visible, toggle, selected, updateStudent }) => {
  const [loading, toggleLoading] = useToggle(false);
  const onFinish = async (values) => {
    console.log('Success:', values, { ...selected, ...values });
    toggleLoading();
    await updateStudent({ ...selected, ...values });
    toggleLoading();
    toggle();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Drawer
      title='Edit Student'
      width={720}
      onClose={toggle}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      destroyOnClose={true}
      footer={
        <Space className='float-end'>
          <Button disabled={loading} onClick={toggle}>
            Cancel
          </Button>
          <Button
            htmlType='submit'
            form='student-form'
            key='submit'
            type='primary'
            loading={loading}
          >
            Submit
          </Button>
        </Space>
      }
    >
      <Form
        name='student-form'
        layout='vertical'
        hideRequiredMark
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={selected}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='name'
              label='Name'
              rules={[{ required: true, message: 'Please enter name' }]}
              // initialValue={selected?.name}
            >
              <Input placeholder='Please enter name' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='phoneNumber'
              label='Phone'
              rules={[{ required: true, message: 'Please enter phone' }]}
              // initialValue={selected?.phoneNumber}
            >
              <Input
                style={{ width: '100%' }}
                // addonBefore='http://'
                // addonAfter='.com'
                placeholder='Please enter phone number'
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='regNo'
              label='Registration No.'
              rules={[
                { required: true, message: 'Please enter registration number' },
              ]}
              // initialValue={selected?.regNo}
            >
              <Input placeholder='Please enter registration number' />
            </Form.Item>
          </Col>
        </Row>
        {/* <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='owner'
              label='Owner'
              rules={[{ required: true, message: 'Please select an owner' }]}
            >
              <Select placeholder='Please select an owner'>
                <Option value='xiao'>Xiaoxiao Fu</Option>
                <Option value='mao'>Maomao Zhou</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='type'
              label='Type'
              rules={[{ required: true, message: 'Please choose the type' }]}
            >
              <Select placeholder='Please choose the type'>
                <Option value='private'>Private</Option>
                <Option value='public'>Public</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='approver'
              label='Approver'
              rules={[
                { required: true, message: 'Please choose the approver' },
              ]}
            >
              <Select placeholder='Please choose the approver'>
                <Option value='jack'>Jack Ma</Option>
                <Option value='tom'>Tom Liu</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='dateTime'
              label='DateTime'
              rules={[
                { required: true, message: 'Please choose the dateTime' },
              ]}
            >
              <DatePicker.RangePicker
                style={{ width: '100%' }}
                getPopupContainer={(trigger) => trigger.parentElement}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='description'
              label='Description'
              rules={[
                {
                  required: true,
                  message: 'please enter url description',
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder='please enter url description'
              />
            </Form.Item>
          </Col>
        </Row>
       */}
      </Form>
    </Drawer>
  );
};
const mapStateToProps = ({ student: { list, selected } }) => ({
  list,
  selected,
});
export default connect(mapStateToProps, {
  getStudents,
  selectStudent,
  updateStudent,
  deleteStudent,
})(Student);
