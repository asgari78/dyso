"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/supabaseClient";

type Note = {
  id: number;
  title: string;
  created_at: string;
};

export default function TestSupabasePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchNotes() {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      alert("Fetch error: " + error.message);
      return;
    }
    setNotes(data ?? []);
  }

  async function addNote() {
    if (!title.trim()) return;

    setLoading(true);
    const { error } = await supabase.from("notes").insert({ title });
    setLoading(false);

    if (error) {
      console.error(error);
      alert("Insert error: " + error.message);
      return;
    }

    setTitle("");
    fetchNotes();
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Supabase Test</h1>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="note title..."
          style={{ padding: 8, width: 280 }}
        />
        <button onClick={addNote} disabled={loading}>
          {loading ? "Saving..." : "Add"}
        </button>
      </div>

      <ul style={{ marginTop: 16 }}>
        {notes.map((n) => (
          <li key={n.id}>
            #{n.id} — {n.title} ({new Date(n.created_at).toLocaleString()})
          </li>
        ))}
      </ul>
    </main>
  );
}
