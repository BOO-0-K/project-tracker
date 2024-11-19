import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";
import { ItemType } from "../atoms";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

interface IDrag {
    fromIndex: number;
    toIndex: number;
}

interface IDraggableCardProps {
    toDo: string;
    index: number;
    onDragEnd: (args: IDrag) => void;
}

function DraggableCard({ toDo, index, onDragEnd }: IDraggableCardProps) {
    const [, drag] = useDrag({
        type: ItemType.CARD,
        item: { index },
    });
    
      const [, drop] = useDrop({
        accept: ItemType.CARD,
        drop(item: { index: number }) {
          if (item.index !== index) {
            onDragEnd({ fromIndex: item.index, toIndex: index });
          }
        },
    });
    
      return (
        <Card ref={(node) => drag(drop(node))}>
          {toDo}
        </Card>
    );
}

export default DraggableCard;