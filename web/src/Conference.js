// Copyright 2021 The casbin Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from "react";
import {Link, withRouter} from "react-router-dom";
import {Alert, Button, Col, Empty, Menu, Popover, Row, Space, Steps} from "antd";
import * as Setting from "./Setting";
import i18next from "i18next";

const {SubMenu} = Menu;
const {Step} = Steps;

class Conference extends React.Component {
  static defaultProps = {
    path: "/",
    enableMenuPath: false,
  };

  constructor(props) {
    super(props);

    const selectedKey = this.getSelectedKey(props);

    this.state = {
      classes: props,
      selectedKey: selectedKey || props.conference.defaultItem,
    };
  }

  componentDidMount() {
    this.updateSelectedKey();
  }

  componentDidUpdate() {
    this.updateSelectedKey();
  }

  shouldComponentUpdate(nextProp, nextState) {
    if (nextProp.language !== this.props.language) {
      return true;
    }
    if (nextState.selectedKey !== this.state.selectedKey || nextProp.conference !== this.props.conference) {

      const selectedTreeItem = this.getSelectedTreeItem(nextState.selectedKey, nextProp.conference.treeItems);

      if (typeof this.props.onMatchTreeItem === "function") {
        this.props.onMatchTreeItem(!!selectedTreeItem);
      }

      return true;
    }
    return false;
  }

  getSelectedKey(props) {
    if (!props.enableMenuPath) {
      return null;
    }

    const match = new RegExp(`${props.path}([^/]+)$`).exec(props.history.location.pathname);

    if (match === null) {
      return null;
    }

    return match[1];
  }

  updateSelectedKey() {
    const selectedKey = this.getSelectedKey(this.props);
    if (selectedKey === null) {
      return;
    }
    this.setState({selectedKey});
  }

  renderMenu(treeItems) {
    let mode;
    if (!Setting.isMobile()) {
      mode = "vertical";
    } else {
      mode = "horizontal";
    }

    const theme = "light";
    // const theme = "dark";

    return (
      <Menu
        // style={{ width: 256 }}
        selectedKeys={[this.state.selectedKey]}
        defaultOpenKeys={["sub1"]}
        mode={mode}
        theme={theme}
        className={"conferenceMenu"}
        style={{border: "1px solid rgb(240,240,240)"}}
        onClick={this.handleClick}
      >
        {
          treeItems.map((treeItem, i) => {
            // if (i === 0) {
            //   return null;
            // }

            if (treeItem.children.length === 0) {
              return (
                <Menu.Item key={treeItem.titleEn} onClick={this.updateSelectedKey.bind(this)}>
                  <Link to={`${this.props.path}${treeItem.titleEn}`}>
                    {this.props.language !== "en" ? treeItem.title : treeItem.titleEn}
                  </Link>
                </Menu.Item>
              );
            } else {
              return (
                <SubMenu key={treeItem.titleEn} title={this.props.language !== "en" ? treeItem.title : treeItem.titleEn}>
                  {
                    treeItem.children.map((treeItem2, i) => {
                      return (
                        <Menu.Item key={treeItem2.titleEn} onClick={this.updateSelectedKey.bind(this)}>
                          <Link to={`${this.props.path}${treeItem.titleEn}/${treeItem2.titleEn}`}>
                            {this.props.language !== "en" ? treeItem2.title : treeItem2.titleEn}
                          </Link>
                        </Menu.Item>
                      );
                    })
                  }
                </SubMenu>
              );
            }
          })
        }
        {/* <Menu.Item key="1" icon={<MailOutlined />}>*/}
        {/*  Introduction*/}
        {/* </Menu.Item>*/}
        {/* <Menu.Item key="1" icon={<MailOutlined />}>*/}
        {/*  Committees*/}
        {/* </Menu.Item>*/}
        {/* <Menu.Item key="1" icon={<MailOutlined />}>*/}
        {/*  Hosting Organizations*/}
        {/* </Menu.Item>*/}
        {/* <Menu.Item key="2" icon={<CalendarOutlined />}>*/}
        {/*  Navigation Two*/}
        {/* </Menu.Item>*/}
        {/* <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Navigation Two">*/}
        {/*  <Menu.Item key="3">Option 3</Menu.Item>*/}
        {/*  <Menu.Item key="4">Option 4</Menu.Item>*/}
        {/*  <SubMenu key="sub1-2" title="Submenu">*/}
        {/*    <Menu.Item key="5">Option 5</Menu.Item>*/}
        {/*    <Menu.Item key="6">Option 6</Menu.Item>*/}
        {/*  </SubMenu>*/}
        {/* </SubMenu>*/}
        {/* <SubMenu key="sub2" icon={<SettingOutlined />} title="Navigation Three">*/}
        {/*  <Menu.Item key="7">Option 7</Menu.Item>*/}
        {/*  <Menu.Item key="8">Option 8</Menu.Item>*/}
        {/*  <Menu.Item key="9">Option 9</Menu.Item>*/}
        {/*  <Menu.Item key="10">Option 10</Menu.Item>*/}
        {/* </SubMenu>*/}
        {/* <Menu.Item key="link" icon={<LinkOutlined />}>*/}
        {/*  <a href="https://ant.design" target="_blank" rel="noopener noreferrer">*/}
        {/*    Ant Design*/}
        {/*  </a>*/}
        {/* </Menu.Item>*/}
      </Menu>
    );
  }

  getSelectedTreeItem(selectedKey, treeItems) {
    if (selectedKey === null) {
      return null;
    }

    const res = treeItems.map(treeItem => {
      if (treeItem.titleEn === selectedKey) {
        return treeItem;
      } else {
        return this.getSelectedTreeItem(selectedKey, treeItem.children);
      }
    }).filter(treeItem => treeItem !== null);

    if (res.length > 0) {
      return res[0];
    } else {
      return null;
    }
  }

  renderPage(treeItem) {
    if (treeItem === undefined || treeItem === null) {
      return (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      );
    }

    return (
      <div>
        {/* <div style={{textAlign: "center", fontSize: "x-large"}}>*/}
        {/*  {*/}
        {/*    treeItem.title*/}
        {/*  }*/}
        {/* </div>*/}
        <div style={{marginTop: "40px"}} dangerouslySetInnerHTML={{__html: this.props.language !== "en" ? treeItem.content : treeItem.contentEn}} />
      </div>
    );
  }

  renderCompetition(conference) {
    if (conference.type !== "Competition") {
      return null;
    }

    return (
      <div style={{marginTop: "20px", marginBottom: "20px"}}>
        <Alert
          banner
          showIcon={false}
          message={
            <h2>
              <span style={{marginRight: "10px"}}>
                {conference.displayName}
              </span>
              {
                Setting.getTag(conference.displayState, "geekblue")
              }
            </h2>}
          description={<div>
            <h3>
              {conference.introduction}
            </h3>
            <div>
              {i18next.t("conference:Organizer")}: {conference.organizer}
            </div>
            <br />
            {i18next.t("conference:Person count")} <span style={{marginLeft: "10px", fontSize: 20, color: "rgb(255,77,79)"}}>{conference.personCount}</span>
            <span style={{float: "right"}}>
              {
                Setting.getTags(conference.tags)
              }
            </span>
            <br />
            <Steps style={{marginTop: "20px"}} current={1} progressDot={(dot, {status, index}) => {
              return (
                <Popover
                  content={
                    <span>
                    step {index} status: {status}
                    </span>
                  }>
                  {dot}
                </Popover>
              );
            }}>
              <Step title="报名" description="04/06-05/11" />
              <Step title="初赛" description="06/01-07/31" />
              <Step title="复赛" description="08/01-09/30" />
              <Step title="决赛" description="09/30" />
            </Steps>
          </div>}
          type="info"
          action={
            <Space direction="vertical" style={{textAlign: "center"}}>
              &nbsp;
              <div style={{fontSize: 30, color: "rgb(255,77,79)"}}>
                 ￥{`${conference.bonus}`.replace("000", ",000")}
              </div>
              <Button style={{marginTop: "20px"}} shape={"round"} type="primary" onClick={() => this.props.history.push("/submissions")}>
                {i18next.t("conference:Apple Now")}
              </Button>
              <Button style={{marginTop: "10px"}} shape={"round"} type="primary" danger onClick={() => Setting.openLinkSafe(conference.resultUrl)}>
                {i18next.t("conference:View Result")}
              </Button>
            </Space>
          }
        />
      </div>
    );
  }

  render() {
    const conference = this.props.conference;
    const selectedTreeItem = this.getSelectedTreeItem(this.state.selectedKey, conference.treeItems);

    if (!selectedTreeItem) {
      return null;
    }

    if (!Setting.isMobile()) {
      return (
        <div>
          <Row>
            <Col span={24} >
              {
                this.renderCompetition(conference)
              }
            </Col>
          </Row>
          <Row>
            <Col span={4} >
              {
                this.renderMenu(conference.treeItems)
              }
            </Col>
            <Col span={1} >
            </Col>
            <Col span={19} >
              {
                this.renderPage(selectedTreeItem)
              }
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div>
          <Row>
            <Row>
              <Col span={24} >
                {
                  this.renderCompetition(conference)
                }
              </Col>
            </Row>
            <Col span={24} >
              {
                this.renderMenu(conference.treeItems)
              }
            </Col>
          </Row>
          <Row>
            <Col span={1} />
            <Col span={22} >
              {
                this.renderPage(selectedTreeItem)
              }
            </Col>
            <Col span={1} />
          </Row>
        </div>
      );
    }
  }
}

export default withRouter(Conference);
