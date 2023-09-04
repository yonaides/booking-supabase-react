import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";

export function useCreateCabin() {

    const queryClient = useQueryClient();

    const { mutate: saveCabin, isLoading: isCreating } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New Cabin successfully created");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => toast.error(err.message),

    });


    return { isCreating, saveCabin };
}