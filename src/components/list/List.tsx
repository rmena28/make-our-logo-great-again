import MemoizedCard from "../card-holder/CardHolder";
import "./List.css";
import IContainer from "../../model/IContainer";
import React from "react";

type GameRowProps = {
  items: Array<IContainer>;
  onItemDragged: (fromHtmlId: string, toHtmlId: string) => void;
};
/**
 * This component renders a row with cards.
 * @param param0 
 * @returns 
 */
const List: React.FC<GameRowProps> = ({ items, onItemDragged }) => {
  return (
    <div className="list">
      {items.map((item, index) => {
        return (
          <MemoizedCard
            onItemDragged={onItemDragged}
            key={item.htmlId}
            containerInformation={item}
          ></MemoizedCard>
        );
      })}
    </div>
  );
};

const MemoizedList = React.memo(List);
export default MemoizedList;
