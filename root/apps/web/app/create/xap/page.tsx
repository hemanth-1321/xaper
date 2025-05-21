"use client";
import { BACKEND_URL } from "@/app/config";
import { DialogBox } from "@/components/DialogBox";
import { Button } from "@/components/ui/button";
import { Xapcell } from "@/components/xapCell";
import { useAvailabeActionAndTrigger } from "@/hooks/useAvailabeActionAndTrigger";
import axios from "axios";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [selectedTrigger, setSelectedTrigger] = useState<{
    id: string;
    name: string;
    image: string;
  } | null>(null);

  const [selectedActions, setSelectedActions] = useState<
    {
      availableActionId: string;
      availableActionName: string;
      availableActionImage: string;
    }[]
  >([]);

  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const router = useRouter();

  const { availabeActions, availabeTriggers } = useAvailabeActionAndTrigger();

  const handleAddAction = () => {
    setSelectedActions((prev) => [
      ...prev,
      {
        availableActionId: `temp-${prev.length}`,
        availableActionName: `Action ${prev.length + 1}`,
        availableActionImage: "",
      },
    ]);
  };

  const handleSelectItem = (selectedItem: { id: string; name: string; image: string }) => {
    if (selectedModalIndex === 1) {
      setSelectedTrigger({
        id: selectedItem.id,
        name: selectedItem.name,
        image: selectedItem.image,
      });
    } else if (selectedModalIndex !== null) {
      const actionIndex = selectedModalIndex - 2;
      setSelectedActions((prev) => {
        const updated = [...prev];
        updated[actionIndex] = {
          availableActionId: selectedItem.id,
          availableActionName: selectedItem.name,
          availableActionImage: selectedItem.image,
        };
        return updated;
      });
    }
    setIsDialogOpen(false);
  };

  const handlePublish = async () => {
    if (!selectedTrigger) {
      toast.error("Please select a Trigger before publishing.");
      return;
    }

    if (selectedActions.some((a) => a.availableActionId.startsWith("temp"))) {
      toast.error("Please select valid Actions before publishing.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${BACKEND_URL}/api/zap`,
           {
        AvailabeTriggerId: selectedTrigger.id, 
        triggerMetaData: {},
        actions: selectedActions.map((action) => ({
          availbeActionId: action.availableActionId, 
          actionMetaData: {},
        })),
      },
        {
          headers: {
            Authorization: token ?? "",
          },
        }
      );
      toast.success("Zap created successfully!");
      router.push("/dashboard")
    } catch (error) {
      console.error(error);
      toast.error("Failed to create zap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top-right Publish Button */}
      <div className="flex justify-end mb-6">
        <Button
          onClick={handlePublish}
          disabled={loading}
          className="cursor-pointer"
        >
          {loading ? "Publishing..." : "Publish"}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center space-y-4">
        {/* Trigger Selection */}
        <Xapcell
          name={selectedTrigger?.name || "Trigger"}
          index={0}
          image={selectedTrigger?.image}
          onclick={() => {
            setSelectedModalIndex(1);
            setIsDialogOpen(true);
          }}
        />

        {/* Actions List */}
        <div className="space-y-3 w-80">
          {selectedActions.map((action, index) => (
            <Xapcell
              key={index}
              name={action.availableActionName}
              index={index + 1}
              image={action.availableActionImage}
              onclick={() => {
                setSelectedModalIndex(index + 2);
                setIsDialogOpen(true);
              }}
            />
          ))}
        </div>

        {/* Add Action Button */}
        <Button
          onClick={handleAddAction}
          className="mt-4 bg-green-600 text-white hover:bg-green-700"
        >
          + Add Action
        </Button>

        {/* Dialog Modal */}
        {selectedModalIndex && (
          <DialogBox
            availabeItems={selectedModalIndex === 1 ? availabeTriggers : availabeActions}
            index={selectedModalIndex}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onSelect={handleSelectItem}
          />
        )}
      </div>
    </div>
  );
}
