import React from 'react';
import { HashRouter } from 'react-router-dom';
import { routerTree } from '@/router/config';
import RouterView from '@/router/index';

const App: React.FC = () => {
  return (
    <div className="App">
      <HashRouter>
        <RouterView routes={routerTree} />
      </HashRouter>
    </div>
  );
};

export default App;
