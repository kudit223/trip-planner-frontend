import React, { useRef, useState } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import {socketContext} from '../../App';
import { useContext } from "react";

function CreateRoom() {
  const roomName = useRef(null);
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();
  const socket = useContext(socketContext)
  console.log(socket)

  const handleCreateRoomBtn = (e)=>{

    e.preventDefault();
    setIsLoading(true);

    fetch('http://localhost:7000/room/create',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials:'include',
      body:JSON.stringify({
        name:roomName.current.value
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.success){
        toast.success(data.message);
        const modal = document.querySelector('#createRoomModal');
        const modalInstance = Modal.getInstance(modal);
        modalInstance?.hide();

        //socket emit user created a room
        socket.emit('room_created',data.data)

        //navigate to chat room
        navigate('/chat-room')
      }else{
        toast.error(data.message)
      }
    }).catch(error=>{
      console.log(error);
    }).finally(()=>{
      setIsLoading(false)
    })

  }

  return (
    <div
      className="modal fade"
      id="createRoomModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" >
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="mb-0">Create a room</h5>
            <p className="">Start planning a trip with friends.</p>
            <form action="">
              <InputField
                type="text"
                label="Room name"
                id="roomName"
                placeholder="Rishikesh trip"
                ref={roomName}
              />
              <Button
                id="createRoomBtn"
                buttonColor="primary"
                buttonName={isLoading?<ClipLoader size={19}/>:"Create room"}
                handleClick ={handleCreateRoomBtn}
                disabled={isLoading}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom;
