import React, { useRef } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

function CreateRoom() {
  const roomName = useRef(null);

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
                buttonName="Create room"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom;
