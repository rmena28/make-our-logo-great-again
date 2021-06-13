import { IDraggableItem } from "./IDraggableItem";
interface IContainer {
  id: number;
  htmlId: string;
  type: "source" | "destination";
  image?: IDraggableItem;
}
export default IContainer;
