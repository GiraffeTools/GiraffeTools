import PropTypes from 'prop-types';
import React from 'react';
import ModelElement from './modelElement';

class ModelZoo extends React.Component {
  render() {
    return (
      <div className="zoo-modal">
        <div className="centered-zoo-modal">
          <div className="zoo-modal-model">
            <h3 className="zoo-modal-text">Recognition</h3>
              <ModelElement importNet={this.props.importNet} framework="caffe" id="alexnet">AlexNet</ModelElement>
              <br/>
              <ModelElement importNet={this.props.importNet} framework="caffe" id="All_CNN">All CNN</ModelElement>
              <br/>
              <ModelElement importNet={this.props.importNet} framework="caffe" id="vgg16">VGG 16</ModelElement>
              <br/>
              <ModelElement importNet={this.props.importNet} framework="caffe" id="densenet">DenseNet</ModelElement>
              <br/>
              <ModelElement importNet={this.props.importNet} framework="caffe" id="GoogleNet">GoogLeNet</ModelElement>
              <br/>
              <ModelElement importNet={this.props.importNet} framework="caffe" id="resnet101">ResNet 101</ModelElement>
              <br/>
              <ModelElement importNet={this.props.importNet} framework="keras" id="v3">Inception V3</ModelElement>
              <br/>
              <ModelElement importNet={this.props.importNet} framework="caffe" id="Squeezenet">Squeezenet</ModelElement>
          </div>
          <div className="zoo-modal-model">
            <h3 className="zoo-modal-text">Detection</h3>
              <ModelElement importNet={this.props.importNet} framework="caffe" id="fcn">FCN32 Pascal</ModelElement>
              <br/>
              <ModelElement importNet={this.props.importNet} framework="caffe" id="yolo_net">YOLONet</ModelElement>
          </div>
          <div className="zoo-modal-model">
            <h3 className="zoo-modal-text">Retrieval</h3>
              <ModelElement importNet={this.props.importNet} framework="caffe" id="siamese_mnist">MNIST Siamese</ModelElement>
          </div>
          <div className="zoo-modal-model">
            <h3 className="zoo-modal-text">Seq2Seq</h3>
              <ModelElement importNet={this.props.importNet} framework="keras" id="textGeneration">Text Generation</ModelElement>
              <br/>
              <ModelElement importNet={this.props.importNet} framework="keras" id="seq2seq_lang">Seq2Seq Translation</ModelElement>
          </div>
          <div className="zoo-modal-model">
            <h3 className="zoo-modal-text">Caption</h3>
              <ModelElement importNet={this.props.importNet} framework="caffe" id="CoCo_Caption">CoCo Caption</ModelElement>
            <h3 className="zoo-modal-text">VQA</h3>
              <ModelElement importNet={this.props.importNet} framework="keras" id="VQA">VQA</ModelElement>
          </div>
        </div>
      </div>
    );
  }
}

ModelZoo.propTypes = {
  importNet: PropTypes.func
};

export default ModelZoo;
