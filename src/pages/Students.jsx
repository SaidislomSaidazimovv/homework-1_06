// Students.js

import React, { useEffect, useState } from 'react';
import { Button, Input, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import { SearchOutlined } from '@ant-design/icons';
import { closeModal, fetchStudents, openModal, deleteStudent, openEditModal, closeEditModal } from '../redux/Actions';

const Students = () => {
  const dispatch = useDispatch();
  const { loading, students, error, editModal, addModal } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    dispatch(openEditModal());
    console.log(student)
  };

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this student?');
    if (confirm) {
      dispatch(deleteStudent(id));
    }
  };

  const columns = [
    {
      key: "1",
      title: 'No',
      dataIndex: 'id',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return (
          <>
            <Input autoFocus placeholder='Search'
              onPressEnter={() => {
                confirm()
              }}
              onBlur={() => {
                confirm()
              }}

              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({closeDropDown: false});
              }}
            ></Input>
            <Button type="primary" onClick={() => {
              confirm();
            }}

            >Search</Button>
            <Button  style={{
              background:'red',
              color: 'white'
            }} type="error" onClick={() => {
              clearFilters();
            }}

            >Reset</Button>
          </>

        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return (
          record.lastName.toLowerCase().includes(value.toLowerCase()) ||
          record.firstName.toLowerCase().includes(value.toLowerCase())
        
        )
         
      }
    },
    {
      key: "id",
      title: 'firstName',
      dataIndex: 'firstName',
    },
    {
      key: "id",
      title: 'lastName',
      dataIndex: 'lastName',
    },
    {
      key: "id",
      title: 'group',
      dataIndex: 'group',
      filters: [
        { text: 'All', value: '' },
        { text: 'React N35', value: 'React N35' },
        {text: 'React N40', value: 'React N40' },
        {text: 'React N45', value: 'React N45' },
      ],
      onFilter: (value, record) => {
        if (value === '') return true;
        return record.group === value;
      }
   
    },
    {
      key: "id",
      title: 'Number',
      dataIndex: 'number',
      sorter:(record1 , record2)=>{
        return record1.number - record2.number
      }
    },
    {
      key: "id",
      title: 'Action',
      render: (record) => {
        return (
          <div >
            <Button  type='primary' onClick={()=>handleEdit(record)}>Edit</Button>
            <Button  style={{
              background:'red',
              color: 'white'
            }} onClick={() => handleDelete(record.id)}>Delete</Button>
          </div>
        )
      }

    },
  ]

  return (
    <>
      {loading && <h1>Loading</h1>}
      {error && <h1>{error.message}</h1>}
      {students && (
        <div className='Student'>
          <div className='Student-head'>
            <button className='btn btn-outline-success w-auto' onClick={handleOpenModal}>Add</button>
          </div>

          <Table style={{
            width: '100%'
          }} className='Table' size='large' dataSource={students} columns={columns} pagination={{
            current: currentPage,
            pageSize: postsPerPage,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPostsPerPage(pageSize);
            }
          }} />
          <>
          <AddStudent isOpen={addModal} onClose={() => dispatch(closeModal())} selectedStudent={selectedStudent} />
          <EditStudent isOpen={editModal} onClose={() => dispatch(closeEditModal())} student={selectedStudent} />
          </>
        </div>
      )}
    </>
  );
};

export default Students;
