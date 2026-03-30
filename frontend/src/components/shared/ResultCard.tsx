import type { ReactNode } from "react";

type ResultCardProps = {
  children: ReactNode;
};

export default function ResultCard({ children }: ResultCardProps) {
  return (
    <section
      style={{
        marginTop: "12px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
      }}
    >
      {children}
    </section>
  );
}
