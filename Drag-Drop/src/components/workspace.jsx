import DraggableCard from "./draggableCard";

function Workspace ({ cards, addCard, updateCard }) {
    const handleDrop = (e) => {
        e.preventDefault();

        const id = e.dataTransfer.getData("cardId");

        const rect = e.currentTarget.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        addCard(id, x, y);
    };

    const allowDrop = (e) => {
        e.preventDefault();
    }

    return (
        <div 
            onDrop={handleDrop}
            onDragOver={allowDrop}
            style={{
                flex: "1",
                position: "relative",
                background: "#fafafa",
            }}
        >
            {cards.map((card, index) => (
                <DraggableCard key={index} card={card} updateCard={updateCard} />
            ))}

        </div>
    );
}

export default Workspace;