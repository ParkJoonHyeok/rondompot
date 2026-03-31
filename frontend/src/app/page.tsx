"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const LAST_FEATURE_STORAGE_KEY = "randompot:last-feature";
  const [lastFeature, setLastFeature] = useState<"roulette" | "punishment" | "mission" | "team" | null>(null);
  const [serviceLinkFeedback, setServiceLinkFeedback] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.sessionStorage.getItem(LAST_FEATURE_STORAGE_KEY);
    if (stored === "roulette" || stored === "punishment" || stored === "mission" || stored === "team") {
      setLastFeature(stored);
    }
  }, [LAST_FEATURE_STORAGE_KEY]);

  const featureMeta: Record<"roulette" | "punishment" | "mission" | "team", { label: string; href: string }> = {
    roulette: { label: "룰렛", href: "/roulette" },
    punishment: { label: "벌칙 뽑기", href: "/punishment" },
    mission: { label: "랜덤 미션", href: "/mission" },
    team: { label: "팀나누기", href: "/team" }
  };

  async function handleCopyServiceLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setServiceLinkFeedback("링크가 복사되었습니다.");
    } catch {
      setServiceLinkFeedback("링크 복사에 실패했습니다.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        boxSizing: "border-box",
        padding: "16px 14px 24px"
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "520px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "20px 16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: "10px", fontSize: "26px", lineHeight: 1.3 }}>랜덤팟 (RandomPot)</h1>
        <p style={{ marginTop: 0, marginBottom: "20px", color: "#555", lineHeight: 1.5 }}>
          친구, 모임, 술자리, 게임팟에서 바로 쓰는 캐주얼 랜덤 놀이 서비스입니다.
          <br />
          원하는 기능을 선택해 바로 시작하세요.
        </p>
        <button
          type="button"
          onClick={() => {
            void handleCopyServiceLink();
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
          서비스 링크 복사
        </button>
        {serviceLinkFeedback && (
          <p style={{ marginTop: 0, marginBottom: "12px", color: "#666", fontSize: "14px" }}>{serviceLinkFeedback}</p>
        )}
        {lastFeature && (
          <section
            style={{
              marginBottom: "16px",
              backgroundColor: "#f7f7f7",
              border: "1px solid #dcdcdc",
              borderRadius: "10px",
              padding: "12px"
            }}
          >
            <p style={{ margin: 0, color: "#444", fontSize: "14px", fontWeight: 700 }}>
              최근 사용한 기능
            </p>
            <p style={{ margin: "6px 0 0", color: "#666", fontSize: "14px" }}>
              {featureMeta[lastFeature].label}
            </p>
            <Link
              href={featureMeta[lastFeature].href}
              style={{
                display: "block",
                marginTop: "8px",
                textDecoration: "none",
                backgroundColor: "#111",
                color: "#fff",
                borderRadius: "8px",
                padding: "12px 14px",
                fontWeight: 700,
                minHeight: "46px",
                boxSizing: "border-box"
              }}
            >
              바로 이어서 시작하기
            </Link>
          </section>
        )}
        <h2 style={{ marginTop: 0, marginBottom: "10px", fontSize: "18px" }}>빠른 시작</h2>
        <div style={{ display: "grid", gap: "10px" }}>
          <Link
            href="/roulette"
            style={{
              display: "block",
              textDecoration: "none",
              backgroundColor: "#f8f8f8",
              color: "#111",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid #e6e6e6"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", minHeight: "46px" }}>
              <div>
                <p style={{ margin: 0, fontWeight: 700 }}>룰렛</p>
                <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>항목 중 1개를 랜덤으로 선택</p>
              </div>
              <span style={{ fontWeight: 700, color: "#333", whiteSpace: "nowrap" }}>룰렛 시작하기</span>
            </div>
          </Link>
          <Link
            href="/punishment"
            style={{
              display: "block",
              textDecoration: "none",
              backgroundColor: "#f8f8f8",
              color: "#111",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid #e6e6e6"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", minHeight: "46px" }}>
              <div>
                <p style={{ margin: 0, fontWeight: 700 }}>벌칙 뽑기</p>
                <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>벌칙 후보 중 1개를 랜덤 추첨</p>
              </div>
              <span style={{ fontWeight: 700, color: "#333", whiteSpace: "nowrap" }}>벌칙 뽑기 시작하기</span>
            </div>
          </Link>
          <Link
            href="/mission"
            style={{
              display: "block",
              textDecoration: "none",
              backgroundColor: "#f8f8f8",
              color: "#111",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid #e6e6e6"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", minHeight: "46px" }}>
              <div>
                <p style={{ margin: 0, fontWeight: 700 }}>랜덤 미션</p>
                <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>미션 후보 중 1개를 랜덤 선택</p>
              </div>
              <span style={{ fontWeight: 700, color: "#333", whiteSpace: "nowrap" }}>랜덤 미션 시작하기</span>
            </div>
          </Link>
          <Link
            href="/team"
            style={{
              display: "block",
              textDecoration: "none",
              backgroundColor: "#f8f8f8",
              color: "#111",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid #e6e6e6"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", minHeight: "46px" }}>
              <div>
                <p style={{ margin: 0, fontWeight: 700 }}>팀나누기</p>
                <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>참가자를 랜덤으로 팀 분배</p>
              </div>
              <span style={{ fontWeight: 700, color: "#333", whiteSpace: "nowrap" }}>팀나누기 시작하기</span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
