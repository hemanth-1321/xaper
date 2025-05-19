"use client";
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
      <Xapcell name={selectedTrigger?selectedTrigger:"Trigger"} index={0} />
      
      <div className="space-y-2">
        {selectedActions.map((action, index) => (
          <Xapcell
            key={action.availableActionId}
            name={action.availableActionName}
            index={index + 1}
          />
        ))}
      </div>

      <Button onClick={handleAddAction}>+</Button>
    </div>
  );
}
