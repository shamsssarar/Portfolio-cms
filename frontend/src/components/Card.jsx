export default function Card({ children, className = "" }) {
  return (
    <div
      className={
        "bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 " +
        className
      }
    >
      {children}
    </div>
  );
}
