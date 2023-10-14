import { h, FunctionalComponent } from "preact";
import { useState } from "preact/hooks";

interface SectionCardProps {
  title: string;
  icon: any;
  content: string;
  data: any[];
  selectedSections: any[];
  setSelectedSections: any;
  isSelectStage: boolean;
  handleCardData?: any;
}

const cardStyle = {
  height: "52px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "8px",
  borderRadius: "4px",
  backgroundColor: "#CDEBED",
  boxShadow: "0 0px 3px rgba(0, 0, 0, 0.1)",
};

const SectionCard: FunctionalComponent<SectionCardProps> = ({
  title,
  icon,
  content,
  data,
  selectedSections,
  setSelectedSections,
  isSelectStage,
  handleCardData,
}: SectionCardProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = (e: any) => {
    setSelectedSections([...selectedSections, { title, icon, content, data }]);
  };

  const cardData = { title, icon, content, data };

  return (
    <div
      className="section-card"
      style={cardStyle}
      onClick={isSelectStage ? handleClick : () => handleCardData(cardData)}
    >
      {icon}
      <h2>{title}</h2>
    </div>
  );
};

export default SectionCard;
