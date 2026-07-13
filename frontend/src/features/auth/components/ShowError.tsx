import { useAppSelector } from "../../../app/redux/hook";

const ShowError = () => {
  const error: unknown = useAppSelector((state) => state.auth.error);
  return (
    <>
      {error && typeof error === "string" && (
        <small className="text-red-500 italic text-center">
          ⚠️ {error || ""}
        </small>
      )}
    </>
  );
};

export default ShowError;
