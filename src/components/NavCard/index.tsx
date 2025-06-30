type NavCardProps = {
  icon: React.ReactNode;
  title: string;
};

function NavCard({ icon, title }: NavCardProps) {
  return (
    <>
      {icon}
      <h2>{title}</h2>
    </>
  );
}

export default NavCard;
