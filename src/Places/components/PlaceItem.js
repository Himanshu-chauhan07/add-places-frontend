import React, { useState ,useContext} from "react";

import Map from "../../shared/components/UIElements/Maps";
import Modal from "../../shared/components/UIElements/Model";
import Button from "../../shared/components/UIElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card";

import "./PlaceItem.css";

const PlaceItem = (props) => {
  const auth= useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("Deleting...");
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <Map center={props.coordinates} zoom={16} />
      </Modal>
      <Modal
        show ={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place ? Please note that it can
          not be undone afterthat
        </p>
      </Modal>
      <li className="place-item">
        <Card>
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT </Button>}
            {auth.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
