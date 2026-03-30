type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <p style={{ marginTop: "12px", color: "#b00020", fontWeight: 600 }}>
      {message}
    </p>
  );
}
