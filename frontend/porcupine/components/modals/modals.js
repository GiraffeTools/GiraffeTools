import React from 'react';
import Radium from 'radium';

import GithubModal from '../../containers/githubModal';
import ToolboxModal from '../../containers/toolboxModal';
import styles from '../../styles/modals';

const Modal = (props) => {
  const {zIndex, item} = props;

  const onClose = () => {
    if (item.onClose) item.onClose();
    props.onClose && props.onClose(item.id);
  };
  const onConfirm = () => {
    if (item.onConfirm) item.onConfirm();
    props.onConfirm && props.onConfirm(item.id);
  };

  const {type} = item;
  switch (type) {
    case 'confirmation':
      const {text} = item;
      return (
        <div className="modal-dialog" style={{zIndex: (zIndex + 1) * 10}}>
          <div className="modal-content">
            <h5 className="modal-title" id="exampleModalLabel">
              Confirmation modal
            </h5>
            <div className="modal-body">{text}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onConfirm}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      );
    case 'push_to_github':
      return (
        <div className="modal-dialog" style={{zIndex: (zIndex + 1) * 10}}>
          <GithubModal
            title={item.title}
            onClose={() => onClose(item.id)}
            project={item.project}
            githubAction={item.onConfirm}
          />
        </div>
      );
    case 'toggle_toolboxes':
      return (
        <div className="modal-dialog" style={{zIndex: (zIndex + 1) * 10}}>
          <ToolboxModal onClose={() => onClose(item.id)} />
        </div>
      );
    default:
      return null;
  }
};

const Modals = ({modals, closeModal} ) => {
  const show = modals.length != 0;
  return (
    <div
      className={'modal fade' + (show ? ' show' : '')}
      style={[styles.modal, show && styles.modal.show]}
    >
      {modals.map((item, i) => (
        <Modal
          item={item}
          key={i}
          zIndex={i}
          onClose={(item) => closeModal(item)}
        />
      ))}
    </div>
  );
};

export default Radium(Modals);
