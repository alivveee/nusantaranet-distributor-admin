'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskDetail from './task-detail';
import { IRoute } from '@/lib/types';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { calculateHourDifference } from '.';

interface RouteDetailsProps {
  route: IRoute | null;
  onClose: () => void;
}

export function RouteDetails({ route, onClose }: RouteDetailsProps) {
  if (!route) return null;
  return (
    <AnimatePresence>
      {route && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute bottom-0 left-0 right-0 bg-white border-t shadow-lg z-10 max-h-[50vh] overflow-y-auto"
        >
          <div className="w-full">
            <header className="flex items-center justify-between py-2 px-4 bg-gray-100 border-b">
              <span className="text-md font-bold">
                {format(parseISO(route.created_at), 'EEEE, d MMMM yyyy', {
                  locale: id,
                })}
              </span>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="w-5" />
              </button>
            </header>

            <div className="flex gap-6 p-4">
              <div className="w-[400px]">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Penerima Tugas</span>
                    <span className="font-medium">{route.asignee_name}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Mulai</span>
                    <span>
                      {format(
                        new Date(route.created_at),
                        'dd MMMM yyyy HH:mm',
                        { locale: id }
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Selesai</span>
                    <span>
                      {route.completed_at
                        ? format(
                            new Date(route.completed_at),
                            'dd MMMM yyyy HH:mm',
                            { locale: id }
                          )
                        : '-'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Waktu Tempuh</span>
                    <span>
                      {route.completed_at
                        ? calculateHourDifference(
                            route.created_at,
                            route.completed_at
                          )
                        : '-'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto w-full scrollbar">
                <div className="flex gap-1 w-max">
                  {route.tasks.map((task, idx) => (
                    <TaskDetail
                      key={task.task_info.id}
                      task={task}
                      order={idx + 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
