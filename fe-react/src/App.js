import "./App.scss"
import { Layout, Menu } from "antd"
import CatalogInformationPage from "./pages/catalogs/CatalogInformation.page.tsx"
import { BrowserRouter, Route, Link, Routes } from "react-router-dom"
import HomePage from "./pages/home/Home.page"
import { QueryClient, QueryClientProvider } from "react-query"

const { Header, Content, Footer } = Layout

const items = new Array(
  {
    key: "home",
    label: <Link to="/">Home</Link>,
  },
  {
    key: "catalog",
    label: <Link to="/catalog">Catalog</Link>,
  }
)
const queryClient = new QueryClient()
function App() {
  return (
    <BrowserRouter>
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
          <QueryClientProvider client={queryClient}>
            <div
              style={{
                background: "#fefefe",
                minHeight: 280,
                padding: 24,
                borderRadius: "8px",
              }}
            >
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/catalog/" element={<CatalogInformationPage />} />
                <Route
                  path="/catalog/:id"
                  element={<CatalogInformationPage />}
                />
              </Routes>
            </div>
          </QueryClientProvider>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </BrowserRouter>
  )
}

export default App
