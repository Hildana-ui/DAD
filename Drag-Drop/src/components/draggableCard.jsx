import { useState, useEffect } from "react";

function DraggableCard({ card, updateCard, setSelectedId, selectedId, deleteCard, addCard, }) {
    const [dragging, setDragging] = useState(false);

    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleDragStart = (e) => {
        e.stopPropagation();
        setSelectedId(card.docId);

        const rect = e.currentTarget.getBoundingClientRect();

        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top, 
        });

        setDragging(true);
    };

    useEffect(() => {
        const handleMove = (e) => {
            if (!dragging) return;

            updateCard(card.docId, {
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            });
        };

        const stopDrag = () => setDragging(false);

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", stopDrag);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", stopDrag);
        };
    }, [dragging, offset, card.docId, updateCard]);


    const startResize = (e) => {
        e.stopPropagation();

        const rect = e.currentTarget.parentElement.getBoundingClientRect();

        const startX = e.clientX;
        const startY = e.clientY;

        const startWidth = rect.width;
        const startHeight = rect.height;

        const resize = (moveEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;

            const newWidth = Math.max(50, startWidth + dx);
            const newHeight = Math.max(50, startHeight + dy);

            updateCard(card.docId, {
                width: newWidth,
                height: newHeight,
            });
        };
        const stopResize = () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResize);
        };

        window.addEventListener("mousemove", resize);
        window.removeEventListener("mouseup", stopResize);
    };

    const startRotate = (e) => {
        e.stopPropagation();

        const rect = e.currentTarget.parentElement.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotate = (moveEvent) => {
            const dx = moveEvent.clientX - centerX;
            const dy = moveEvent.clientY - centerY;

            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            updateCard(card.docId, { rotation: angle });
        };

        const stopRotate = () => {
            window.removeEventListener("mousemove", rotate);
            window.removeEventListener("mouseup", stopRotate);
        };
    }

    const duplicate = () => {
        const copy = {
            ...card,
            X: card.x + 30,
            y: card.y + 30,
        };

        delete copy.docId;

        addCard(copy);
    };

    return (
        <div
            onMouseDown={handleDragStart}
            style={{
                position: "absolute",
                left: card.x,
                top: card.y,
                width: card.width,
                height: card.height,
                background: "lightblue",
                border:
                    selectedId === card.docId
                      ? "2px solid #4f46e5" 
                      : "1px solid black",
                zIndex: card.zIndex || 1,
                cursor: "grab",
                transform: `rotate(${card.rotation || 0}deg)`,
            }}
        >
            {card.id}

            {}
            <button
                onMouseDown={startRotate}
                style={{ position: "absolute", top: -20, cursor: "grab", }}
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

            {selectedId === card.docId && (
                <div
                    style={{
                        position: "absolute",
                        top: -45,
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        gap: 6,
                        background: "white",
                        padding: "4px 8px",
                        borderRadius: 8,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                >
                    <button onClick={() => deleteCard(card.docId)}>🗑</button>

                    <button onClick={() => { addCard(card.id, card.x + 30, card.y + 30)}}>
                        📄
                    </button>

                    <button onClick={() => 
                        updateCard(card.docId, {
                            zIndex: (card.zIndex || 1) + 1,
                        })
                    }>
                        ⬆
                    </button>

                    <button 
                        onClick={() =>
                            updateCard(card.docId, {
                                zIndex: 0,
                            })
                        }
                    >
                        ⬇
                    </button>
    
                </div>
            )}
        </div>
    );
}

export default DraggableCard;