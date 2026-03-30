"use client";

import { useMemo, useState } from "react";
import { drawPunishment, type PunishmentDrawResponse } from "../../lib/api";
import ErrorMessage from "../../components/shared/ErrorMessage";
import ResultCard from "../../components/shared/ResultCard";

export default function PunishmentPage() {
  const [title, setTitle] = useState("술자리 벌칙");
  const [rawItems, setRawItems] = useState("노래 1절 부르기\n음료수 사기\n애교 하기");
  const [result, setResult] = useState<PunishmentDrawResponse | null>(null);
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

  async function handleDraw() {
    setError("");
    setResult(null);

    if (cleanedItems.length < 2) {
      setError("항목은 2개 이상 입력해야 합니다.");
      return;
    }

    setLoading(true);
    try {
      const response = await drawPunishment({
        title: title.trim() || "랜덤 벌칙",
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
      <h1 style={{ marginBottom: "12px" }}>벌칙</h1>
      <p style={{ marginTop: 0, color: "#555" }}>제목과 벌칙 항목을 입력해서 랜덤으로 1개를 뽑습니다.</p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void handleDraw();
        }}
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
          placeholder="예: 술자리 벌칙"
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
          벌칙 항목 (한 줄에 하나씩)
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
          type="button"
          onClick={() => {
            void handleDraw();
          }}
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
          {loading ? "뽑는 중..." : "벌칙 뽑기"}
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
