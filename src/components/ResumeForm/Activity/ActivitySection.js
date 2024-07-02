import React, {useEffect} from "react";
import Activity from "./Activity";
import {call} from "../../../service/ApiService";

const ActivitySection = ({ activities, setActivities, resumeId}) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}/activities`, 'GET', null);
                setActivities(response);
            } catch (error) {
                console.log("Failed to fetch activities", error);
            }
        };

        fetchData();
    }, [resumeId, setActivities]);

    return <Activity activities={activities} setActivities={setActivities} resumeId={resumeId} />;
};

export default ActivitySection;