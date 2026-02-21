function Sidebar({ addCard }) {
    const cardTypes = [
        { id: "note", label: "Note" },
        { id: "todo", label: "Todo" },
        { id: "sticker", label: "Sticker" }
    ];


    const handleAdd = (type) => {
        addCard(type, 200, 150);
    };

    return (
        <div style={{ width: "200px", background: "#f3f3f3", padding:"10px", borderRight: "1px solid #ddd", }}>
            <h3>Elements</h3>

            {cardTypes.map((item) => (
                <div key={item.id} onClick={() => handleAdd(item.id)}
                style={{ width: "100px", height: "100px", background: "white", border: "1px solid black", marginBottom: "10px", cursor: "pointer", borderRadius: "8px", textAlign: "center", fontWeight: "500", display: "flex", alighItems: "center", justifyContent: "center", }}>
                {item.label}
                </div>
            ))}
        
        </div>
    );
}

export default Sidebar;