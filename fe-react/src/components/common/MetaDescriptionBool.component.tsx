import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import Meta from "antd/es/card/Meta"
import Skeleton from "antd/es/skeleton"

type DescriptionBoolComponentParam = {
  title: string | null
  description?: boolean | null | undefined
}
const MetaDescriptionBool = ({
  title,
  description,
}: DescriptionBoolComponentParam) => {
  const elStyle = { display: "block", padding: "5px 0" }

  if (description == null) {
    return <Skeleton />
  }
  return (
    <>
      {description === true && (
        <span style={{ fontWeight: "bold", ...elStyle }}>
          <CheckOutlined style={{ marginRight: "0.5em" }} />
          {title}
        </span>
      )}
      {description === false && (
        <span style={{ opacity: "0.5", ...elStyle }}>
          <CloseOutlined style={{ marginRight: "0.5em" }} />
          {title}
        </span>
      )}
    </>
  )
}

export default MetaDescriptionBool
