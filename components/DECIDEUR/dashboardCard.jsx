export default function DashboardCard({ header, data }) {
  const texts = Object.keys(data);
  const values = Object.values(data);
  return (
    <div className=" p-2 w-72 bg-white rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-3">
      <div className="p-3 bg-dark-grey text-white rounded ">{header}</div>
      <div className="flex justify-between px-4">
        <p>{texts[0]}</p>
        <p className="text-green-600">{values[0]}</p>
      </div>
      <div className="flex justify-between px-4">
        <p>{texts[1]}</p>
        <p className="text-red-600">{values[1]}</p>
      </div>
    </div>
  );
}
