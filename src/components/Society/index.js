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
  getSocieties,
  selectSociety,
  updateSociety,
  deleteSociety,
  addSociety,
} from '../../redux/actions/society';
// const { Option } = Select;

const Society = ({
  list,
  getSocieties,
  selectSociety,
  updateSociety,
  deleteSociety,
  addSociety,
  selected,
}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      ellipsis: true,
    },
    {
      title: 'Detail',
      dataIndex: 'details',
      key: 'details',
      ellipsis: true,
    },
    {
      title: 'Creation Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => (date ? new Date(date).toString() : 'N/A'),
      ellipsis: true,
    },
    {
      title: 'Contact',
      render: (item) => (
        <>
          {item.email !== undefined && (
            <Tooltip title='Email'>
              <Tag className='mb-2' color='blue' key={item.email}>
                {item.email}
              </Tag>
            </Tooltip>
          )}
          {item.number !== undefined && (
            <Tooltip title='Number' placement='left'>
              <Tag className='mb-2' color='cyan' key={item.number}>
                {item.number}
              </Tag>
            </Tooltip>
          )}
          {item.facebook !== undefined && (
            <Tooltip title='Facebook' placement='right'>
              <Tag className='mb-2' color='geekblue' key={item.facebook}>
                {item.facebook}
              </Tag>
            </Tooltip>
          )}
          {item.twitter !== undefined && (
            <Tooltip title='Twitter' placement='left'>
              <Tag color='processing' key={item.twitter}>
                {item.twitter}
              </Tag>
            </Tooltip>
          )}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Tooltip placement='left' title='Edit'>
            <Button
              onClick={() => {
                console.log({ record });
                selectSociety(record);
                toggle();
              }}
              icon={<BsPencil className='text-primary' />}
            />
          </Tooltip>
          <Tooltip placement='right' title='Delete'>
            <Button
              onClick={() => deleteSociety(record.id)}
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
            item.details.match(regex) ||
            item.facebook.match(regex) ||
            item.twitter.match(regex) ||
            item.number.match(regex) ||
            item.department.match(regex)
          );
        })
      );
    } else {
      setFiltered(undefined);
    }
  };
  useEffect(() => {
    getSocieties();
    return () => {};
  }, []);
  return (
    <>
      <Card
        title='Societies'
        hoverable
        extra={
          <>
            <Input
              type='search'
              placeholder='Search society'
              style={{ width: 200 }}
              allowClear
              onChange={(e) => {
                onSearch(e.currentTarget.value);
              }}
            />
            <Button onClick={toggle} type='primary' className='ms-2'>
              Add Society
            </Button>
          </>
        }
      >
        <Table columns={columns} dataSource={filtered || list} />
      </Card>
      <SocietyForm
        visible={visible}
        toggle={() => {
          toggle();
          selectSociety(undefined);
        }}
        selected={selected}
        updateSociety={updateSociety}
        addSociety={addSociety}
      />
    </>
  );
};

const SocietyForm = ({
  visible,
  toggle,
  selected,
  updateSociety,
  addSociety,
}) => {
  const [loading, toggleLoading] = useToggle(false);
  const onFinish = async (values) => {
    console.log('Success:', values);
    toggleLoading();
    selected
      ? await updateSociety({ ...selected, ...values })
      : await addSociety(values);
    toggleLoading();
    toggle();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Drawer
      title={selected ? 'Edit Society' : 'Add Society'}
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
            form='society-form'
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
        name='society-form'
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
            >
              <Input placeholder='Please enter name' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='department'
              label='Department'
              rules={[{ required: true, message: 'Please enter department' }]}
            >
              <Input
                // style={{ width: '100%' }}
                // addonBefore='http://'
                // addonAfter='.com'
                placeholder='Please enter department'
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='number'
              label='Number'
              rules={[{ required: true, message: 'Please enter number' }]}
            >
              <Input placeholder='Please enter number' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='email'
              label='Email'
              rules={[{ required: true, message: 'Please enter email' }]}
            >
              <Input placeholder='Please enter email' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='facebook'
              label='Facebook'
              rules={[{ required: true, message: 'Please enter facebook' }]}
            >
              <Input placeholder='Please enter facebook' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='twitter'
              label='Twitter'
              rules={[{ required: true, message: 'Please enter twitter' }]}
            >
              <Input placeholder='Please enter twitter' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='details'
              label='Detail'
              rules={[
                {
                  required: true,
                  message: 'please enter detail',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder='please enter detail' />
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
       */}
      </Form>
    </Drawer>
  );
};
const mapStateToProps = ({ society: { list, selected } }) => ({
  list,
  selected,
});
export default connect(mapStateToProps, {
  getSocieties,
  selectSociety,
  updateSociety,
  deleteSociety,
  addSociety,
})(Society);
