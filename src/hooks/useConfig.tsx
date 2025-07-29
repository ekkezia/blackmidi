// src/hooks/useConfig.ts
// fetch data from Sanity CMS
import { useEffect, useState } from 'react';
import { Controller, getControllers, getSongs, Song } from '@/sanity/lib/queries';

export const useConfig = () => {
  const [config, setConfig] = useState<Song[]>([]);
  const [controllerConfig, setControllerConfig] = useState<Controller>(); // take only the first controller settings
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSongs()
      .then((data) => {
        setConfig(data);
        // console.log(data)
      });

      getControllers().then((data) => {
        setControllerConfig(data[0]);
        // console.log(data);
      })
  }, []);

  useEffect(() => {
    if (config && controllerConfig) setLoading(false);
    else setLoading(true);
  }, [controllerConfig, config]);

  return { config, loading, controllerConfig };
};
