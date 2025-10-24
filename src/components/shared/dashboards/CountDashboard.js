import Image from "next/image";

const gradientClasses = [
  "bg-gradient-to-br from-purple-500 to-rose-500",
  "bg-gradient-to-br from-pink-600 to-red-400",
  "bg-gradient-to-br from-fuchsia-500 to-cyan-500",

  "bg-gradient-to-br from-yellow-400 to-red-500",
  "bg-gradient-to-br from-cyan-500 to-indigo-500",
  "bg-gradient-to-br from-fuchsia-600 to-pink-400",
];

// Multiple decorative floating SVGs
const FloatingShapes = () => (
  <>
    {/* Star */}
    <svg
      className="absolute top-2 right-2 w-6 h-6 opacity-20"
      viewBox="0 0 24 24"
      fill="white"
    >
      <path d="M12 0L14.09 7.26H22L15.45 11.74L17.55 19L12 14.52L6.45 19L8.55 11.74L2 7.26H9.91L12 0Z" />
    </svg>

    {/* Triangle */}
    <svg
      className="absolute bottom-2 left-3 w-5 h-5 opacity-20"
      viewBox="0 0 24 24"
      fill="white"
    >
      <path d="M12 2L22 20H2L12 2Z" />
    </svg>

    {/* Circle */}
    <svg
      className="absolute top-4 left-8 w-3 h-3 opacity-20"
      viewBox="0 0 24 24"
      fill="white"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  </>
);

const CountDashboard = ({ count, index }) => {
  const { name, data, image, symbol } = count;

  return (
    <div
      className={`relative rounded-xl p-4 text-white ${
        gradientClasses[index % gradientClasses.length]
      } shadow-xl flex flex-col justify-between h-full overflow-hidden`}
    >
      {/* Floating Shape Decorations */}
      <FloatingShapes />

      <div className="flex items-center justify-between z-10 relative">
        <div>
          <h3 className="text-2xl font-bold">
            {symbol || ""}
            {data}
          </h3>

          {/* Divider Line */}
          <div className="h-px w-full bg-white bg-opacity-40 my-3" />

          <p className="text-sm opacity-90">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default CountDashboard;
