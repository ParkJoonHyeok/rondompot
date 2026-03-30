"use client";

import { FormEvent, useMemo, useState } from "react";
import { splitTeam, type TeamSplitResponse } from "../../lib/api";
import ErrorMessage from "../../components/shared/ErrorMessage";
import ResultCard from "../../components/shared/ResultCard";

export default function TeamPage() {
  const [title, setTitle] = useState("롤 내전");
  const [rawItems, setRawItems] = useState("준혁\n민수\n지훈\n수빈\n현우\n예린");
  const [teamCount, setTeamCount] = useState(2);
  const [result, setResult] = useState<TeamSplitResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const cleanedItems = useMemo(
    () =>
      rawItems
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0),
    [rawItems]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    if (cleanedItems.length < 2) {
      setError("참가자는 2명 이상 입력해야 합니다.");
      return;
    }

    if (teamCount < 2) {
      setError("팀 수는 2 이상이어야 합니다.");
      return;
    }

    if (teamCount > cleanedItems.length) {
      setError("팀 수는 참가자 수를 초과할 수 없습니다.");
      return;
    }

    setLoading(true);
    try {
      const response = await splitTeam({
        title: title.trim() || "팀 나누기",
        items: cleanedItems,
        teamCount
      });
      setResult(response);
    } catch (e) {
      const message = e instanceof Error ? e.message : "요청 처리 중 오류가 발생했습니다.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "16px", maxWidth: "560px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "12px" }}>팀나누기</h1>
      <p style={{ marginTop: 0, color: "#555" }}>참가자와 팀 수를 입력하면 랜덤으로 균등 분배합니다.</p>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
        }}
      >
        <label style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예: 롤 내전"
          style={{
            width: "100%",
            height: "40px",
            padding: "8px 10px",
            marginBottom: "12px",
            border: "1px solid #d9d9d9",
            borderRadius: "8px",
            boxSizing: "border-box"
          }}
        />

        <label style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>
          참가자 (한 줄에 한 명씩)
        </label>
        <textarea
          value={rawItems}
          onChange={(e) => setRawItems(e.target.value)}
          rows={8}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #d9d9d9",
            borderRadius: "8px",
            boxSizing: "border-box",
            marginBottom: "8px"
          }}
        />

        <label style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>팀 수</label>
        <input
          type="number"
          min={2}
          value={teamCount}
          onChange={(e) => setTeamCount(Number(e.target.value))}
          style={{
            width: "100%",
            height: "40px",
            padding: "8px 10px",
            marginBottom: "12px",
            border: "1px solid #d9d9d9",
            borderRadius: "8px",
            boxSizing: "border-box"
          }}
        />

        <p style={{ marginTop: 0, marginBottom: "12px", color: "#666", fontSize: "14px" }}>
          유효 참가자 수: {cleanedItems.length}
        </p>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            height: "42px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: loading ? "#999" : "#111",
            color: "#fff",
            fontWeight: 700,
            cursor: loading ? "default" : "pointer"
          }}
        >
          {loading ? "나누는 중..." : "팀 나누기"}
        </button>
      </form>

      <ErrorMessage message={error} />

      {result && (
        <ResultCard>
          <p style={{ margin: 0, color: "#666" }}>제목: {result.title}</p>
          <p style={{ marginTop: "6px", marginBottom: "12px", color: "#666" }}>
            팀 수: {result.teamCount}
          </p>
          {result.teams.map((team) => (
            <div key={team.teamName} style={{ marginBottom: "10px" }}>
              <p style={{ margin: 0, fontWeight: 700 }}>{team.teamName}</p>
              <p style={{ marginTop: "4px", marginBottom: 0, color: "#444" }}>
                {team.members.join(", ")}
              </p>
            </div>
          ))}
        </ResultCard>
      )}
    </main>
  );
}
