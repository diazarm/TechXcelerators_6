import type { IResource } from "../../types";

export interface ResourceDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  resources: IResource[];
  loading: boolean;
}

