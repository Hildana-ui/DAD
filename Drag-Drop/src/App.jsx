import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import Workspace from "./components/workspace";
import { db } from "./firebase";
import { collection, addDoc, updateDoc, doc, getDocs, deleteDoc } from "firebase/firestore";

function App() {
    const [cards, setCards] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const cardsRef = collection(db, "cards");

    useEffect(() => {
        const load = async () => {
            const snap = await getDocs(cardsRef);
            const data = snap.docs.map((d) => ({
                ...d.data(),
                docId: d.id,
            }));
            setCards(data);
        };
        load();
    }, []);


    const addCard = async (type, x, y) => {
        let base = {
            id: type,
            x,
            y,
            rotation: 0,
            width: 120,
            height: 120,
            zIndex: 1,
        };

        if (type === "note") {
            base.content = "New note...";
        }

        if (type === "todo") {
            base.tasks = [];
        }

        const res = await addDoc(cardsRef, base);
        setCards((prev) => [...prev, { ...base, docId: res.id }]);
    };

    const updateCard = async (docId, updates) => {
        await updateDoc(doc(db, "cards", docId), updates);

        setCards((prev) => 
            prev.map((c) =>
                c.docId === docId ? { ...c, ...updates } : c
            )
        );
    };

    const deletCard = async (docId) => {
        await deleteDoc(doc(db, "cards", docId));
        setCards((prev) => prev.filter((c) => c.docId !== docId));
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar  addCard={addCard}/>
            <Workspace cards={cards} updateCard={updateCard} selectedId={selectedId} setSelectedId={setSelectedId} deletCard={deletCard} addCard={addCard} />
        </div>
    );
}

export default App


