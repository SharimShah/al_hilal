const Section = ({ id = "", className, children }) => {
  const prefix = Math.random().toString(36).slice(7) + "-";
  return (
    <section id={id} className={className}>
      <div className="container-auto-md min-h-300 py-20">{children}</div>
    </section>
  );
};
export default Section;
