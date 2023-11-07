import { MissionResponse } from "@/types/response";
import { apiUrl } from "./urls";

export const getTestMissions = async () => {
  const res = await fetch(apiUrl("/missions"));
  return res.json();
};

export const getMission = async (
  missionId: string
): Promise<MissionResponse> => {
  const response = await fetch(apiUrl(`/missions/${missionId}`), {
    next: { tags: [`mission${missionId}`] }
  });
  return response.json();
};
