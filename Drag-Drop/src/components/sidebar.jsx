function Sidebar() {
    const cardTypes = [
        { id: "note", label: "Note" },
        { id: "todo", label: "Todo" },
        { id: "sticker", label: "Sticker" }
    ];


    const handleDragStart = (e, type) => {
        
    };

    return (
        <div style={{ width: "200px", background: "#f3f3f3", padding:"10px", borderRight: "1px solid #ddd", }}>
            <h3>Elements</h3>

            {cardTypes.map((item) => (
                <div key={item.id} 
                style={{ width: "100px", height: "100px", background: "white", border: "1px solid black", marginBottom: "10px", cursor: "grab", borderRadius: "8px", textAlign: "center", fontWeight: "500", }}>
                {item.label}
                </div>
            ))}
        
        </div>
    );
}

export default Sidebar;