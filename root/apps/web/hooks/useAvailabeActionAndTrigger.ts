import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { useEffect, useState } from "react";

export function useAvailabeActionAndTrigger() {
  const [availabeActions, setAvailabeActions] = useState([]);
  const [availabeTriggers, setAvailabeTriggers] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/triggers/available`)
      .then((response) => setAvailabeTriggers(response.data.availabeTriggers))
      .catch((error) => {
        console.error("Error fetching available triggers:", error);
      });

    axios
      .get(`${BACKEND_URL}/api/actions/available`)
      .then((response) => setAvailabeActions(response.data.availabeActions))
      .catch((error) => {
        console.error("Error fetching available actions:", error);
      });
  }, []);

  return {
    availabeActions,
    availabeTriggers,
  };
}
