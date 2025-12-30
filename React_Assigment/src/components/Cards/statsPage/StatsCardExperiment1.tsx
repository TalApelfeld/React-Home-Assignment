import FirstClickCard from "../../Reusable/FirstClickCard";

export default function StatsCardExperiment1() {
  return (
    <div className="w-[90%] lg:w-[60%] text-start border-2 border-neutral-300 rounded-lg p-4 mb-h2">
      <h2 className="text-text-Primary text-h2-lg mb-h2">
        Page 1 - User Response
      </h2>

      {/* First Click */}
      <FirstClickCard />

      {/* Experiment 1 Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="pb-3 text-left font-semibold">Value</th>
              <th className="pb-3 text-left font-semibold">Timestamp (UTC)</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {/* {experimentData.page1.clicks.map((click, idx) => (
              <tr key={idx}>
                <td className="py-3 font-medium capitalize">{click.type}</td>
                <td className="py-3">{click.value}</td>
                <td className="py-3 font-mono text-xs">
                  {formatTimestamp(click.timestamp)}
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
