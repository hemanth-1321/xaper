export const Xapcell = ({
  name,
  index,
}: {
  name?: string;
  index: number;
}) => {
  return (
    <div className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-800 w-96">
      <div className="font-semibold">#{index + 1}</div>
      <div>{name || "Unnamed Trigger"}</div>
    </div>
  );
};
