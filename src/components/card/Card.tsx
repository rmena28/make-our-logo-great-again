import { FC } from "react";
import IContainer from "../../model/IContainer";
import "./Card.css";
type CardProps = {
  containerInformation: IContainer;
  onDragStart: (event: React.DragEvent) => void;
};

/**
 * Draggable Card.
 * @param param0
 * @returns
 */
const Card: FC<CardProps> = ({ containerInformation, onDragStart }) => {
  return (
    <div
      draggable
      onTouchStart={event=>console.log(event)}
      onDragStart={onDragStart}
      onDragEnd={(event) => event.stopPropagation()}
      className="card"
    >
      {containerInformation?.image?.logo &&
      containerInformation?.image?.logo !== "" ? (
        <img
          className="image"
          id={
            containerInformation?.image?.id ||
            `${containerInformation.htmlId}-img`
          }
          alt={containerInformation.image?.logo || "image"}
          src={containerInformation?.image?.logo}
        />
      ) : null}
    </div>
  );
};

// const CardMemoizedCad = React.memo<CardProps>(Card);

export default Card;
