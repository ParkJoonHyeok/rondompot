import Link from "next/link";

export default function NotFoundPage() {
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
          페이지를 찾을 수 없어요
        </h1>
        <p style={{ marginTop: 0, marginBottom: "18px", color: "#555", lineHeight: 1.5 }}>
          주소가 잘못되었거나 이동된 페이지일 수 있습니다.
          <br />
          홈이나 원하는 기능으로 바로 이동해 주세요.
        </p>

        <div style={{ display: "grid", gap: "10px" }}>
          <Link
            href="/"
            style={{
              display: "block",
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
          <Link
            href="/punishment"
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
            벌칙 뽑기 바로가기
          </Link>
          <Link
            href="/mission"
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
            랜덤 미션 바로가기
          </Link>
          <Link
            href="/team"
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
            팀나누기 바로가기
          </Link>
        </div>
      </section>
    </main>
  );
}
