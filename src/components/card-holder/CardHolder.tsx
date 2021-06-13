import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import IContainer from "../../model/IContainer";
import { setGameStart } from "../../redux/actions/gameActions";
import { GlobalStateDefinition } from "../../redux/rootReducer";
import "./CardHolder.css";
import Card from "../card/Card";
import { GameState } from "../../redux/reducers/gameReducer";
type CardProps = {
  containerInformation: IContainer;
  onItemDragged: (fromId: string, to: string) => void;
};

/**
 * Component to hold the images. It supports Drop
 * @param param0
 * @returns
 */
const CardHolder: React.FC<CardProps> = ({
  containerInformation,
  onItemDragged,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // const imageRef = useRef<HTMLImageElement | null>(null);
  const {started} = useSelector<GlobalStateDefinition>(
    (state) => state.game
  ) as GameState;
  const dispatch = useDispatch();
  const handleDragStart = (event: React.DragEvent) => {
    if (!started) {
      dispatch(setGameStart());
    }
    event.dataTransfer?.clearData();
    event.dataTransfer?.setData(
      "originInformation",
      JSON.stringify(containerInformation)
    );
  };

  const handleDrop = (event: React.DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
    
    if (containerInformation.htmlId.indexOf("source") > -1) return;
    let sourceContainer: IContainer;
    try {
      sourceContainer = JSON.parse(
        event.dataTransfer?.getData("originInformation") || ""
      );
      if(sourceContainer.type==="source" && containerInformation.image?.logo) return; 
      onItemDragged(sourceContainer.htmlId, containerInformation.htmlId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      ref={containerRef}
      id={containerInformation.htmlId}
      className={`card-holder ${
        !containerInformation?.image?.logo &&
        containerInformation.type === "destination"
          ? "card-holder-empty"
          : null
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {containerInformation?.image?.logo &&
      containerInformation?.image?.logo !== "" ? (
        <Card
          containerInformation={containerInformation}
          onDragStart={handleDragStart}
        />
      ) : null}
    </div>
  );
};

const MemoizedCardHolder = React.memo<CardProps>(CardHolder);

export default MemoizedCardHolder;
