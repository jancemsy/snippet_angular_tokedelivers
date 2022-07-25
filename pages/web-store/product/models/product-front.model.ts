export interface IProductCircleBar {
  name: string;
  percent: number;
  icon: string;
}

export interface IProductPercentBar {
  name: string;
  percent: number;
}

export interface ISearchCategory {
  category_name: string;
  category_items: ISearchCategoryItem[];
  is_expanded: boolean;
}

export interface ISearchCategoryItem {
  name: string;
  search_key: string;
}
