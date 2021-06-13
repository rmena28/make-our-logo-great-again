import React, { useEffect } from "react";
import MemoizedList from "../list/List";
import { IDraggableItem } from "../../model/IDraggableItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setGameEnded,
  setWrongPlacementPenalty,
} from "../../redux/actions/gameActions";
import useRandomSortedData from "../../hooks/useRandomSortedData";
import { GlobalStateDefinition } from "../../redux/rootReducer";
import { GameState } from "../../redux/reducers/gameReducer";
import "./GameContainer.css";
/**
 * Container to hold the draggable area.
 * @returns
 */
const GameContainer = () => {
  const dispatch = useDispatch();
  const { gameEnded } = useSelector<GlobalStateDefinition>(
    (state) => state.game
  ) as GameState;
  const {
    source: sourceList,
    setSource: setSourceList,
    destination,
    setDestination,
  } = useRandomSortedData(gameEnded === undefined ? false : gameEnded);
  useEffect(() => {
    if (destination) {
      //Validates that all are placed correctly.
      let list = destination.filter((item) => {
        if (item.id === 2 || item.id === 3)
          return item.image?.key === 2 || item.image?.key === 3;
        return item.id === item.image?.key;
      });

      if (list.length === 5) {
        dispatch(setGameEnded());
      }
    }
    return () => {};
  }, [destination]);
  /**
   * After an image/card is dropped, we trigger this event to
   * re-order the lists
   * @param fromHtmlId id where the card comes from.
   * @param toHtmlId  id where the card goes to.
   * @returns
   */
  const onItemDragged = (fromHtmlId: string, toHtmlId: string) => {
    if (fromHtmlId === toHtmlId) return;
    let fromOrigin: boolean = true;
    let sourceIndex: number = sourceList.findIndex(
      (item) => item.htmlId === fromHtmlId
    );
    fromOrigin = sourceIndex > -1;
    let destinationIndex: number = destination.findIndex(
      (item) => item.htmlId === toHtmlId
    );
    //Check if the image comes from the draggable area.
    if (fromOrigin) {
      let image = { ...sourceList[sourceIndex].image };
      let destinationOldImage: IDraggableItem = {
        ...destination[destinationIndex].image,
      };
      setDestination((value) => {
        let newDestination = [...value];
        newDestination[destinationIndex].image = image;
        return newDestination;
      });
      if (image?.key) {
        if (!isCorrectPlacement(image.key, destinationIndex))
          dispatch(setWrongPlacementPenalty());
      }
      setSourceList((value) => {
        let newSource = [...value];
        newSource[sourceIndex].image = destinationOldImage;
        return newSource;
      });
    } else {
      //Enters here if the cards are being re-ordered after being dropped.
      sourceIndex = destination.findIndex((item) => item.htmlId === fromHtmlId);
      let image = { ...destination[sourceIndex].image };
      let destinationOldImage: IDraggableItem = {
        ...destination[destinationIndex].image,
      };
      if (image?.key) {
        if (!isCorrectPlacement(image.key, destinationIndex))
          dispatch(setWrongPlacementPenalty());
      }

      setDestination((value) => {
        let newDestination = [...value];
        newDestination[destinationIndex].image = image;
        newDestination[sourceIndex].image = destinationOldImage;
        return newDestination;
      });
    }
  };

  const isCorrectPlacement = (
    imageIndex: number,
    containerIndex: number
  ): boolean => {
    //O letters can be placed in 2 or 3
    if (
      destination[containerIndex].id === 2 ||
      destination[containerIndex].id === 3
    ) {
      return imageIndex === 2 || imageIndex === 3;
    }

    return destination[containerIndex].id === imageIndex;
  };
  return (
    <>
      <label className="label-message">pick an item from here</label>
      <MemoizedList onItemDragged={onItemDragged} items={sourceList} />
      <label className="label-message">Then drag it here</label>
      <MemoizedList onItemDragged={onItemDragged} items={destination} />
    </>
  );
};
export default GameContainer;
