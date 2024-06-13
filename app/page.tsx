export default function Home() {
  return (
    <div className="w-[80%] mx-auto flex flex-col gap-20 items-center pt-20">
      <div className="flex flex-col items-center gap-5">
        <h4 className="user-details-label">Your Name:</h4>
        <input className="user-details-input " type="text" />
      </div>

      <div className="flex flex-col items-center gap-5">
        <h4 className="user-details-label">Character Name:</h4>
        <input className="user-details-input" type="text" />
      </div>
      <div className="mt-14">
        <button className="py-3 px-5 text-bg bg-primary rounded-xl">
          Start Journey
        </button>
      </div>
    </div>
  );
}
