import { Request, Response } from 'express';
import { supabase } from '../config/supabaseClient';
import { AuthRequest } from '../middleware/authMiddleware';

export const createTask = async (req: AuthRequest, res: Response) : Promise<any> => {
  const { title, description, priority, due_date } = req.body;

  const { data, error } = await supabase.from('tasks').insert([
    {
      title,
      description,
      priority,
      due_date,
      user_id: req.user.id,
    },
  ]).select();

  if (error) return res.status(500).json({ message: 'Error creating task', error });

  res.status(201).json({ message: 'Task created', data });
};

export const getTasks = async (req: AuthRequest, res: Response): Promise<any> => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ message: 'Error fetching tasks', error });

  res.status(200).json(data);
};

export const updateTask = async (req: AuthRequest, res: Response) : Promise<any> => {
  const { id } = req.params;
  const updates = req.body;

  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .eq('user_id', req.user.id);

  if (error) return res.status(500).json({ message: 'Error updating task', error });

  res.status(200).json({ message: 'Task updated', data });
};

export const deleteTask = async (req: AuthRequest, res: Response) : Promise<any> => {
  const { id } = req.params;

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', req.user.id);

  if (error) return res.status(500).json({ message: 'Error deleting task', error });

  res.status(200).json({ message: 'Task deleted' });
};
