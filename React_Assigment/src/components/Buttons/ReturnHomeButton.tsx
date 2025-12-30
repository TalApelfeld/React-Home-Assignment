import { useNavigate } from "react-router";
import { useExperiment } from "../../hooks/useExperiment";
import { ButtonClick } from "../../styles/styles";

export default function ReturnHomeButton() {
  const navigate = useNavigate();
  const { resetExperiment } = useExperiment();

  function handleResetData() {
    const confirmed = confirm(`Are you sure you want to go back to Homepage?
        your data will not be saved.
        `);

    if (confirmed) {
      resetExperiment();
      navigate("/");
    } else {
      console.log("Cancelled");
    }
  }
  return (
    <button
      className={`px-6 py-2 flex gap-2 border border-black rounded-lg mt-h2 items-center bg-Background-50 text-text-Primary hover:bg-neutral-200 active:bg-neutral-200 ${ButtonClick}`}
      onClick={handleResetData}
    >
      <img src="/home.svg" alt="icon home" className="w-6 h-6" />
      Return Home
    </button>
  );
}
