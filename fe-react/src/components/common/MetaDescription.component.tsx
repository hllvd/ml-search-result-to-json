import { CheckOutlined } from "@ant-design/icons"
import Meta from "antd/es/card/Meta"
import Skeleton from "antd/es/skeleton"
import { isArray } from "util"

type DescriptionComponentParam = {
  title: string | null
  description?: string | Array<string> | number | null
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
        ) : Array.isArray(description) ? (
          <Meta title={title} description={description.join("\n")} />
        ) : (
          <Meta title={title} description={description} />
        )}
      </>
    ) : (
      <Skeleton />
    )}
  </>
)

export default MetaDescription
