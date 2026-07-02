'use client';
import React, {useState} from 'react';
import {Form, Modal} from 'react-bootstrap';

const RequestaDemo = (props) => {
  return (
    <Modal
      backdrop='static'
      handlerequestademoShow={props.handlerequestademoShow}
      show={props.requestademoShow}
      onHide={props.handlerequestademoClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className='mb-0'>Request a Demo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='requestdemo.name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Name' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='requestdemo.email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder='Email' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='requestdemo.phone'>
            <Form.Label>Phone</Form.Label>
            <Form.Control type='tel' placeholder='Phone' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='exampleForm.message'>
            <Form.Label>Message</Form.Label>
            <Form.Control as='textarea' rows={3} />
          </Form.Group>
          <button type='submit' className='btn btn-outline-primary'>
            Save Changes
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RequestaDemo;
