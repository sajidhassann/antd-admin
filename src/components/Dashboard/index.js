import {
  Avatar,
  Button,
  Col,
  Drawer,
  Dropdown,
  Input,
  Layout,
  Menu,
  Row,
  Space,
  Tooltip,
  Typography,
  Form,
} from 'antd';
import './style.css';
import {
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiOutlineUser,
  AiOutlineUsergroupDelete,
  AiOutlineCalendar,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import { BsFileEarmarkArrowUp } from 'react-icons/bs';
import { BiCommentX } from 'react-icons/bi';
import { VscFeedback } from 'react-icons/vsc';
import useToggle from '../../Hooks/useToggle';
import TextTransition, { presets } from 'react-text-transition';
import { Route, Redirect, Link } from 'react-router-dom';
import Student from '../Student';
import Visitor from '../Visitor';
import Event from '../Event';
import Feedback from '../Feedback';
import Problem from '../Problem';
import Society from '../Society';
import Marker from '../AR-Marker';
import { logout, update } from '../../redux/actions/user';
import { connect } from 'react-redux';
import { useEffect, useRef } from 'react';

const { Text } = Typography;
const { Header, Sider, Content } = Layout;
const Dashboard = ({ location, logout, update, name, email, id }) => {
  const [collapsed, toggle] = useToggle(false);
  const [drawer, toggleDrawer] = useToggle(false);

  const dropdown = useRef({ logout: logout, profile: toggleDrawer }).current;
  const selectedKeys = useRef([]).current;

  useEffect(() => {
    selectedKeys.push(location.pathname);
    return () => {};
  }, [location.pathname, selectedKeys]);
  return (
    <Layout id='components-layout-demo-custom-trigger'>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
        }}
        breakpoint='lg'
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <TextTransition
          className='logo'
          style={{ marginLeft: collapsed ? 35 : 60 }}
          text={collapsed ? 'A' : 'Admin'}
          springConfig={presets.stiff}
        />
        {/* <div className='logo'>
          <span>{collapsed ? 'A' : 'Admin'}</span>
        </div> */}
        <Menu theme='dark' mode='inline' defaultSelectedKeys={selectedKeys}>
          <Menu.Item key='/student' icon={<AiOutlineUser />}>
            <Link className='text-decoration-none' to='/student'>
              Student
            </Link>
          </Menu.Item>
          <Menu.Item key='/visitor' icon={<AiOutlineUserAdd />}>
            <Link className='text-decoration-none' to='/visitor'>
              Visitor
            </Link>
          </Menu.Item>
          <Menu.Item key='/ar-marker' icon={<BsFileEarmarkArrowUp />}>
            <Link className='text-decoration-none' to='/ar-marker'>
              AR Marker
            </Link>
          </Menu.Item>
          <Menu.Item key='/society' icon={<AiOutlineUsergroupDelete />}>
            <Link className='text-decoration-none' to='/society'>
              Society
            </Link>
          </Menu.Item>
          <Menu.Item key='/event' icon={<AiOutlineCalendar />}>
            <Link className='text-decoration-none' to='/event'>
              Event
            </Link>
          </Menu.Item>
          <Menu.Item key='/feedback' icon={<VscFeedback />}>
            <Link className='text-decoration-none' to='/feedback'>
              Feedback
            </Link>
          </Menu.Item>
          <Menu.Item key='/problem' icon={<BiCommentX />}>
            <Link className='text-decoration-none' to='/problem'>
              Problem
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header
          className='site-layout-background d-flex align-items-center justify-content-between'
          style={{ padding: 0, position: 'sticky', top: 0, zIndex: 99 }}
        >
          {collapsed ? (
            <AiOutlineMenuUnfold
              size={28}
              style={{ marginLeft: 20, cursor: 'pointer' }}
              onClick={toggle}
            />
          ) : (
            <AiOutlineMenuFold
              size={28}
              style={{ marginLeft: 20, cursor: 'pointer' }}
              onClick={toggle}
            />
          )}
          <div className='d-flex justify-content-between align-items-center'>
            <Tooltip placement='bottomRight' title={email}>
              <Text className='me-2' strong>
                {name}
              </Text>
            </Tooltip>
            <Dropdown
              overlay={
                <Menu
                  onClick={({ key }) => {
                    dropdown[key]();
                  }}
                >
                  <Menu.Item key='profile' className='text-center width-100'>
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    key='logout'
                    className='text-center text-danger width-100'
                  >
                    Logout
                  </Menu.Item>
                </Menu>
              }
              placement='bottomRight'
              arrow
            >
              <Avatar
                size='large'
                className='dark-color pointer me-3'
                icon={<AiOutlineUser className='align-self-center mb-2' />}
              />
            </Dropdown>
          </div>
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow: 'initial',
          }}
        >
          <div
            className='site-layout-background'
            style={{ padding: 24, textAlign: 'center' }}
          >
            <Route exact component={Student} path='/student' />
            <Route exact component={Visitor} path='/visitor' />
            <Route exact component={Marker} path='/ar-marker' />
            <Route exact component={Event} path='/event' />
            <Route exact component={Feedback} path='/feedback' />
            <Route exact component={Problem} path='/problem' />
            <Route exact component={Society} path='/society' />
            <Route path='/' exact>
              <Redirect to='/student' />
            </Route>
            {/* <Redirect exact strict from='/' to='/student' /> */}
          </div>
        </Content>
      </Layout>
      <UserForm
        visible={drawer}
        toggle={toggleDrawer}
        selected={{ name, id }}
        update={update}
      />
    </Layout>
  );
};

const UserForm = ({ visible, toggle, selected, update }) => {
  const [loading, toggleLoading] = useToggle(false);
  const onFinish = async (values) => {
    console.log('Success:', values);
    toggleLoading();
    await update({ ...selected, ...values });
    toggleLoading();
    toggle();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Drawer
      title='Edit Profile'
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
            form='user-form'
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
        name='user-form'
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
            <Form.Item name='password' label='New Password'>
              <Input.Password
                style={{ width: '100%' }}
                placeholder='Please enter new password'
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default connect(
  ({
    user: {
      user: { name, email, id },
    },
  }) => ({ name, email, id }),
  { logout, update }
)(Dashboard);
