import React from "react";
import "antd/dist/antd.css";
import { Form, Table, Layout, Row, Col, Button, Select, Icon } from "antd";
import { reverseString } from "./helper";
import mockData from "./mock_response";
import "./App.css";

const DEFAULT_SHOW_ALL_QUOTE_STATUS = "All quote status";

class App extends React.Component {
  constructor(props) {
    super(props);
    const data = this.processData(mockData);
    const dataFilter = this.getDataFilter(data);
    this.state = {
      data,
      dataFilter,
      currentFilter: DEFAULT_SHOW_ALL_QUOTE_STATUS
    };
  }

  processData = data => {
    return data.map(_data => {
      Object.keys(_data).forEach(_key => {
        _data[_key] = reverseString(_data[_key]);
      });
      return _data;
    });
  };

  getDataFilter = data => {
    const arDataFilter = [
      DEFAULT_SHOW_ALL_QUOTE_STATUS,
      ...data.map(_data => _data.status)
    ];
    return arDataFilter.filter((v, i) => arDataFilter.indexOf(v) === i);
  };

  handleFilterChange = currentFilter => {
    this.setState({ currentFilter });
  };

  render() {
    const { data, currentFilter, dataFilter } = this.state;
    const { Header, Content, Footer } = Layout;
    const { Option } = Select;

    const columns = [
      {
        title: "Origin",
        dataIndex: "origin"
      },
      {
        title: "Destination",
        dataIndex: "destination"
      },
      {
        title: "Cargo Details",
        dataIndex: "cargo_disc"
      },
      {
        title: "Status",
        dataIndex: "status"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Button
            onClick={() => alert(JSON.stringify(record))}
            type="link"
            icon="more"
          ></Button>
        )
      }
    ];

    const dataAfterFilter =
      currentFilter !== DEFAULT_SHOW_ALL_QUOTE_STATUS
        ? data.filter(_data => _data.status === currentFilter)
        : data;

    return (
      <Layout>
        <Header className="header">
          <h1>Quotes</h1>
        </Header>
        <Content className="content">
          <Layout className="layout">
            <Content className="content-filter">
              <Row>
                <Col span={6}>
                  <Form layout="inline">
                    <Form.Item label="Filter">
                      <Select
                        defaultValue={dataFilter[0]}
                        onChange={this.handleFilterChange}
                      >
                        {dataFilter.map(_dataFilter => (
                          <Option key={_dataFilter} value={_dataFilter}>
                            {_dataFilter}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Form>
                </Col>
                <Col span={6} offset={12}>
                  <Button
                    className="btn-request-quote"
                    onClick={() => alert("Clicked")}
                  >
                    Request Quote
                  </Button>
                </Col>
              </Row>
            </Content>
            <Content className="content-table">
              <Table
                className="table-quotes"
                columns={columns}
                dataSource={dataAfterFilter}
                pagination={false}
                size="small"
              />
            </Content>
          </Layout>
        </Content>
        <Footer className="footer">Test ReactJS</Footer>
      </Layout>
    );
  }
}

export default App;
