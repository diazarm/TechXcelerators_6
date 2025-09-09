import type { IResource } from "../../types";

export interface ResourceDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  responsive: {
    text: {
      small: string;
      xsmall: string;
    };
  };
  resources: IResource[];
  loading: boolean;
}

