export type RouletteSpinRequest = {
  title: string;
  items: string[];
};

export type RouletteSpinResponse = {
  title: string;
  selectedItem: string;
  totalItems: number;
};

export type PunishmentDrawRequest = {
  title: string;
  items: string[];
};

export type PunishmentDrawResponse = {
  title: string;
  selectedItem: string;
  totalItems: number;
};

export type MissionDrawRequest = {
  title: string;
  items: string[];
};

export type MissionDrawResponse = {
  title: string;
  selectedItem: string;
  totalItems: number;
};

export type TeamSplitRequest = {
  title: string;
  items: string[];
  teamCount: number;
};

export type TeamGroup = {
  teamName: string;
  members: string[];
};

export type TeamSplitResponse = {
  title: string;
  teamCount: number;
  teams: TeamGroup[];
};

// Vercel/production should provide NEXT_PUBLIC_API_BASE_URL.
// Fallback keeps local development unchanged.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function spinRoulette(
  payload: RouletteSpinRequest
): Promise<RouletteSpinResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/roulette/spin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error("룰렛 실행에 실패했습니다. 입력값을 확인해 주세요.");
  }
  return (await response.json()) as RouletteSpinResponse;
}

export async function drawPunishment(
  payload: PunishmentDrawRequest
): Promise<PunishmentDrawResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/punishment/draw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error("벌칙 뽑기에 실패했습니다. 입력값을 확인해 주세요.");
  }
  return (await response.json()) as PunishmentDrawResponse;
}

export async function drawMission(
  payload: MissionDrawRequest
): Promise<MissionDrawResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/mission/draw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error("미션 뽑기에 실패했습니다. 입력값을 확인해 주세요.");
  }
  return (await response.json()) as MissionDrawResponse;
}

export async function splitTeam(
  payload: TeamSplitRequest
): Promise<TeamSplitResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/team/split`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error("팀 나누기에 실패했습니다. 입력값을 확인해 주세요.");
  }
  return (await response.json()) as TeamSplitResponse;
}
