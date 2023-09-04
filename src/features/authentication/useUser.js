import { useQuery } from "@tanstack/react-query";
import { getCurrent } from "../../services/apiAuth";


export function useUser() {
    const { isLoading, data: user } = useQuery({
        queryFn: getCurrent,
        queryKey: ['user'],
    });


    return { isLoading, user, isAuthenticated: user?.role === 'authenticated' };
}