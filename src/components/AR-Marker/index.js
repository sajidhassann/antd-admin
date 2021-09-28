import {
  Table,
  Space,
  Card,
  Button,
  Form,
  Drawer,
  Row,
  Col,
  Tooltip,
  Upload,
  Image,
  message,
} from 'antd';
import { useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import { AiOutlineUpload } from 'react-icons/ai';
import { connect } from 'react-redux';
import useToggle from '../../Hooks/useToggle';
import {
  getMarkers,
  selectMarker,
  deleteMarker,
  addMarker,
} from '../../redux/actions/marker';
import Dragger from 'antd/lib/upload/Dragger';

const Marker = ({
  list,
  getMarkers,
  selectMarker,
  deleteMarker,
  addMarker,
  selected,
}) => {
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <Image width={100} height={100} src={'/images/' + image} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Tooltip placement='right' title='Delete'>
            <Button
              onClick={() => deleteMarker(record.id)}
              danger
              icon={<BsTrash className='text-danger' />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const [visible, toggle] = useToggle(false);

  useEffect(() => {
    getMarkers();
    return () => {};
  }, []);
  return (
    <>
      <Card
        title='AR Markers'
        hoverable
        extra={
          <Button onClick={toggle} type='primary' className='ms-2'>
            Add AR Marker
          </Button>
        }
      >
        <Table columns={columns} dataSource={list} />
      </Card>
      <MarkerForm
        visible={visible}
        toggle={() => {
          toggle();
          selectMarker(undefined);
        }}
        selected={selected}
        addMarker={addMarker}
      />
    </>
  );
};

const MarkerForm = ({ visible, toggle, addMarker }) => {
  const [loading, toggleLoading] = useToggle(false);
  const onFinish = async (values) => {
    console.log('Success:', values);

    const isJpgOrPng =
      values.picture.file.type === 'image/jpeg' ||
      values.picture.file.type === 'image/png' ||
      values.picture.file.type === 'image/jpg';
    if (isJpgOrPng) {
      const formData = new FormData();
      formData.append('picture', values.picture.file);
      toggleLoading();
      await addMarker(formData);
      toggleLoading();
      toggle();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Drawer
      title={'Add AR Marker'}
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
            form='marker-form'
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
        name='marker-form'
        layout='vertical'
        hideRequiredMark
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='picture'
              label='AR-Marker'
              rules={[{ required: true, message: 'Please select AR-Marker' }]}
            >
              <Dragger
                maxCount={1}
                accept='image/*'
                multiple={false}
                beforeUpload={(file) => {
                  const isJpgOrPng =
                    file.type === 'image/jpeg' ||
                    file.type === 'image/png' ||
                    file.type === 'image/jpg';
                  if (!isJpgOrPng) {
                    message.error('You can only upload JPG/PNG file!');
                  }
                  return !isJpgOrPng;
                }}
              >
                {/* <Button
                  icon={<AiOutlineUpload size={20} className='mb-1 me-2' />}
                >
                  Select File
                </Button> */}
                <p className='ant-upload-drag-icon'>
                  <AiOutlineUpload size={40} />
                </p>
                <p className='ant-upload-text'>
                  Click or drag marker to this area to upload
                </p>
                <p className='ant-upload-hint'>
                  Support for a single upload. Strictly prohibit from uploading
                  other than marker data or other bad files
                </p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
const mapStateToProps = ({ marker: { list, selected } }) => ({
  list,
  selected,
});
export default connect(mapStateToProps, {
  getMarkers,
  selectMarker,
  deleteMarker,
  addMarker,
})(Marker);
