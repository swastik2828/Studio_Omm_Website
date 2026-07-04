import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl text-transparent bg-clip-text bg-gradient-primary">404</h1>
      <h2 className="text-3xl mt-4 mb-8">Lost in the frequency.</h2>
      <Link to="/" className="px-8 py-3 rounded-full bg-surface border border-card hover:border-primary transition-colors">
        Return to Studio
      </Link>
    </div>
  );
}