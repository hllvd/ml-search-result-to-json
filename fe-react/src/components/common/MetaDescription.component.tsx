import { CheckOutlined } from "@ant-design/icons"
import Meta from "antd/es/card/Meta"
import Skeleton from "antd/es/skeleton"

type DescriptionComponentParam = {
  title: string | null
  description?: string | number | null
  link?: string
}
const MetaDescription = ({
  title,
  description,
  link,
}: DescriptionComponentParam) => (
  <>
    {description != null ? (
      <>
        {link ? (
          <a href={link} target="_blank">
            <Meta title={title} description={description} />
          </a>
        ) : (
          <Meta title={title} description={description} />
        )}
      </>
    ) : (
      <></>
    )}
  </>
)

export default MetaDescription
