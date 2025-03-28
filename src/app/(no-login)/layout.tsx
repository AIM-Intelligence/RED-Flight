import Nav from '@/components/Nav';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Nav />
      {children}
    </main>
  );
};

export default layout;
