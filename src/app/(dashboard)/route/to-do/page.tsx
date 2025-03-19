'use client';
import { Button } from '@/components/ui/button';
import ItemTaskToDo from './components/item-task-todo';
import { useEffect, useState, useTransition } from 'react';
import calculateOptimalRoute from '../algorithm/genetic-algorithm-tsp';
import useRouteStore from '../_store/useRouteStore';
import addRoute, { readAsigneeOptions, readWaypoints } from './actions';
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
    { task_id: string; name: string; lat: number; lon: number }[]
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
    setWaypoints([]);
    setSelectedRoute(null);
  }, [setWaypoints, setSelectedRoute]);

  useEffect(() => {
    setWaypoints(fetchedWaypoints);
  }, [fetchedWaypoints, setWaypoints]);

  const onSubmit = (data: RouteForm) => {
    startTransition(async () => {
      const result = await addRoute(data, waypoints);
      const { error } = JSON.parse(result);

      if (error) {
        toast('Gagal menambahkan rute', {
          description: error.message,
        });
        console.error(error);
      } else {
        toast('Berhasil menambahkan rute');
        methods.reset(); // Reset form setelah berhasil menambahkan rute
        setFetchedWaypoints([]);
      }
    });
  };

  const handleCalculateRoute = () => {
    startTransition(async () => {
      const { route, distance } = await calculateOptimalRoute(fetchedWaypoints);
      setWaypoints(route);
      console.log('Jarak total: ', distance, ' km');
      toast('Rute berhasil dioptimalkan', {
        description: `Jarak total: ${distance} km`,
      });
    });
  };
  return (
    <>
      <header className="p-4 ">
        <h1 className="text-lg font-semibold">
          Tugas Hari Ini ({waypoints?.length})
        </h1>
      </header>
      {/* Main content of the sidebar with scroll */}
      <main className="flex-1 overflow-y-auto scrollbar">
        <div className="h-max">
          {fetchedWaypoints?.length > 0 ? (
            fetchedWaypoints.map((waypoint, idx) => (
              <ItemTaskToDo
                key={idx}
                order={idx + 1}
                custName={waypoint.name}
              />
            ))
          ) : waypoints?.length > 0 ? (
            waypoints.map((waypoint, idx) => (
              <ItemTaskToDo
                key={idx}
                order={idx + 1}
                custName={waypoint.name!}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500 px-4">
              Tidak ada tugas untuk hari ini
            </p>
          )}
        </div>
      </main>
      <footer className="flex flex-col gap-2 p-4 bg-white ">
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-2"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <SelectField
              name="asignee_id"
              options={asigneeOptions}
              placeholder="Pilih penerima tugas"
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
              <Button disabled={isPending || waypoints?.length < 1}>
                Tugaskan
              </Button>
            </div>
          </form>
        </FormProvider>
      </footer>
    </>
  );
}
