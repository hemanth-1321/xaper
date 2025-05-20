"use client";
import { DialogBox } from "@/components/DialogBox";
import { Button } from "@/components/ui/button";
import { Xapcell } from "@/components/xapCell";
import { useState } from "react";

export default function Page() {
  const [selectedTrigger, setSelectedTrigger] = useState("");
  const [selectedActions, setSelectedActions] = useState<
    {
      availableActionId: string;
      availableActionName: string;
    }[]
  >([]);
  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddAction = () => {
    setSelectedActions((prev) => [
      ...prev,
      {
        availableActionId: `action-${prev.length}`,
        availableActionName: `Action ${prev.length + 1}`,
      },
    ]);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
      <Xapcell
        name={selectedTrigger || "Trigger"}
        index={0}
        onclick={() => {
          setSelectedModalIndex(1);
          setIsDialogOpen(true);
        }}
      />

      <div className="space-y-2">
        {selectedActions.map((action, index) => (
          <Xapcell
            key={action.availableActionId}
            name={action.availableActionName}
            index={index + 1}
            onclick={() => {
              setSelectedModalIndex(index + 2);
              setIsDialogOpen(true);
            }}
          />
        ))}
      </div>

      <Button onClick={handleAddAction}>+</Button>

      {selectedModalIndex && (
        <DialogBox
          index={selectedModalIndex}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </div>
  );
}
  