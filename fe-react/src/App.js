import "./App.scss"
import {
  Breadcrumb,
  Layout,
  Menu,
  Table,
  Input,
  Col,
  Row,
  Space,
  Button,
} from "antd"

const { Header, Content, Footer } = Layout

const items = new Array(3).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}))

const dataSource = [
  {
    key: "",
    title:
      "Taiff Black Ion Secador De Cabelo Profissional 2000w Cor Preto 110v",
    id: 32,
    ean: 1231231231231,
    quantity: 80,
    revenue: 12332,
    dailyRevenue: 1232,
    created: "11/12/2020",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
]

const columns = [
  {
    title: "Título",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Ean",
    dataIndex: "ean",
    key: "ean",
  },
  {
    title: "Id do catálogo",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Qtd de anúnciantes",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Faturamento total",
    dataIndex: "revenue",
    key: "revenue",
  },
  {
    title: "Faturamento diário",
    dataIndex: "dailyRevenue",
    key: "dailyRevenue",
  },
  {
    title: "Data de criação",
    dataIndex: "created",
    key: "created",
  },
]

function App() {
  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Row>
          <Col span={8} offset={8}>
            <Space.Compact block>
              <Input
                style={{
                  width: "calc(100% - 200px)",
                }}
                placeholder="Url ou código do catálogo"
              />
              <Button type="primary">Submit</Button>
            </Space.Compact>
          </Col>
        </Row>

        <div
          style={{
            background: "#fefefe",
            minHeight: 280,
            padding: 24,
            borderRadius: "8px",
          }}
        >
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default App
