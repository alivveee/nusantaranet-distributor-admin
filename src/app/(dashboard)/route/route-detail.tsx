'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskDetail from './task-detail';

interface RouteDetailsProps {
  route: {
    id: string;
    date: string;
    recipient: string;
    customer: {
      id: string;
      name: string;
      type: string;
    };
    startTime: string;
    endTime: string;
    duration: string;
    address: string;
    coordinates: string;
    status: 'Berhasil' | 'Berjalan' | 'Selesai';
    type: string;
  } | null;
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
              <span className="text-md">{route.date}</span>
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
                    <span className="font-medium">{route.recipient}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Mulai</span>
                    <span>{route.startTime}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Selesai</span>
                    <span>{route.endTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Waktu Tempuh</span>
                    <span>{route.duration}</span>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto w-full">
                <div className="flex gap-1 w-max">
                  <TaskDetail task={route} />
                  <TaskDetail task={route} />
                  <TaskDetail task={route} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
