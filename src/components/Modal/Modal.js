import React from 'react'
import "./modal.scss"
const Modal = ({closeModal}) => {
  return (
    <>
    <div className='modal-wrapper'></div>
      <div className='modal-container'>
        <div className='modal'>
            <div className='title'>
                <h1>Create New Notes group</h1>
            </div>
            <div className='form'>
                <form >
                    <label>Group Name</label>
                    <input type='text' placeholder='Enter your group name...' required></input><br/>
                    <div className='color-box'>
                    <label>Choose colour</label>

                    <div className='colors'>
                <p id='purple'></p>
                    <p id='pink'></p>
                    <p id='green'></p>
                    <p id='orange'></p>
                    <p id='blue'></p>
                    <p id='skyblue'></p>
                    </div>
                    </div>
                   <div className='buttons'>

                    <button type='submit' onClick={closeModal}>Create</button>
                   </div>
                </form>
            </div>
        </div>
      </div>
    </>
  )
}

export default Modal
