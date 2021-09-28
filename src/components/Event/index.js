import {
  Table,
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
  getEvents,
  selectEvent,
  updateEvent,
  deleteEvent,
  addEvent,
} from '../../redux/actions/event';
import { getSocieties } from '../../redux/actions/society';
const { Option } = Select;

const Event = ({
  list,
  societies,
  getEvents,
  getSocieties,
  selectEvent,
  updateEvent,
  deleteEvent,
  addEvent,
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Venue',
      dataIndex: 'venue',
      key: 'venue',
      ellipsis: true,
    },
    {
      title: 'Event Date',
      dataIndex: 'eventDate',
      key: 'eventDate',
      ellipsis: true,
    },
    {
      title: 'Event Time',
      dataIndex: 'eventTime',
      key: 'eventTime',
      ellipsis: true,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      ellipsis: true,
    },
    {
      title: 'Society',
      dataIndex: 'society',
      key: 'society',
      ellipsis: true,
      render: (society) => society.name,
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
                selectEvent(record);
                toggle();
              }}
              icon={<BsPencil className='text-primary' />}
            />
          </Tooltip>
          <Tooltip placement='right' title='Delete'>
            <Button
              onClick={() => deleteEvent(record.id)}
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
            item?.name?.match(regex) ||
            item?.eventDate?.match(regex) ||
            item?.eventTime?.match(regex) ||
            item?.duration?.match(regex) ||
            item?.venue?.match(regex) ||
            item?.description?.match(regex) ||
            item?.society?.name?.match(regex)
          );
        })
      );
    } else {
      setFiltered(undefined);
    }
  };
  useEffect(() => {
    getEvents();
    getSocieties();
    return () => {};
  }, []);
  return (
    <>
      <Card
        title='Events'
        hoverable
        extra={
          <>
            <Input
              type='search'
              placeholder='Search event'
              style={{ width: 200 }}
              allowClear
              onChange={(e) => {
                onSearch(e.currentTarget.value);
              }}
            />
            <Button onClick={toggle} type='primary' className='ms-2'>
              Add Event
            </Button>
          </>
        }
      >
        <Table columns={columns} dataSource={filtered || list} />
      </Card>
      <EventForm
        visible={visible}
        toggle={() => {
          toggle();
          selectEvent(undefined);
        }}
        selected={selected}
        updateEvent={updateEvent}
        addEvent={addEvent}
        societies={societies}
      />
    </>
  );
};

const EventForm = ({
  visible,
  toggle,
  selected,
  updateEvent,
  addEvent,
  societies,
}) => {
  const [loading, toggleLoading] = useToggle(false);
  const onFinish = async (values) => {
    console.log(
      'Success:',
      values,
      values.dateTime.format('DD-MM-YYYY hh:mmA')
    );
    const { dateTime, ...rest } = values;
    const arr = dateTime.format('DD-MM-YYYY hh:mmA').split(' ');
    toggleLoading();
    selected
      ? await updateEvent({
          ...selected,
          ...rest,
          eventDate: arr[0],
          eventTime: arr[1],
        })
      : await addEvent({
          ...rest,
          eventDate: arr[0],
          eventTime: arr[1],
          society: societies.find(({ id }) => id === rest.society_id), // temp
        });
    toggleLoading();
    toggle();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  let { society, ...rest } = selected || {};
  return (
    <Drawer
      title={selected ? 'Edit Event' : 'Add Event'}
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
            form='event-form'
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
        name='event-form'
        layout='vertical'
        hideRequiredMark
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ ...rest, society_id: society?.id }}
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
              name='venue'
              label='Venue'
              rules={[{ required: true, message: 'Please enter venue' }]}
            >
              <Input placeholder='Please enter venue' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='dateTime'
              label='DateTime'
              rules={[
                { required: true, message: 'Please choose the DateTime' },
              ]}
            >
              <DatePicker
                className='w-100'
                format='DD-MM-YYYY hh:mm A'
                showTime={{ showSecond: false }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='duration'
              label='Duration'
              rules={[{ required: true, message: 'Please enter duration' }]}
            >
              <Input placeholder='Please enter duration' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='society_id'
              label='Society'
              rules={[{ required: true, message: 'Please select a society' }]}
            >
              <Select
                allowClear
                showSearch
                placeholder='Select a scociety'
                optionFilterProp='children'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {societies?.map(({ id, name }) => (
                  <Option key={id} value={id}>
                    {name}
                  </Option>
                ))}
              </Select>
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
                  message: 'please enter description',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder='please enter description' />
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
const mapStateToProps = ({
  event: { list, selected },
  society: { list: societies },
}) => ({
  list,
  selected,
  societies,
});
export default connect(mapStateToProps, {
  getEvents,
  selectEvent,
  updateEvent,
  deleteEvent,
  addEvent,
  getSocieties,
})(Event);
