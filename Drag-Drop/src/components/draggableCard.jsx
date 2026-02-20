import { useState } from "react";

function DraggableCard({ card, updateCard }) {
    const [resizing, setResizing] = useState(false);


    const handleDragStart = (e) => {
        if (resizing) {
            e.preventDefault();
            return;
        }
        e.dataTransfer.setData("moveId", card.id);
    };

    const handleDrop = (e) => {
        e.preventDefault();

        const id  = e.dataTransfer.getData("moveId");
        if (!id) return;

        const rect = e.currentTarget.parentElement.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        updateCard(id,{ x, y });
    };

    const startResize = (e) => {
        e.stopPropagation();
        setResizing(true);
    };


    const handleMouseMove = (e) => {
        if (!resizing) return;

        updateCard(card.docId, {
            width: card.width + e.movementX,
            height: card.height + e.movementY,
        });
    };

    const handleMouseUp = () => setResizing(false);

    const rotate = (e) => {
        e.stopPropagation();
        updateCard(card.docId, {
            rotation: card.rotation + 15,
        });
    };

    return (
        <div
            draggable={!resizing}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
                position: "absolute",
                left: card.x,
                top: card.y,
                width: "100px",
                height: "100px",
                background: "lighblue",
                border: "1px solid black",
                cursor: "grab",
                transform: `rotate(${card.rotation}deg)`,
            }}
        >
            {card.id}

            {}
            <button
                onClick={rotate}
                style={{ position: "absolute", top: -20 }}
            >
                ⟳
            </button>

            {}
            <div
                onMouseDown={startResize}
                style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 10,
                    height: 10,
                    background: "black",
                    cursor: "nwse-resize",
                }}
            />
        </div>
    );
}

export default DraggableCard;