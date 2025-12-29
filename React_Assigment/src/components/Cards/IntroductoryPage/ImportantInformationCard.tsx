export default function ImportantInformationCard() {
  return (
    <div className="p-4 bg-CardContainer w-[90%] lg:w-[60%] shadow-xl border-2 border-gray-200 rounded-2xl text-start mb-h2">
      <h1 className="text-h1-xxsm mb-h2">Important Information</h1>
      <div className="flex flex-col gap-2">
        <p>
          <strong>Navigation: </strong>
          You can only move forward through the experiment. Once you start, you
          cannot return to previous pages.
        </p>
        <p>
          <strong>Data Collection: </strong>
          We record precise timestamps of all your interactions, including
          clicks and button selections.
        </p>
        <p>
          <strong>Privacy: </strong>
          All data is stored locally in your browser and is completely
          anonymous. No personal information is collected.
        </p>
        <p>
          <strong> Duration: </strong>
          The complete experiment takes approximately 3-5 minutes. Please
          complete it in one sitting for accurate results.
        </p>
      </div>
    </div>
  );
}
