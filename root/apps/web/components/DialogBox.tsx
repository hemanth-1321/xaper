import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DialogBox({
  open,
  onOpenChange,
  index,
  availabeItems,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  index: number;
  availabeItems: { id: string; name: string; image: string }[];
  onSelect: (item: { id: string; name: string; image: string }) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {index === 1 ? "Select Trigger" : `Select Action ${index - 1}`}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 max-h-[300px] overflow-y-auto">
          {availabeItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border p-3 rounded-md hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(item);
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded object-cover"
              />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
