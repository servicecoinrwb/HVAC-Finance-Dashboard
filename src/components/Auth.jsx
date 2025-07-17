import { signInWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="block mb-2 p-2 w-full border rounded" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="block mb-4 p-2 w-full border rounded" />
        <button onClick={handleLogin} className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded">Login</button>
      </div>
    </div>
  );
};
