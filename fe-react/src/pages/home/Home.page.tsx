import React from "react"
import SearchComponent from "../../components/common/Search.component"

const HomePage: React.FC = () => {
  return (
    <React.Fragment>
      <div className="search-centered">
        <SearchComponent />
      </div>
    </React.Fragment>
  )
}
export default HomePage
