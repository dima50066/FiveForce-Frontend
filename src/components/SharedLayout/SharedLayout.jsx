import React from 'react';
import { Outlet } from 'react-router-dom';

export default function SharedLayout() {
  return (
    <div>
      <header>
        <h1>Shared Layout Header</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
