"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { splitTeam, type TeamSplitResponse } from "../../lib/api";
import ErrorMessage from "../../components/shared/ErrorMessage";
import ResultCard from "../../components/shared/ResultCard";

type TeamHistoryItem = {
  id: string;
  title: string;
  text: string;
  preview: string;
  createdAt: number;
};

export default function TeamPage() {
  const FORM_STORAGE_KEY = "randompot:team:form";
  const HISTORY_STORAGE_KEY = "randompot:team:history";
  const LAST_FEATURE_STORAGE_KEY = "randompot:last-feature";
  const [title, setTitle] = useState("롤 내전");
  const [rawItems, setRawItems] = useState("준혁\n민수\n지훈\n수빈\n현우\n예린");
  const [teamCount, setTeamCount] = useState(2);
  const [result, setResult] = useState<TeamSplitResponse | null>(null);
  const [history, setHistory] = useState<TeamHistoryItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");
  const [pageLinkFeedback, setPageLinkFeedback] = useState("");
  const titleInputId = "team-title";
  const participantsTextareaId = "team-participants";
  const participantsHintId = "team-participants-hint";
  const teamCountInputId = "team-count";

  const cleanedItems = useMemo(
    () =>
      rawItems
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0),
    [rawItems]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.sessionStorage.setItem(LAST_FEATURE_STORAGE_KEY, "team");
  }, [LAST_FEATURE_STORAGE_KEY]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.sessionStorage.getItem(FORM_STORAGE_KEY);
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as { title?: string; rawItems?: string; teamCount?: number };
      if (typeof parsed.title === "string") {
        setTitle(parsed.title);
      }
      if (typeof parsed.rawItems === "string") {
        setRawItems(parsed.rawItems);
      }
      if (typeof parsed.teamCount === "number" && Number.isFinite(parsed.teamCount)) {
        setTeamCount(parsed.teamCount);
      }
    } catch {
      // Ignore invalid session payload.
    }
  }, [FORM_STORAGE_KEY]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const nextForm = JSON.stringify({
      title,
      rawItems,
      teamCount
    });
    if (window.sessionStorage.getItem(FORM_STORAGE_KEY) !== nextForm) {
      window.sessionStorage.setItem(FORM_STORAGE_KEY, nextForm);
    }
  }, [FORM_STORAGE_KEY, title, rawItems, teamCount]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.sessionStorage.getItem(HISTORY_STORAGE_KEY);
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as TeamHistoryItem[];
      if (Array.isArray(parsed)) {
        setHistory(parsed);
      }
    } catch {
      // Ignore invalid history payload.
    }
  }, [HISTORY_STORAGE_KEY]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const nextHistory = JSON.stringify(history);
    if (window.sessionStorage.getItem(HISTORY_STORAGE_KEY) !== nextHistory) {
      window.sessionStorage.setItem(HISTORY_STORAGE_KEY, nextHistory);
    }
  }, [HISTORY_STORAGE_KEY, history]);

  function buildResultText(value: TeamSplitResponse) {
    const lines = ["[랜덤팟 팀나누기]"];
    if (value.title.trim()) {
      lines.push(`주제: ${value.title}`);
    }
    value.teams.forEach((team, index) => {
      lines.push(`${index + 1}팀: ${team.members.join(", ")}`);
    });
    return lines.join("\n");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setError("");
    setResult(null);
    setCopyFeedback("");

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
      const text = buildResultText(response);
      const previewLines = text.split("\n");
      const preview = previewLines.length > 3 ? `${previewLines.slice(0, 3).join(" / ")} ...` : previewLines.join(" / ");
      setHistory((prev) => [
        {
          id: `${Date.now()}`,
          title: response.title,
          text,
          preview,
          createdAt: Date.now()
        },
        ...prev
      ].slice(0, 5));
    } catch (e) {
      const message = e instanceof Error ? e.message : "요청 처리 중 오류가 발생했습니다.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCopyResult() {
    if (!result) {
      return;
    }

    try {
      await navigator.clipboard.writeText(buildResultText(result));
      setCopyFeedback("복사되었습니다.");
    } catch {
      setCopyFeedback("복사에 실패했습니다.");
    }
  }

  async function handleShareResult() {
    if (!result || typeof navigator.share !== "function") {
      return;
    }

    try {
      await navigator.share({
        title: "랜덤팟 팀나누기 결과",
        text: buildResultText(result)
      });
      setCopyFeedback("공유되었습니다.");
    } catch {
      setCopyFeedback("공유에 실패했습니다.");
    }
  }

  async function handleCopyHistory(item: TeamHistoryItem) {
    try {
      await navigator.clipboard.writeText(item.text);
      setCopyFeedback("복사되었습니다.");
    } catch {
      setCopyFeedback("복사에 실패했습니다.");
    }
  }

  async function handleShareHistory(item: TeamHistoryItem) {
    if (typeof navigator.share !== "function") {
      return;
    }
    try {
      await navigator.share({
        title: "랜덤팟 팀나누기 결과",
        text: item.text
      });
      setCopyFeedback("공유되었습니다.");
    } catch {
      setCopyFeedback("공유에 실패했습니다.");
    }
  }

  async function handleCopyPageLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setPageLinkFeedback("링크가 복사되었습니다.");
    } catch {
      setPageLinkFeedback("링크 복사에 실패했습니다.");
    }
  }

  function handleRemoveHistory(id: string) {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }

  function handleClearHistory() {
    setHistory([]);
  }

  return (
    <main style={{ width: "100%", boxSizing: "border-box", padding: "16px 14px 24px", maxWidth: "560px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "14px" }}>팀나누기</h1>
      <p style={{ marginTop: 0, color: "#555" }}>참가자와 팀 수를 입력하면 랜덤으로 팀을 나눌 수 있어요.</p>
      <button
        type="button"
        onClick={() => {
          void handleCopyPageLink();
        }}
        style={{
          width: "100%",
          height: "46px",
          marginBottom: "8px",
          border: "1px solid #d9d9d9",
          borderRadius: "8px",
          backgroundColor: "#fff",
          color: "#333",
          fontWeight: 600,
          fontSize: "15px",
          cursor: "pointer"
        }}
      >
        페이지 링크 복사
      </button>
      {pageLinkFeedback && (
        <p style={{ marginTop: 0, marginBottom: "12px", color: "#666", fontSize: "14px" }}>{pageLinkFeedback}</p>
      )}

      <form
        onSubmit={handleSubmit}
        aria-busy={loading}
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "18px 16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
        }}
      >
        <label htmlFor={titleInputId} style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
          제목
        </label>
        <input
          id={titleInputId}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예: 롤 내전"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="sentences"
          spellCheck={false}
          style={{
            width: "100%",
            height: "46px",
            padding: "10px 12px",
            marginBottom: "16px",
            border: "1px solid #d9d9d9",
            borderRadius: "8px",
            boxSizing: "border-box"
          }}
        />

        <label htmlFor={participantsTextareaId} style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
          참가자 (한 줄에 한 명씩)
        </label>
        <p id={participantsHintId} style={{ marginTop: 0, marginBottom: "8px", color: "#666", fontSize: "13px" }}>
          참가자는 줄바꿈으로 구분해 입력해 주세요.
        </p>
        <textarea
          id={participantsTextareaId}
          aria-describedby={participantsHintId}
          value={rawItems}
          onChange={(e) => setRawItems(e.target.value)}
          placeholder={"예)\n준혁\n민수\n지훈\n수빈"}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          rows={6}
          style={{
            width: "100%",
            minHeight: "132px",
            padding: "10px 12px",
            border: "1px solid #d9d9d9",
            borderRadius: "8px",
            boxSizing: "border-box",
            lineHeight: 1.5,
            marginBottom: "16px"
          }}
        />

        <label htmlFor={teamCountInputId} style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
          팀 수
        </label>
        <input
          id={teamCountInputId}
          type="number"
          min={2}
          value={teamCount}
          onChange={(e) => setTeamCount(Number(e.target.value))}
          placeholder="예: 2"
          inputMode="numeric"
          pattern="[0-9]*"
          style={{
            width: "100%",
            height: "46px",
            padding: "10px 12px",
            marginBottom: "16px",
            border: "1px solid #d9d9d9",
            borderRadius: "8px",
            boxSizing: "border-box"
          }}
        />

        <p style={{ marginTop: 0, marginBottom: "16px", color: "#666", fontSize: "14px" }}>
          유효 참가자 수: {cleanedItems.length}
        </p>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            height: "46px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: loading ? "#999" : "#111",
            color: "#fff",
            fontWeight: 700,
            fontSize: "16px",
            cursor: loading ? "default" : "pointer"
          }}
        >
          {loading ? "팀 나누는 중..." : "팀 나누기"}
        </button>
      </form>

      <div aria-live="polite">
        <ErrorMessage message={error} />
      </div>

      {result && (
        <ResultCard>
          <div aria-live="polite">
          <p style={{ margin: 0, color: "#666" }}>제목: {result.title}</p>
          <p style={{ marginTop: "10px", marginBottom: "14px", color: "#666" }}>
            팀 수: {result.teamCount}
          </p>
          {result.teams.map((team) => (
            <div key={team.teamName} style={{ marginBottom: "14px" }}>
              <p
                style={{
                  margin: 0,
                  fontWeight: 800,
                  fontSize: "20px",
                  lineHeight: 1.35,
                  wordBreak: "break-word",
                  overflowWrap: "anywhere"
                }}
              >
                {team.teamName}
              </p>
              <p
                style={{
                  marginTop: "6px",
                  marginBottom: 0,
                  color: "#444",
                  lineHeight: 1.5,
                  wordBreak: "break-word",
                  overflowWrap: "anywhere"
                }}
              >
                {team.members.join(", ")}
              </p>
            </div>
          ))}
          {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
            <button
              type="button"
              onClick={() => {
                void handleShareResult();
              }}
              style={{
                width: "100%",
                height: "46px",
                marginTop: "10px",
                border: "1px solid #d9d9d9",
                borderRadius: "8px",
                backgroundColor: "#fff",
                color: "#111",
                fontWeight: 700,
                fontSize: "15px",
                cursor: "pointer"
              }}
            >
              공유하기
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              void handleCopyResult();
            }}
            style={{
              width: "100%",
              height: "46px",
              marginTop: typeof navigator !== "undefined" && typeof navigator.share === "function" ? "8px" : "10px",
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
              backgroundColor: "#fff",
              color: "#111",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer"
            }}
          >
            결과 복사
          </button>
          {copyFeedback && (
            <p style={{ marginTop: "8px", marginBottom: 0, color: "#555", fontSize: "14px" }}>{copyFeedback}</p>
          )}
          </div>
        </ResultCard>
      )}

      {history.length > 0 && (
        <section style={{ marginTop: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "10px" }}>
            <h2 style={{ margin: 0, fontSize: "18px" }}>최근 결과</h2>
            <button
              type="button"
              onClick={handleClearHistory}
              style={{
                height: "36px",
                padding: "0 12px",
                border: "1px solid #d9d9d9",
                borderRadius: "8px",
                backgroundColor: "#fff",
                color: "#555",
                fontWeight: 600
              }}
            >
              전체 비우기
            </button>
          </div>
          {history.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "12px",
                marginBottom: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)"
              }}
            >
              <p style={{ margin: 0, color: "#666", fontSize: "13px" }}>
                {new Date(item.createdAt).toLocaleTimeString()}
              </p>
              <p
                style={{
                  marginTop: "6px",
                  marginBottom: "10px",
                  fontWeight: 700,
                  wordBreak: "break-word",
                  overflowWrap: "anywhere"
                }}
              >
                {item.preview}
              </p>
              {typeof navigator !== "undefined" && typeof navigator.share === "function" ? (
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      void handleCopyHistory(item);
                    }}
                    style={{
                      flex: 1,
                      height: "42px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontWeight: 600
                    }}
                  >
                    복사
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      void handleShareHistory(item);
                    }}
                    style={{
                      flex: 1,
                      height: "42px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontWeight: 600
                    }}
                  >
                    공유
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleRemoveHistory(item.id);
                    }}
                    style={{
                      height: "42px",
                      padding: "0 12px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      color: "#666",
                      fontWeight: 600
                    }}
                  >
                    삭제
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      void handleCopyHistory(item);
                    }}
                    style={{
                      flex: 1,
                      height: "42px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontWeight: 600
                    }}
                  >
                    복사
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleRemoveHistory(item.id);
                    }}
                    style={{
                      height: "42px",
                      padding: "0 12px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      color: "#666",
                      fontWeight: 600
                    }}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
