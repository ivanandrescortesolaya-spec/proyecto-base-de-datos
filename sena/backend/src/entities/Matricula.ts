import { Schema, model, Document, Types } from 'mongoose';

export interface IMatricula extends Document {
  aprendizId: Types.ObjectId;
  ficha: string;
  jornada: 'Diurna' | 'Nocturna' | 'Mixta';
  estado: 'En formación' | 'Condicionado' | 'Cancelado';
  fechaInicio: Date;
  fechaFin: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MatriculaSchema = new Schema<IMatricula>(
  {
    aprendizId: { type: Schema.Types.ObjectId, ref: 'Aprendiz', required: true, index: true },
    ficha: { type: String, required: true, trim: true },
    jornada: { type: String, enum: ['Diurna', 'Nocturna', 'Mixta'], required: true },
    estado: {
      type: String,
      enum: ['En formación', 'Condicionado', 'Cancelado'],
      default: 'En formación',
    },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
  },
  { timestamps: true },
);

MatriculaSchema.index({ ficha: 1 });
MatriculaSchema.index({ estado: 1 });

export const MatriculaModel = model<IMatricula>('Matricula', MatriculaSchema);