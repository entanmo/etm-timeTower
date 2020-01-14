import React from "react";

import { Table, Input, message, Collapse } from "antd";
import axios from "axios";
import intl from "react-intl-universal";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./style/index.less";
const Search = Input.Search;
const Panel = Collapse.Panel;

const customPanelStyle = {
  background: "#f7f7f7",
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: "hidden"
};
class Detail extends React.Component {
  constructor() {
    super();
    this.state = {
      hashes: [],
      dataSource: []
    };
  }
  componentDidMount() {
    this.getInfo();
  }
  componentWillMount() {
    window.scrollTo(0, 0);
  }
  getInfo() {
    let params = JSON.parse(this.props.location.query.data);
    const { hash } = params;
    let param = { hash: hash };
    axios
      .get("http://47.111.165.42:4567/random/getInfo", { params: param })
      .then(res => {
        if (res && res.data.success) {
          let hashes = res.data.data.information.hashes;
          this.setState({
            hashes: hashes
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  pageData(index) {
    const propData = JSON.parse(this.props.location.query.data);
    const { paramData } = propData;
    const params = { data: paramData, index: parseInt(index), limit: 10 };
    axios
      .post("http://47.111.165.42:4567/lottery/pagedata", params)
      .then(res => {
        if (res && res.data.success && res.data.data.lotterys.length > 0) {
          this.setState({
            dataSource: res.data.data.lotterys
          });
        } else {
          this.setState({
            dataSource: []
          });
          if (res.data.error) {
            message.error(res.data.error);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  searchInfo = val => {
    if (val.indexOf(".") !== -1 || val === "") {
      message.error(intl.get("TRY_Integer"));
    } else {
      this.pageData(val);
    }
  };
  render() {
    const columns = [
      {
        title: "index",
        dataIndex: "index",
        key: "index"
      },
      {
        title: intl.get("DETAILS_HEAD"),
        dataIndex: "lottery",
        key: "lottery",
        render: tags => (
          <span>
            {tags.map((tag, index) => {
              return (
                <span className={`result` + index} key={index}>
                  {tag.join(" ")}
                </span>
              );
            })}
          </span>
        )
      }
    ];
    const params = JSON.parse(this.props.location.query.data);
    const { hash, index, data = [], result } = params;
    const hashes = this.state.hashes;
    const dataSource = this.state.dataSource;
    return (
      <div>
        <Header history={this.props.history} />
        <div className="detailContainer">
          <h1>{intl.get("DETAILS_TITLE01")}</h1>
          <p>
            {intl.get("DETAILS_RESULT")}：
            {result.map((item, index) => {
              return (
                <span key={index} className={`result` + index}>
                  {item.join(" ")}
                </span>
              );
            })}
          </p>
          {data.map(item => {
            return (
              <p key={item.id}>
                {intl.get("DETAILS_GROUP")} {item.id + 1}{" "}
                {intl.get("DETAILS_MIN")}：{item.min}-{item.max}{" "}
                {intl.get("DETAILS_NUM")}：{item.size}{" "}
                {intl.get("DETAILS_TYPE")}：{item.type}
              </p>
            );
          })}
          <p>
            {intl.get("DETAILS_QRN")}：{hash}
          </p>
          <p>Index：{index}</p>
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <Icon type="caret-right" rotate={isActive ? 90 : 0} />
            )}
          >
            <Panel
              header={intl.get("DETAILS_SOURCE")}
              key="1"
              style={customPanelStyle}
            >
              {hashes.map(item => {
                return (
                  <p key={item.id}>
                    blockId：{item.id}&nbsp;&nbsp; blockHeight：{item.height}
                  </p>
                );
              })}
            </Panel>
          </Collapse>
          <h1>{intl.get("DETAILS_TITLE02")}</h1>
          <Search
            className="search"
            type="number"
            placeholder={intl.get("DETAILS_PLACEHODE")}
            defaultValue={index}
            onSearch={this.searchInfo}
            enterButton
          />
          <Table
            scroll={{ x: 500 }}
            rowClassName={record => (record.isChoosed ? "choose" : "")}
            rowKey="index"
            className="serchTable"
            dataSource={dataSource}
            columns={columns}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Detail;
