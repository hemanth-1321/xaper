export function Xapcell({
  name,
  index,
  image,
  onclick,
}: {
  name: string;
  index: number;
  image?: string;
  onclick: () => void;
}) {
  return (
    <div
      className="flex items-center space-x-4 border rounded-lg p-4 cursor-pointer hover:bg-gray-100 w-80"
      onClick={onclick}
    >
      {image ? (
        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
      ) : (
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
          ?
        </div>
      )}
      <div className="text-base font-medium">
        {index === 0 ? "Trigger: " : `Action ${index}: `}
        {name}
      </div>
    </div>
  );
}
