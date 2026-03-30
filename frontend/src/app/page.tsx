import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px"
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: "8px", fontSize: "24px" }}>랜덤팟</h1>
        <p style={{ marginTop: 0, marginBottom: "16px", color: "#555" }}>
          가볍게 쓰는 랜덤 놀이 서비스
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Link
            href="/roulette"
            style={{
              display: "inline-block",
              textDecoration: "none",
              backgroundColor: "#111",
              color: "#fff",
              padding: "10px 14px",
              borderRadius: "8px",
              fontWeight: 600
            }}
          >
            룰렛 시작하기
          </Link>
          <Link
            href="/punishment"
            style={{
              display: "inline-block",
              textDecoration: "none",
              backgroundColor: "#333",
              color: "#fff",
              padding: "10px 14px",
              borderRadius: "8px",
              fontWeight: 600
            }}
          >
            벌칙 시작하기
          </Link>
          <Link
            href="/mission"
            style={{
              display: "inline-block",
              textDecoration: "none",
              backgroundColor: "#555",
              color: "#fff",
              padding: "10px 14px",
              borderRadius: "8px",
              fontWeight: 600
            }}
          >
            미션 시작하기
          </Link>
          <Link
            href="/team"
            style={{
              display: "inline-block",
              textDecoration: "none",
              backgroundColor: "#777",
              color: "#fff",
              padding: "10px 14px",
              borderRadius: "8px",
              fontWeight: 600
            }}
          >
            팀나누기 시작하기
          </Link>
        </div>
      </section>
    </main>
  );
}
