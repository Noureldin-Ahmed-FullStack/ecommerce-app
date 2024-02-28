import React from 'react'
import Modal from 'react-modal';
export default function MyModal({ isOpen, closeModal ,brand}) {
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
      const BrandData = brand
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <div className="d-flex align-items-center">
    <h2 className='text-success'>{BrandData.name}</h2>
    <img src={BrandData.image} alt="" />
    </div>
    <div className="d-flex justify-content-center">
    <button className='btn btn-danger' onClick={closeModal}>Close Modal</button>

    </div>
    
  </Modal>
  )
}
