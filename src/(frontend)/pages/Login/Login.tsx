import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.client";
import Logo from "../../components/Logo";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // handled by auth listener / parent
        } catch (err: any) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <form onSubmit={handleLogin} className="space-y-4 w-full max-w-sm">
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-3 rounded-lg"
                    required
                />

                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-3 rounded-lg"
                    required
                />

                {error && <div className="text-red-400 text-sm">{error}</div>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full p-3 bg-white text-black rounded-xl font-bold"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

