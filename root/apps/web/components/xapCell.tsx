export const Xapcell = ({
  name,
  index,
  onclick
}: {
  name?: string;
  index: number;
  onclick: () => void;
}) => {
  return (
    <div
      className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-800 w-96 cursor-pointer hover:bg-gray-100 transition"
      onClick={onclick}
    >
      <div className="font-semibold">#{index + 1}</div>
      <div>{name || "Unnamed Trigger"}</div>
    </div>
  );
};
