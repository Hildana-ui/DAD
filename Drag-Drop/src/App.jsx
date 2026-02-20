import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import Workspace from "./components/workspace";
import { db } from "./firebase";
import { collection, addDoc, updateDoc, doc,getDocs } from "firebase/firestore";

function App() {
    const [cards, setCards] = useState([]);

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

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <Workspace cards={cards} addCard={addCard} updateCard={updateCard} />
        </div>
    );
}

export default App
