import { Request, Response } from 'express';
import { AprendizModel } from '../entities/Aprendiz';

export class AprendizController {
  async getAll(req: Request, res: Response) {
    try {
      const aprendices = await AprendizModel.find().sort({ createdAt: -1 });
      res.json(aprendices);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener aprendices' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const aprendiz = await AprendizModel.findById(req.params.id);
      if (!aprendiz) {
        return res.status(404).json({ error: 'Aprendiz no encontrado' });
      }
      res.json(aprendiz);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener aprendiz' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const aprendiz = new AprendizModel(req.body);
      await aprendiz.save();
      res.status(201).json(aprendiz);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.status(400).json({ error: 'El documento ya existe' });
      }
      res.status(500).json({ error: 'Error al crear aprendiz' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const aprendiz = await AprendizModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!aprendiz) {
        return res.status(404).json({ error: 'Aprendiz no encontrado' });
      }
      res.json(aprendiz);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar aprendiz' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const aprendiz = await AprendizModel.findByIdAndDelete(req.params.id);
      if (!aprendiz) {
        return res.status(404).json({ error: 'Aprendiz no encontrado' });
      }
      res.json({ message: 'Aprendiz eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar aprendiz' });
    }
  }
}
