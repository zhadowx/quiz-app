export default function MainEl({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="main">{children}</main>;
}
