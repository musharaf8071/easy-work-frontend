import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewSpace from '../components/spaces/NewSpace';
import Space from '../components/spaces/Space';
import Spaces from '../components/spaces/Spaces';
import NewTask from '../components/tasks/NewTask';
import Task from '../components/tasks/Task';

function SpaceRoute() {
 return (
  <Routes>
   <Route path="*" element={<Spaces />} />
   <Route path="new-space/*" element={<NewSpace />} />
   <Route path=":spaceid/tasks/" element={<Space />} />
   <Route path=":spaceid/tasks/:taskid/" element={<Task />} />
   <Route path=":spaceid/new-task/" element={<NewTask />} />
  </Routes>
 );
}

export default SpaceRoute;