const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="page relative font-sora text-white">
      <div className="h-full">
        <div className="h-full">{children}</div>
      </div>
    </main>
  );
};

export default layout;
