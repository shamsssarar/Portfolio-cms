export default function Card({ children, className = "" }) {
  return (
    <div
      className={
        "w-full bg-white/70 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 " +
        "rounded-xl shadow-sm hover:shadow-lg hover:border-[#03a0bc]/60 " +
        "transition transform hover:-translate-y-1 backdrop-blur-sm " +
        className
      }
    >
      {children}
    </div>
  );
}
