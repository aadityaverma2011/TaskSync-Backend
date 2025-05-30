import { Request, Response } from 'express';
import { supabase } from '../config/supabaseClient';
import { AuthRequest } from '../middleware/authMiddleware';
import { Task } from './types';
export const getDashboardData = async (req: AuthRequest, res: Response) : Promise<any> => {
  const userId = req.user.id;

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId);

  const tasks = data as Task[];

  if (error) {
    return res.status(500).json({ message: 'Error fetching dashboard data', error });
  }

  const now = new Date();
  const upcoming = tasks.filter(
    t => t.due_date && new Date(t.due_date) >= now
  );

  const byPriority = { high: 0, medium: 0, low: 0 };

  for (const task of tasks) {
    if (
      task.priority === 'high' ||
      task.priority === 'medium' ||
      task.priority === 'low'
    ) {
      byPriority[task.priority]++;
    }
  }

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  res.json({
    totalTasks: total,
    completedTasks: completed,
    pendingTasks: pending,
    upcomingTasks: upcoming.slice(0, 5),
    byPriority,
  });
};
