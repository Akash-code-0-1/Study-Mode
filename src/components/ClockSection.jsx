

const ClockSection = ({ currentTime }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold">Clock</h3>
      <p className="text-xl">{currentTime.toLocaleTimeString()}</p>
    </div>
  );
};

export default ClockSection;
