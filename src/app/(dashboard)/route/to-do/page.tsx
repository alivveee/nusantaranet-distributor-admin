'use client';
import { Button } from '@/components/ui/button';
import ItemTaskToDo from './components/item-task-todo';
import { useEffect, useState, useTransition } from 'react';
import calculateOptimalRoute from '../algorithm/genetic-algorithm-tsp';
import useRouteStore from '../_store/useRouteStore';
import { readAsigneeOptions, readWaypoints } from './actions';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectField from '@/components/select-field';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const routeSchema = z.object({
  asignee_id: z.string().nonempty('Penerima tugas harus diisi'),
});

type RouteForm = z.infer<typeof routeSchema>;

export default function ToDoRoutePage() {
  const [isPending, startTransition] = useTransition();
  const [fetchedWaypoints, setFetchedWaypoints] = useState<
    { name: string; lat: number; lon: number }[]
  >([]);
  const { setSelectedRoute, setWaypoints, waypoints } = useRouteStore();
  const [asigneeOptions, setAsigneeOptions] = useState<
    { value: string; label: string }[] | undefined
  >([]);

  const methods = useForm<RouteForm>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      asignee_id: '',
    },
  });

  useEffect(() => {
    const fetchAsigneeOptions = async () => {
      const asigneeOptionsData = await readAsigneeOptions();
      setAsigneeOptions(asigneeOptionsData);
    };
    const fetchWaypoints = async () => {
      const waypointsData = await readWaypoints();
      if (waypointsData) {
        setFetchedWaypoints(waypointsData);
      } else {
        setFetchedWaypoints([]);
      }
    };
    fetchWaypoints();
    fetchAsigneeOptions();
  }, []);

  useEffect(() => {
    setSelectedRoute(null);
    setWaypoints(null);
  }, [setSelectedRoute, setWaypoints]);

  useEffect(() => {
    setWaypoints(fetchedWaypoints);
  }, [fetchedWaypoints, setWaypoints]);

  const handleCalculateRoute = () => {
    startTransition(async () => {
      const { route, distance } = await calculateOptimalRoute(fetchedWaypoints);
      setWaypoints(route);

      toast('Rute berhasil dioptimalkan', { description: `Jarak total: ${distance} km` });
      
    });
  };
  return (
    <>
      <header className="p-4 ">
        <h1 className="text-lg font-semibold">Total Kunjungan (4)</h1>
      </header>
      {/* Main content of the sidebar with scroll */}
      <main className="flex-1 overflow-y-auto">
        <div className="h-max">
          {waypoints
            ? waypoints.map((waypoint, idx) => (
                <ItemTaskToDo
                  key={idx}
                  order={idx + 1}
                  custName={waypoint.name}
                />
              ))
            : fetchedWaypoints.map((waypoint, idx) => (
                <ItemTaskToDo
                  key={idx}
                  order={idx + 1}
                  custName={waypoint.name}
                />
              ))}
        </div>
      </main>
      <footer className="flex flex-col gap-2 p-4 bg-white">
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-2"
            // onSubmit={methods.handleSubmit(handleSubmit)}
          >
            <SelectField
              name="asignee"
              options={asigneeOptions}
              label="Penerima Tugas"
            />
            <div className="grid grid-cols-2 gap-2">
              <Button
                className=" bg-green-600 hover:bg-green-500"
                onClick={() => handleCalculateRoute()}
                type="button"
              >
                Optimalkan{' '}
                <AiOutlineLoading3Quarters
                  className={cn('animate-spin', { hidden: !isPending })}
                />
              </Button>
              <Button type="submit">Tugaskan</Button>
            </div>
          </form>
        </FormProvider>
      </footer>
    </>
  );
}
