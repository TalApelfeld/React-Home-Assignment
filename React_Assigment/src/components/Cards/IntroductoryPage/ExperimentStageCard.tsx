interface IExperimentStageCard {
  icon: string;
  title: string;
  text: string;
}

export default function ExperimentStageCard({
  icon,
  title,
  text,
}: IExperimentStageCard) {
  return (
    <div className="w-70 h-70 bg-neutral-100 flex flex-col text-start p-4 rounded-lg shadow-2xl">
      <img src={icon} alt="" className="w-10 h-10  rounded-lg mb-sm" />
      <h1 className="text-h1-xxxsm">{title}</h1>
      <p className="text-text-Secondary">{text}</p>
    </div>
  );
}
