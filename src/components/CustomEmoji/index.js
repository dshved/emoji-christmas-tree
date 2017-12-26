import React, { Component } from "react";
import Modal from "../Modal";
import { Picker, Emoji } from "emoji-mart";
import customEmoji from "../../data/customEmoji";
require("emoji-mart/css/emoji-mart.css");

class CustomEmoji extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: {},
      showModal: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      obj: nextProps.obj
    });
  }
  componentDidMount() {
    this.setState({
      obj: this.props.obj
    });
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) this.handleHide();
  });
  }

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleHide = () => {
    this.setState({ showModal: false });
  };
  handleClick = () => {
    this.setState({
      showModal: true,
    });
  };
  addEmoji = e => {
    this.props.updateEmojies(this.props.id, e);
    this.setState({
      obj: e,
      showModal: false
    });
  };
  render() {
    const modal = this.state.showModal
      ? <Modal>
          <div className="modal">
            <Picker
              style={{
                position: "absolute",
                top: `${this.state.posY}px`,
                left: `${this.state.posX}px`
              }}
              onClick={this.addEmoji}
              custom={customEmoji}
            />
            <button onClick={this.handleHide}>Hide modal</button>
          </div>
        </Modal>
      : null;
    const bg = this.state.obj.custom ? () => this.state.obj.imageUrl : null;
    if (this.state.obj.custom) {
      return (
        <span className="custom-emoji">
          {modal}
          <Emoji
            onClick={() => this.handleClick()}
            size={24}
            emoji={"smile"}
            backgroundImageFn={bg}
          />
        </span>
      );
    } else {
      return (
        <span className="">
          <Emoji
            {...this.props}
            onClick={() => this.handleClick()}
            size={24}
            emoji={this.state.obj.id ? this.state.obj.id : "smile"}
          />
        </span>
      );
    }
  }
}

export default CustomEmoji;
