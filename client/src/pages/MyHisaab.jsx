export default function MyHisaab({ name, username, hisaabs = [] }) {
  const handleClick = () => console.log('Clicked for a reason.');

  return (
    <div className="w-[90%] mx-auto my-6 px-4 py-5 flex flex-col sm:flex-row sm:justify-between sm:items-center rounded-xl">
      <h1 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-0">
        Welcome back, {name} 👋
      </h1>

      <button onClick={handleClick}>
        <a
          href={`/${username}/addHisaab`}
          className="px-4 py-2 bg-indigo-500 shadow-indigo-300 hover:bg-indigo-600 text-white rounded-xl text-sm shadow-md transition duration-200 font-semibold text-center w-max"
        >
          + Add New Hisaab
        </a>
      </button>

      {hisaabs.length > 0 ? (
        <>
          <h2 className="text-2xl text-center font-semibold text-white mb-3 px-4">
            Your Hisaabs
          </h2>
          <div className="flex flex-wrap justify-center gap-1 px-4">
            {hisaabs.map((h) => (
              // Replace with <HisaabCard key={h.id} h={h} />
              <div key={h.id} className="p-4 bg-white rounded shadow">
                {h.description} - ₹{h.amount}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center m-5 min-h-[200px]">
          <div className="p-5 text-center text-lg shadow-md shadow-gray-400 rounded-xl bg-white max-w-md">
            <h1 className="mb-2 text-gray-500 font-medium">No Hisaabs found.</h1>
            <p className="text-sm text-gray-400">
              Start by adding a new one — encrypted and secured just for you.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
