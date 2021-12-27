import { useActor } from "@xstate/react";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { Loading } from "../../components/shared/Loading";
import { GlobalStateContext } from "../../context";

export const GuestLayout = () => {
  const { headerService } = useContext(GlobalStateContext);
  const [state] = useActor(headerService);

  return (
    <>
      <header className="py-4 px-3 flex flex-row justify-between items-center border-b-2 border-solid border-b-border">
        <h1 className="text-black font-bold text-xl text-primary">
          <Link to="/">Podcaster</Link>
        </h1>
        {state.matches("loading") && <Loading />}
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};
