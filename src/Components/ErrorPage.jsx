import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-[50vh] flex flex-col justify-center items-center">
      <h1 className="text-4xl py-5">Oops!</h1>
      <p className="text-2xl py-5">Sorry, an unexpected error has occurred.</p>
      <p className="text-xl py-5">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
