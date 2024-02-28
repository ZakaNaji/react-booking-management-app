import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/SettingService";

export default function useSettings() {
  const {
    isLoading,
    isError,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return {
    isLoading,
    isError,
    settings,
  };
}
