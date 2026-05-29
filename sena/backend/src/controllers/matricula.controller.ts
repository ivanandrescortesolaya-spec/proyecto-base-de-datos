import { Request, Response } from 'express';
import { MatriculaModel } from '../entities/Matricula';

export class MatriculaController {
  async getAll(req: Request, res: Response) {
    try {
      const matriculas = await MatriculaModel.find()
        .populate('aprendizId', 'nombre documento programa')
        .sort({ createdAt: -1 });
      res.json(matriculas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener matrículas' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const matricula = await MatriculaModel.findById(req.params.id)
        .populate('aprendizId');
      if (!matricula) {
        return res.status(404).json({ error: 'Matrícula no encontrada' });
      }
      res.json(matricula);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener matrícula' });
    }
  }

  async getByAprendiz(req: Request, res: Response) {
    try {
      const matriculas = await MatriculaModel.find({ aprendizId: req.params.aprendizId })
        .populate('aprendizId', 'nombre documento programa')
        .sort({ createdAt: -1 });
      res.json(matriculas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener matrículas del aprendiz' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const matricula = new MatriculaModel(req.body);
      await matricula.save();
      const populated = await matricula.populate('aprendizId', 'nombre documento programa');
      res.status(201).json(populated);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear matrícula' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const matricula = await MatriculaModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate('aprendizId', 'nombre documento programa');
      
      if (!matricula) {
        return res.status(404).json({ error: 'Matrícula no encontrada' });
      }
      res.json(matricula);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar matrícula' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const matricula = await MatriculaModel.findByIdAndDelete(req.params.id);
      if (!matricula) {
        return res.status(404).json({ error: 'Matrícula no encontrada' });
      }
      res.json({ message: 'Matrícula eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar matrícula' });
    }
  }
}
