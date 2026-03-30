"use client";

import { FormEvent, useMemo, useState } from "react";
import { drawMission, type MissionDrawResponse } from "../../lib/api";
import ErrorMessage from "../../components/shared/ErrorMessage";
import ResultCard from "../../components/shared/ResultCard";

export default function MissionPage() {
  const [title, setTitle] = useState("술자리 미션");
  const [rawItems, setRawItems] = useState(
    "옆 사람 칭찬 3개 하기\n자기 흑역사 1개 말하기\n다음 판 존댓말만 쓰기"
  );
  const [result, setResult] = useState<MissionDrawResponse | null>(null);
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
      setError("항목은 2개 이상 입력해야 합니다.");
      return;
    }

    setLoading(true);
    try {
      const response = await drawMission({
        title: title.trim() || "랜덤 미션",
        items: cleanedItems
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
    <main style={{ padding: "16px", maxWidth: "520px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "12px" }}>미션</h1>
      <p style={{ marginTop: 0, color: "#555" }}>제목과 미션 항목을 입력해서 랜덤으로 1개를 뽑습니다.</p>

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
          placeholder="예: 술자리 미션"
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
          미션 항목 (한 줄에 하나씩)
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

        <p style={{ marginTop: 0, marginBottom: "12px", color: "#666", fontSize: "14px" }}>
          유효 항목 수: {cleanedItems.length}
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
          {loading ? "뽑는 중..." : "미션 뽑기"}
        </button>
      </form>

      <ErrorMessage message={error} />

      {result && (
        <ResultCard>
          <p style={{ margin: 0, color: "#666" }}>제목: {result.title}</p>
          <p style={{ marginTop: "8px", marginBottom: "8px", fontSize: "22px", fontWeight: 800 }}>
            결과: {result.selectedItem}
          </p>
          <p style={{ margin: 0, color: "#666" }}>총 항목 수: {result.totalItems}</p>
        </ResultCard>
      )}
    </main>
  );
}
