import Section from "@/components/ui/Section";
import { content } from "@/data/DealData";
import { cn } from "@/lib/utils";
const Content = () => {
  return (
    <>
      {content.map(({ title, className }, index) => (
        <Section key={`section-a${index}`} className={cn("p-20", className)}>
          <h2 id={`section-a${index}`} className="fs-36">
            {title}
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptatibus, voluptatum aspernatur nesciunt tempora quas
            necessitatibus. Ratione, voluptates.
          </p>
        </Section>
      ))}
    </>
  );
};
export default Content;
