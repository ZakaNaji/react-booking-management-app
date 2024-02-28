import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../../services/SettingService";
import toast from "react-hot-toast";

export default function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: editSetting } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast.success("Settings updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => {
      toast.error("Error updating settings: " + error.message);
    },
  });

  return { isLoading, editSetting };
}
