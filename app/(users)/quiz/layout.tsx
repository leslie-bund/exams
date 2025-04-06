export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <div>
          <h1 className="text-2xl font-bold">Quiz</h1>
          <p className="my-2 text-muted-foreground ">Take a quiz</p>
        </div>
      </div>
      {children}
    </>
  );
}
