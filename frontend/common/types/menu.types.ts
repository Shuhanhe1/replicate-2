export interface MenuItem {
  title: string;
  link?: string;
  children?: MenuItem[][];
  nested?: MenuItem[];
  heading?: boolean;
  break?: boolean;
  fullSize?: boolean;
}
