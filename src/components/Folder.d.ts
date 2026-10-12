import React, { CSSProperties, ReactNode } from 'react';

export interface FolderItem {
  title?: string;
  description?: string;
  image?: string;
  alt?: string;
  content?: ReactNode;
}

export interface FolderProps {
  items?: (FolderItem | string | number | ReactNode)[];
  children?: ReactNode;
  mode?: 'flap' | 'book';
  variant?: 'solid' | 'glass' | 'matte';
  layout?: 'spread' | 'stack' | 'row';
  color?: string;
  paperColor?: string;
  label?: string;
  tabPosition?: 'left' | 'center' | 'right';
  openOn?: 'click' | 'hover';
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onItemClick?: (item: any, index: number) => void;
  onItemDrop?: (item: any, index: number, inside: boolean) => void;
  draggable?: boolean;
  zoomOnClick?: boolean;
  peek?: boolean;
  intro?: boolean;
  size?: number;
  frost?: number;
  tilt?: number;
  speed?: number;
  bounce?: number;
  closeOnOutsideClick?: boolean;
  theme?: 'dark' | 'light';
  className?: string;
  style?: CSSProperties;
}

declare const Folder: React.FC<FolderProps>;
export default Folder;
