import React, { Component } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import template from "../../data/template";
import CustomEmoji from "../CustomEmoji";
import styled from "styled-components";

const Container = styled.div`
  width: 730px;
  margin: 0 auto;
`;
const Title = styled.div`
  font-size: 18px;
  text-align: center;
  margin: 10px 0;
  color: #1DB379;
  text-transform: uppercase;
`;
const TextArea = styled.textarea`
  width: 360px;
  height: calc(100% - 60px);
  font-size: 16px;
  border: 1px solid #000;
  resize: none;
  margin-bottom: 13px;
`;
const Row = styled.div`
display: flex;
justify-content: space-between;
`;
const Col = styled.div`
  font-size: 0;
  width: 360px;
  text-align: center;
`;
const Button = styled.button`
background: #1DB379;
color: #FBFBFA;
min-width: 200px;
cursor: pointer;
border-radius: 5px;
font-size: 18px;
letter-spacing: -0.49px;
border: none;
padding: 10px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      emojies: template,
      buttonText: 'Скопировать'
    };
  }

  componentDidMount() {
    this.handleShowText();
  }
  updateEmojies = (id, data) => {
    const emojies = this.state.emojies;
    emojies[id] = data;
    this.setState({
      emojies
    });
    this.handleShowText();
  };
  addEmoji = e => {
    this.setState({
      emojies: [...this.state.emojies, e],
      emoji: e,
      showModal: false,
      buttonText: 'Скопировать'
    });
  };

  handleShowText = () => {
    const { emojies } = this.state;
    let str = "";
    emojies.map((item, index) => {
      const kek = (index + 1) % 15 === 0 ? "\n" : "";
      str += `:${item.id}:${kek}`;
    });
    this.setState({
      text: str,
      buttonText: 'Скопировать'
    });
  };
  copyToClipboard = () => {
    this.setState({
      buttonText: 'Скопировано'
    })
  };
  render() {
    return (
      <Container>
        <Title>Наряди елочку и поделись с друзьями в слаке</Title>
        <Row>
          <Col style={{ border: "1px solid #000" }}>
            {this.state.emojies.map((emoji, key) => (
              <CustomEmoji
                updateEmojies={this.updateEmojies}
                key={key}
                id={key}
                obj={emoji}
              />
            ))}
          </Col>
          <Col>
            <TextArea value={this.state.text} />
            <CopyToClipboard
              text={this.state.text}
              onCopy={this.copyToClipboard}
            >
              <Button>{this.state.buttonText}</Button>
            </CopyToClipboard>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
