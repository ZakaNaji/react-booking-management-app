import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/cabinsService";

export default function useCabine() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { isLoading, cabins, error };
}
