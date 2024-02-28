import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/cabinsService";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: addCabin } = useMutation({
    mutationFn: (cabin) => createEditCabin(cabin),
    onSuccess: () => {
      toast.success("Cabin created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    addCabin,
  };
}
