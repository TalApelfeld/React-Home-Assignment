import ButtonLikert from "../../Buttons/Experiment1/ButtonLikert";

export default function LikertCard() {
  return (
    <div className="w-[90%] flex flex-col justify-center items-center border-2 border-neutral-300 p-4 rounded-lg mb-h2">
      <div className="flex gap-4 mb-4">
        <ButtonLikert text="1" />
        <ButtonLikert text="2" />
        <ButtonLikert text="3" />
        <ButtonLikert text="4" />
      </div>
      <div className="w-full flex justify-between">
        <span className="text-h2-sm">Strongly Disagree</span>
        <span className="text-h2-sm">Strongly Agree</span>
      </div>
    </div>
  );
}
