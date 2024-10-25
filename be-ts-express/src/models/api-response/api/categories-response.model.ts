export interface CategoriesApiResponse {
  id: string
  name: string
  picture?: any
  permalink?: any
  total_items_in_this_category: number
  path_from_root: Pathfromroot[]
  children_categories: Childrencategory[]
  meta_categ_id?: any
  date_created: string
}
interface Childrencategory {
  id: string
  name: string
  total_items_in_this_category: number
}
interface Pathfromroot {
  id: string
  name: string
}
