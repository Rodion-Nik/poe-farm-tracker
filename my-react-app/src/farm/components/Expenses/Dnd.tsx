import type { ReactNode } from "react";
import { useDroppable, useDraggable } from "@dnd-kit/core";

export const DROP_ZONE_ID = "Droppable";

export function Droppable({ children }: { children: ReactNode }) {
    const { isOver, setNodeRef } = useDroppable({ id: DROP_ZONE_ID });

    return (
        <div
            className="expenses-droppable"
            ref={setNodeRef}
            style={{ color: isOver ? "green" : undefined }}
        >
            {children}
        </div>
    );
}

type DraggableProps = {
    id: string;
    children: ReactNode;
};

export function Draggable({ id, children }: DraggableProps) {
    const { attributes, listeners, setNodeRef } = useDraggable({ id });

    return (
        <div ref={setNodeRef} {...listeners} {...attributes}>
            {children}
        </div>
    );
}