export default function Card({ children, className = "" }) {
  return (
    <div
      className={
        "bg-white/70 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 " +
        "rounded-xl shadow-md hover:shadow-lg hover:border-cyan-400/60 dark:hover:border-cyan-400/60 " +
        "transition transform hover:-translate-y-1 backdrop-blur-sm " +
        className
      }
    >
      {children}
    </div>
  );
}
