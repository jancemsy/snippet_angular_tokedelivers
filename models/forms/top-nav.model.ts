export interface TopNavMenuItems {
  label: string;
  link: string;
}

export interface TopNavIconMenuItems {
  iconClass: string;
  link: string;
  dropdownItems?: DropDownMenuItem[];
}

export interface DropDownMenuItem {
  iconClass?: string;
  link?: string;
  label?: string;
  isDivider?: boolean;
  isSubItem?: boolean;
  isLogout?: boolean;
  description?: string;
}
