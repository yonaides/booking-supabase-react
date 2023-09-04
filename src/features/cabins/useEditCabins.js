import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";

export function useEditCabin() {

    const queryClient = useQueryClient();

    const { mutate: updateCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => createCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Update Cabin successfully created");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => toast.error(err.message),

    });

    return { isEditing, updateCabin };
}