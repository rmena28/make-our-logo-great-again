import { useEffect, useState } from "react";
import { letterO, letterU, letterV, letterZ } from "../images";
import IContainer from "../model/IContainer";


/**
 * Custom hook to generate 2 lists.
 * Source: This holds the initial cards (with the letters of the logo).
 * Destination: This is the final placement of the cards.
 * It has a random sort for the initial data.
 *
 * @returns A pair of two state properties to allow modification of these list.
 */
export default function useRandomSortedData(gameEnded: boolean) {
  const [source, setSource] = useState<IContainer[]>([]);
  const [destination, setDestination] =
    useState<IContainer[]>([]);
  console.log("Game ended", gameEnded);
  useEffect(() => {
    if (!gameEnded) {
      console.log("Game ended here");
      const randomSort = (list: IContainer[]) => {
        return [
          ...list.sort(() => {
            return Math.random() - 0.5;
          }),
        ];
      };

      const initialDataTarget: Array<IContainer> = [
        { id: 1, htmlId: "empty-1-z", type: "destination" },
        { id: 2, htmlId: "empty-2-o", type: "destination" },
        { id: 3, htmlId: "empty-3-o", type: "destination" },
        { id: 4, htmlId: "empty-4-v", type: "destination" },
        { id: 5, htmlId: "empty-5-u", type: "destination" },
      ];
      
      let gameItemDataLogo = randomSort([
        {
          htmlId: "source-1",
          id: 1,
          type: "source",
          image: { key: 1, id: "logo-1", logo: letterZ },
        },
        {
          htmlId: "source-2",
          id: 2,
          type: "source",
          image: { key: 2, id: "logo-2", logo: letterO },
        },
        {
          htmlId: "source-3",
          id: 3,
          type: "source",
          image: { key: 3, id: "logo-3", logo: letterO },
        },
        {
          htmlId: "source-4",
          id: 4,
          type: "source",
          image: { key: 4, id: "logo-4", logo: letterV },
        },
        {
          htmlId: "source-5",
          id: 5,
          type: "source",
          image: { key: 5, id: "logo-5", logo: letterU },
        },
      ]);
      setSource(gameItemDataLogo);
      setDestination([...initialDataTarget]);
    }
  }, [gameEnded]);

  return { source, setSource, destination, setDestination };
}
