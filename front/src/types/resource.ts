export interface IResource {
  _id: string;
  sectionId: string;
  name: string;
  description?: string;
  link: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
