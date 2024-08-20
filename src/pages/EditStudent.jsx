import React, { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateStudent } from '../redux/Actions';

const EditStudent = ({ student, isOpen, onClose }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors, isValid }, setValue, trigger } = useForm({
    mode: 'onChange'
  });

  useEffect(() => {
    if (isOpen && student) {
      setValue('firstName', student.firstName);
      setValue('lastName', student.lastName);
      setValue('group', student.group);
      setValue('number', student.number);
    }
  }, [isOpen, student, setValue]);

  const onSubmit = async(data) => {
    dispatch(updateStudent(data));
    onClose();
  };
  

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div>
      <Modal show={isOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-3'>
              <label htmlFor='firstName' className='form-label'>
                First Name
              </label>
              <input
                type='text'
                className='form-control'
                id='firstName'
                {...register('firstName', { required: true })}
              />
              {errors.firstName && <span style={{ color: 'red' }}>First Name is required</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='lastName' className='form-label'>
                Last Name
              </label>
              <input
                type='text'
                className='form-control'
                id='lastName'
                {...register('lastName', { required: true })}
              />
              {errors.lastName && <span style={{ color: 'red' }}>Last Name is required</span>}
            </div>
            <div className='mb-3'>
              <select
                name='group'
                id='group'
                className='form-select w-auto'
                {...register('group', { required: true })}
              >
                <option value=''>Select Group</option>
                <option value='React N35'>React N35</option>
                <option value='React N40'>React N40</option>
                <option value='React N45'>React N45</option>
              </select>
              {errors.group && <span style={{ color: 'red' }}>Group is required</span>}
            </div>
            <div className='mb-3 form-check'>
              <label htmlFor='number' className='form-label'>
                Number
              </label>
              <input
                type='number'
                className='form-control'
                id='number'
                {...register('number', { required: true })}
              />
              {errors.number && <span style={{ color: 'red' }}>Number is required</span>}
            </div>
            <Button type='submit' variant='primary' disabled={!isValid}>
              Edit
            </Button>
            <Button variant='secondary' onClick={handleCloseModal}>
              Cancel
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditStudent;
