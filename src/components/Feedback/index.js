import { Table, Space, Card, Button, Input, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { connect } from 'react-redux';
import { getFeedbacks, deleteFeedback } from '../../redux/actions/feedback';

const Feedback = ({ list, getFeedbacks, deleteFeedback }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'student',
      key: 'student',
      ellipsis: true,
      render: (student) => student.name,
    },
    {
      title: 'Email',
      dataIndex: 'student',
      key: 'student',
      ellipsis: true,
      render: (student) => student.email,
    },
    {
      title: 'Registration No.',
      dataIndex: 'student',
      key: 'student',
      ellipsis: true,
      render: (student) => student.regNo,
    },
    {
      title: 'Message',
      dataIndex: 'text',
      key: 'text',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Tooltip placement='right' title='Delete'>
            <Button
              onClick={() => deleteFeedback(record.id)}
              danger
              icon={<BsTrash className='text-danger' />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  const [filtered, setFiltered] = useState(undefined);

  const onSearch = (txt) => {
    if (txt) {
      setFiltered(
        list.filter((item) => {
          const regex = new RegExp(`${txt}`, 'gi');
          return (
            item.text.match(regex) ||
            item.student.email.match(regex) ||
            item.student.name.match(regex) ||
            item.student.regNo.match(regex)
          );
        })
      );
    } else {
      setFiltered(undefined);
    }
  };
  useEffect(() => {
    getFeedbacks();
    return () => {};
  }, []);
  return (
    <>
      <Card
        title='Feedbacks'
        hoverable
        extra={
          <Input
            type='search'
            placeholder='Search feedbacks'
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
    </>
  );
};

const mapStateToProps = ({ feedback: { list } }) => ({
  list,
});
export default connect(mapStateToProps, {
  getFeedbacks,
  deleteFeedback,
})(Feedback);
