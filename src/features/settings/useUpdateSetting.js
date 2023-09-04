import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {

    const queryClient = useQueryClient();

    const { mutate: updateSetting, isLoading: isUpdate } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Update setting successfully edited");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (err) => toast.error(err.message),

    });

    return { isUpdate, updateSetting };
}