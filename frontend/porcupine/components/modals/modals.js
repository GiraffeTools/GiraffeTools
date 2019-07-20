import React from 'react';
import Radium from 'radium';

import GithubModal from '../../containers/githubModal';
import ToolboxModal from '../../containers/toolboxModal';
import styles from '../../styles/modals';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onClose() {
    const {item, onClose} = this.props;
    if (item.onClose) {
      item.onClose();
    }
    onClose(item.id);
  }
  onConfirm() {
    const {item, onClose} = this.props;
    if (item.onConfirm) {
      item.onConfirm();
    }
    onClose(item.id);
  }

  render() {
    const {zIndex, item} = this.props;
    const {type} = item;
    switch (type) {
      case 'confirmation':
        const {text} = this.props.item;
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
                  onClick={() => this.onConfirm()}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => this.onClose()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
        break;
      case 'push_to_github':
        const {onClose} = this;
        return (
          <div className="modal-dialog" style={{zIndex: (zIndex + 1) * 10}}>
            <GithubModal
              title={item.title}
              onClose={() => this.onClose(item.id)}
              project={item.project}
              githubAction={item.onConfirm}
            />
          </div>
        );
      case 'toggle_toolboxes':
        return (
          <div className="modal-dialog" style={{zIndex: (zIndex + 1) * 10}}>
            <ToolboxModal onClose={() => this.onClose(item.id)} />
          </div>
        );
      default:
        return null;
    }
  }
}

class Modals extends React.Component {
  render() {
    const {modals, closeModal} = this.props;
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
  }
}

export default Radium(Modals);
