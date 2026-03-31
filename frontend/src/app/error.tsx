"use client";

import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
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
        <h1 style={{ marginTop: 0, marginBottom: "10px", fontSize: "26px", lineHeight: 1.3 }}>
          문제가 발생했어요
        </h1>
        <p style={{ marginTop: 0, marginBottom: "18px", color: "#555", lineHeight: 1.5 }}>
          일시적인 오류일 수 있습니다.
          <br />
          잠시 후 다시 시도하거나 홈으로 이동해 주세요.
        </p>

        <div style={{ display: "grid", gap: "10px" }}>
          <button
            type="button"
            onClick={reset}
            style={{
              width: "100%",
              height: "46px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#111",
              color: "#fff",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer"
            }}
          >
            다시 시도
          </button>
          <Link
            href="/"
            style={{
              display: "block",
              textDecoration: "none",
              backgroundColor: "#f8f8f8",
              color: "#111",
              borderRadius: "8px",
              border: "1px solid #e6e6e6",
              padding: "12px 14px",
              fontWeight: 600,
              minHeight: "46px",
              boxSizing: "border-box"
            }}
          >
            홈으로 가기
          </Link>
          <Link
            href="/roulette"
            style={{
              display: "block",
              textDecoration: "none",
              backgroundColor: "#f8f8f8",
              color: "#111",
              borderRadius: "8px",
              border: "1px solid #e6e6e6",
              padding: "12px 14px",
              fontWeight: 600,
              minHeight: "46px",
              boxSizing: "border-box"
            }}
          >
            룰렛 바로가기
          </Link>
        </div>
      </section>
    </main>
  );
}
