import "./App.scss"
import { Layout, Menu } from "antd"
import CatalogInformationPage from "./components/page/catalog-information.page.tsx"

const { Header, Content, Footer } = Layout

const items = new Array(3).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}))

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
        <div
          style={{
            background: "#fefefe",
            minHeight: 280,
            padding: 24,
            borderRadius: "8px",
          }}
        >
          <CatalogInformationPage></CatalogInformationPage>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default App
