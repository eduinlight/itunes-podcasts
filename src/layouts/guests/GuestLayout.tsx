import { Outlet } from "react-router-dom";

export const GuestLayout = () => {
  return (
    <>
      <header className="py-4 px-3 items-space-between border-b-2 border-solid border-b-border">
        <h1 className="text-black font-bold text-xl text-primary">Podcaster</h1>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};
