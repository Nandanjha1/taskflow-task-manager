import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    checkBackendHealth,
} from "../services/healthService";


export const useBackendStatus = () => {

    const [isOnline, setIsOnline] = useState(false);

    const [checking, setChecking] = useState(true);


    const checkStatus = useCallback(async () => {

        setChecking(true);

        try {

            await checkBackendHealth();

            setIsOnline(true);

        } catch (error) {

            console.error(
                "Backend health check failed:",
                error
            );

            setIsOnline(false);

        } finally {

            setChecking(false);
        }

    }, []);

    useEffect(() => {

        checkStatus();

    }, [checkStatus]);

    return {
        isOnline,
        checking,
        checkStatus,
    };
};