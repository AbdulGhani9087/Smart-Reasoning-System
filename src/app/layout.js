import "./globals.css";

export const metadata = {
  title: "PlanWise AI",
  description: "Smart Reasoning Task Planner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
