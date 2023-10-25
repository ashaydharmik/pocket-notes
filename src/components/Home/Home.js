import React, { useState } from 'react'
import "./home.scss"
import bg from "../../assets/bg.png"
import lock from "../../assets/lock.png"
import Modal from '../Modal/Modal'
const Home = () => {
    const[showModal, setShowModal] = useState(false)

        const closeModal =()=>setShowModal(false);


  return (
    <>
    <div className='container'>
        <div className='menu'>
            <div className='heading'>
                <h1>Pocket Notes</h1>
            </div>
            <button className='add' onClick={()=> setShowModal(true)}>                
                    <p id='symbol'>+</p>
                    <p id='para'>Create Notes group</p>     
            </button>
           {showModal && <Modal closeModal={closeModal}/>}
            <div className='notes'>
                <div className='notes-details'>
                    <div className='icon'>
                        <p>CU</p>
                        </div>
                    <div className='name'>
                        <p>Cuvette notes</p>
                        </div>
                </div>
            </div>
        </div>
        <div className='content'>
            <div className='center-content'>
                <img src={bg} alt=''></img>
                <h2>Pocket Notes</h2>
                <p>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
            </div>
            <div className='bottom-content'>
                <p><img src={lock} alt=''></img> end-to-end encrypted</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home
