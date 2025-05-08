// Встроенные стили для основных компонентов
export const inlineStyles = {
  body: {
    fontFamily: "'Space Grotesk', sans-serif",
    background: "linear-gradient(135deg, #0a0a14, #141428)",
    color: "#f0f0f2",
    margin: 0,
    padding: 0,
    minHeight: "100vh",
    position: "relative",
    lineHeight: 1.6,
    overflowX: "hidden"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
    position: "relative",
    zIndex: 2
  },
  card: {
    backgroundColor: "rgba(10, 10, 20, 0.8)",
    borderRadius: "0.5rem",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    padding: "1.75rem",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(12px)",
    marginBottom: "2.5rem",
    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
    position: "relative",
    overflow: "hidden"
  },
  heading: {
    fontSize: "3.5rem",
    fontWeight: 700,
    textAlign: "center",
    margin: "0.75rem 0",
    background: "linear-gradient(to right, #ff3864, #f9c80e, #2de2e6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  subheading: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "1rem",
    color: "#2de2e6"
  },
  paragraph: {
    color: "#b8b8c0",
    marginBottom: "1rem"
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.75rem 1.75rem",
    borderRadius: "9999px",
    fontWeight: 600,
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    textAlign: "center",
    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    border: "none",
    zIndex: 1
  },
  primaryButton: {
    background: "linear-gradient(135deg, #ff3864, #ff5e5e)",
    color: "white",
    boxShadow: "0 5px 15px rgba(255, 56, 100, 0.3)"
  },
  secondaryButton: {
    background: "linear-gradient(135deg, #2de2e6, #4dffff)",
    color: "white",
    boxShadow: "0 5px 15px rgba(45, 226, 230, 0.3)"
  },
  neonLine: {
    position: "absolute",
    height: "1px",
    width: "100%",
    background: "linear-gradient(135deg, #ff3864, #ff5e5e)",
    opacity: 0.6,
    boxShadow: "0 0 10px rgba(255, 56, 100, 0.5), 0 0 20px rgba(255, 56, 100, 0.3)",
    zIndex: 1
  },
  neonLineTop: {
    top: 0
  },
  neonLineBottom: {
    bottom: 0
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  flexCol: {
    display: "flex",
    flexDirection: "column"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
    width: "100%"
  },
  totemImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
  },
  aspectSquare: {
    aspectRatio: "1/1",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "rgba(20, 20, 40, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

// Медиа-запросы для адаптивности
export const mediaQueries = {
  sm: "@media (min-width: 640px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 1024px)",
  xl: "@media (min-width: 1280px)"
};
