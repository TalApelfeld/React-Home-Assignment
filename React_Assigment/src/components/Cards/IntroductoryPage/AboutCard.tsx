export default function AboutCard() {
  return (
    <div className="p-4 bg-CardContainer w-[90%] lg:w-[60%] shadow-xl border-2 border-gray-200 rounded-2xl text-start mb-h2">
      <h1 className="text-h1-xxsm ">About This Study</h1>
      <div className="text-text-Secondary flex flex-col gap-h2">
        <p>
          This experiment investigates user interaction patterns and
          decision-making processes in a controlled digital environment. The
          study consists of three sequential tasks designed to measure reaction
          times, interaction behaviors, and cognitive responses.
        </p>
        <p>
          All data collected is anonymous and will be used solely for research
          purposes. The entire experiment takes approximately 3-5 minutes to
          complete.
        </p>
      </div>
    </div>
  );
}
