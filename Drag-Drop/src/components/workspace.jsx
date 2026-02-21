import DraggableCard from "./draggableCard";

function Workspace ({ cards, setSelectedId, updateCard }) {

    return (
        <div 
            style={{
                flex: "1",
                position: "relative",
                background: "#fafafa",
            }}
        >
            {cards.map((card) => (
                <DraggableCard 
                    key={card.docId} 
                    card={card} 
                    updateCard={updateCard} 
                    setSelectedId={setSelectedId}
                />
            ))}
        </div>
    );
}

export default Workspace;