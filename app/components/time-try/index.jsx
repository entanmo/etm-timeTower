import React from "react";
import "./style/index.less";
import { Icon } from "antd";
import { Link } from "react-router";
import Card from "../card";
import axios from "axios";
import intl from "react-intl-universal";
import { message } from "antd";
import try_title from "./image/try_title.png";

class Try extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          id: 0,
          title: intl.get("TRY_IT_GROUP") + "1",
          min: 0,
          max: 10,
          size: 1,
          type: 0
        }
      ],
      icon_show: false,
      param: {}
    };
  }
  handleChange(e, id) {
    const name = e.target.name;
    let newData = this.state.data.slice();

    newData[id][name] = e.target.value;
    this.setState({
      data: newData
    });
  }
  addCard() {
    const len = this.state.data.length;
    let id = len - 1;
    if (len < 3) {
      const arr = this.state.data.slice();
      arr.push({
        id: id + 1,
        title: `${intl.get("TRY_IT_GROUP")} ${len + 1}`,
        min: 0,
        max: 10,
        size: 1,
        type: 0
      });
      this.setState({
        data: arr
      });
      if (len === 2) {
        this.setState({
          icon_show: true
        });
      }
    }
  }
  getRandomNum() {
    const data = this.state.data.slice();
    let str = this.props.hashStr;
    const result = data.map(item => {
      if (
        item.min.toString().indexOf(".") !== -1 ||
        item.max.toString().indexOf(".") !== -1 ||
        item.size.toString().indexOf(".") !== -1
      ) {
        message.error(intl.get("TRY_Integer"));
        return false;
      } else if (
        parseInt(item.size) >
        parseInt(item.max) - parseInt(item.min) + 1
      ) {
        message.error(intl.get("TRY_Beyond"));
        return false;
      } else {
        return true;
      }
    });
    const condition = result.some(item => !item);
    if (!condition && str) {
      this.sendNum();
    }
  }
  sendNum() {
    let str = this.props.hashStr;
    let params = {
      data: this.computerData(),
      hash: str
    };
    axios
      .post("http://47.111.165.42:4567/lottery", params)
      .then(res => {
        if (res && res.data.success) {
          let result = res.data.data.lottery;
          let index = res.data.data.index;
          let formData = JSON.parse(JSON.stringify(this.state.data));
          let param = {
            paramData: params.data,
            hash: params.hash,
            index: index,
            data: formData,
            result: result
          };
          let str = result.map((item, index) => {
            return (
              <span key={index} className={`result` + index}>
                {item.join(" ")}
              </span>
            );
          });
          this.setState({
            str: str,
            param: param
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  computerData() {
    let sendData = this.state.data.slice();
    return sendData.map(item => {
      let arr = [];
      for (let i = 0; i <= item.max - item.min; i++) {
        if (i === 0) {
          arr[0] = parseInt(item.min);
        } else {
          arr[i] = arr[i - 1] + 1;
        }
      }
      return {
        arr: arr,
        type: parseInt(item.type),
        size: parseInt(item.size)
      };
    });
  }
  render() {
    const clsName = this.props.className + "-section";
    const icon_show = this.state.icon_show;
    const str = this.state.str;
    const param = JSON.stringify(this.state.param);
    const path = { pathname: "/details", query: { data: param } };
    return (
      <div className={clsName}>
        <div className="stars" />
        <img className="title" src={try_title} />
        <div className="cards">
          <div className="card-left" />
          {this.state.data.map(item => {
            return (
              <Card
                title={item.title}
                key={item.id}
                dataProp={item}
                updateStateProp={this.handleChange.bind(this)}
              />
            );
          })}
          <Icon
            type="plus-circle"
            className={icon_show ? "icon_show" : ""}
            onClick={this.addCard.bind(this)}
            style={{ fontSize: "20px", cursor: "pointer", color: "#70effc" }}
          />
        </div>
        {/*<p className=" glitch" data-text={intl.get('TRY_SUBMIT')}>{intl.get('TRY_SUBMIT')}</p>*/}
        <div onClick={this.getRandomNum.bind(this)} className="random-btn ">
          <p className="glitch" data-text={intl.get("TRY_SUBMIT")}>
            {intl.get("TRY_SUBMIT")}
          </p>
        </div>
        <div className="try-result">
          {intl.get("TRY_RESULT")} : {str}
        </div>
        <Link className={`detail ${str ? "show" : "hide"}`} to={path}>
          {intl.get("TRY_DETAIL")}
        </Link>
      </div>
    );
  }
}

Try.defaultProps = {
  className: "try"
};

export default Try;
