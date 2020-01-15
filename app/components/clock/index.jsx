import React from "react";
import ReactDOM from "react-dom";
import ClockBg from "../clock-bg";
import CountUp from "../timer";
import "./style/index.less";
import intl from "react-intl-universal";
import title1 from "./image/title1.png";
import io from "socket.io-client";
import { Radio } from "antd";
import axios from "axios";
let socket;
class Clock extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      renderSize: { width: "100%", height: "100%" },
      randomNum: [],
      randomNumGenerator: [],
      total: 0,
      show: true
    };
  }
  componentWillUnmount() {
    this._isMounted = false;
    const clsName = this.props.className + "-clock";
    const container = ReactDOM.findDOMNode(this.refs[clsName]);
  }
  startQRNG() {
    socket = io("http://47.110.42.170:4567");
    let arr = [];
    socket.on("newrandom", msg => {
      if (this.refs.countUp) {
        this.refs.countUp.reset();
        arr.push(msg.random);
        this.props.changeArr(msg.random);
        if (arr.length >= 8) {
          arr.shift();
        }
        this.setState({
          randomNum: arr,
          total: msg.index + 1
        });
        const domList = document.getElementById("randomNum");
        const oLi = domList.getElementsByTagName("li");
        const lastLi = oLi[oLi.length - 1];
        this.animateCSS(lastLi, "fadeInDown");
      }
    });
  }
  startRNG() {
    socket = io("https://api.entanmo.io");
    let arr1 = [];
    socket.on("blocks/change", msg => {
      this.getInfo(arr1, msg);
    });
  }
  componentDidMount() {
    this.startQRNG();
    this._isMounted = true;
    const clsName = this.props.className + "-clock";
    const container = ReactDOM.findDOMNode(this.refs[clsName]);
    let flushRenderSize = () => {
      if (this._isMounted) {
        this.setState({
          renderSize: {
            width: container.clientWidth,
            height: container.clientHeight
          }
        });
      }
    };
    window.addEventListener("resize", () => {
      flushRenderSize();
    });
    flushRenderSize();
  }
  getInfo(arr, msg) {
    axios
      .get("https://api.entanmo.io/api/blocks?orderBy=height:desc")
      .then(res => {
        if (res && res.data.success) {
          this.refs.countUp.reset();
          // arr.push(res.data.blocks[0])
          arr = res.data.blocks.slice(0, 8);
          arr.reverse();
          if (arr.length >= 8) {
            arr.shift();
          }
          this.setState({
            randomNumGenerator: arr,
            total: arr[arr.length - 1].height
          });
          const domList = document.getElementById("randomNum1");
          const oLi = domList.getElementsByTagName("li");
          const lastLi = oLi[oLi.length - 1];
          this.animateCSS(lastLi, "fadeInDown");
        }
      });
  }
  componentWillUnmount() {
    this.refs.countUp.clear();
    socket.close();
  }
  onChange = e => {
    this.refs.countUp.reset();
    if (e.target.value === "b") {
      socket.close();
      this.startRNG();
      this.setState({
        show: false,
        randomNum: [],
        randomNumGenerator: [],
        total: 0
      });
    } else {
      socket.close();
      this.startQRNG();
      this.setState({
        show: true,
        randomNum: [],
        randomNumGenerator: [],
        total: 0
      });
    }
  };
  changeLetter(letter) {
    return /[a-z]/g.test(letter);
  }
  animateCSS(node, animationName, callback) {
    node.classList.add("animated", animationName);

    function handleAnimationEnd() {
      node.classList.remove("animated", animationName);
      node.removeEventListener("animationend", handleAnimationEnd);

      if (typeof callback === "function") callback();
    }

    node.addEventListener("animationend", handleAnimationEnd);
  }
  render() {
    const clsName = this.props.className + "-clock";
    return (
      <div ref={clsName} className={clsName}>
        <div className={`${clsName}-bg`}></div>
        <div className="container">
          <ClockBg></ClockBg>
          <div className="clock-wrapper">
            <div className="wrapper-left">
              <div className="wrapper-title">
                <img style={{ width: "360px" }} src={title1} />
                <Radio.Group
                  className="select-btn"
                  onChange={this.onChange}
                  defaultValue="a"
                >
                  <Radio.Button value="a">QRNG</Radio.Button>
                  <Radio.Button value="b">RNG</Radio.Button>
                </Radio.Group>
              </div>
              <div className="timer">
                <CountUp ref="countUp"></CountUp>
              </div>

              <div className={this.state.show ? "show" : "hidden"}>
                <p className="title">{intl.get("TITLE")}</p>
                <ul className="randomNum randomNumQR" id="randomNum">
                  {this.state.randomNum.map((item, index) => {
                    return (
                      <li key={index}>
                        <span>{item.substring(0, item.length - 1)}</span>
                        {this.changeLetter(item.substring(item.length - 1)) ? (
                          <span>{item.substring(item.length - 1)}</span>
                        ) : (
                          <span style={{ color: "rgb(225, 95, 22)" }}>
                            {item.substring(item.length - 1)}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <div className="total">
                  {intl.get("TOTAL")}：{this.state.total} {intl.get("UNIT")}
                </div>
              </div>
              <div className={!this.state.show ? "show" : "hidden"}>
                <p className="title">{intl.get("TITLERNG")}</p>
                <ul className="randomNum " id="randomNum1">
                  {this.state.randomNumGenerator.map((item, index) => {
                    return (
                      <li key={index}>
                        <div className="height">{item.height}</div>
                        <div className="address">{item.generatorId}</div>
                        <div className="quantum">
                          <span>
                            {item.id.substring(30, item.id.length - 1)}
                          </span>
                          {this.changeLetter(
                            item.id.substring(item.id.length - 1)
                          ) ? (
                            <span>{item.id.substring(item.id.length - 1)}</span>
                          ) : (
                            <span style={{ color: "rgb(225, 95, 22)" }}>
                              {item.id.substring(item.id.length - 1)}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="total">
                  {intl.get("TOTAL")}：{this.state.total} {intl.get("UNIT")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Clock.defaultProps = {
  className: "home"
};

export default Clock;
