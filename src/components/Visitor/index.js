import { Table, Space, Card, Button, Input, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { connect } from 'react-redux';
import { getVisitors, deleteVisitor } from '../../redux/actions/visitor';

const Visitor = ({ list, getVisitors, deleteVisitor }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Tooltip placement='right' title='Delete'>
            <Button
              onClick={() => deleteVisitor(record.id)}
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
          return item.name.match(regex) || item.email.match(regex);
        })
      );
    } else {
      setFiltered(undefined);
    }
  };
  useEffect(() => {
    getVisitors();
    return () => {};
  }, []);
  return (
    <>
      <Card
        title='Visitors'
        hoverable
        extra={
          <Input
            type='search'
            placeholder='Search visitor'
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

const mapStateToProps = ({ visitor: { list } }) => ({
  list,
});
export default connect(mapStateToProps, {
  getVisitors,
  deleteVisitor,
})(Visitor);
