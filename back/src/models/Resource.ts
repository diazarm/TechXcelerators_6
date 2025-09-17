import mongoose, {Schema, model, Document} from 'mongoose';

export interface IResource extends Document {
  sectionId: Schema.Types.ObjectId;
  name: string;
  description?: string;
  links: {
    label?: string; //Ejemplo: "EAFIT", "Directorio de contactos", etc.
    url: string;
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const resourceSchema = new Schema<IResource>(
  {
    sectionId: {type: Schema.Types.ObjectId, ref: 'Section', required: true},
    name: {type: String, required: true},
    description: {type: String},
    links: [
      {
        label: {type: String},
        url: {type: String, required: true},
      },
    ],
    isActive: {type: Boolean, default: true},
    deletedAt: {type: Date, default: null},
  },
  {timestamps: true}
);

// Middleware para excluir soft deleted en consultas find, findOne, etc
resourceSchema.pre(/^find/, function (this: mongoose.Query<IResource[], IResource>, next) {
  const includeDeleted = this.getOptions().includeDeleted;
  if (!includeDeleted) {
    this.where({ isActive: true, deletedAt: null });
  }
  next();
});

const Resource = model<IResource>('Resource', resourceSchema);
export default Resource;