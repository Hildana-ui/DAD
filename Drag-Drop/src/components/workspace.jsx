import DraggableCard from "./draggableCard";

function Workspace ({ cards, setSelectedId, updateCard, selectedId, deleteCard,addCard, }) {

    return (
        <div 
            omMouseDown={() => setSelectedId(null)}
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
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    deleteCard={deleteCard}
                    addCard={addCard}
                />
            ))}
        </div>
    );
}

export default Workspace;