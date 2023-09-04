import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var()(--color-grey);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {

    const navigate = useNavigate();

    const { isLoading, isAuthenticated } = useUser();

    useEffect(function () {
        if (!isAuthenticated && !isLoading) navigate("/login");
    }, [isLoading, isAuthenticated, navigate])

    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        )



    return children
}

export default ProtectedRoute