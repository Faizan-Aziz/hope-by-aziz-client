import heart from "../../assets/donation.svg";

const Welcomecontent = () => {
  return (
    <div className="flex flex-col items-center gap-9">
      
      <img
        className="w-70 h-70 invert-350"
        src={heart}
        alt="Welcome To the Donation"
      />

      <h1
        className="text-5xl font-bold Animation"
        style={{ color: "rgb(255, 255, 255)" }}
      >
        HOPE-BY-AZIZ
      </h1>

      <span style={{ color: "rgb(255, 255, 255)" }}>
        To Support Dreams And Lifes, A Legacy To Sustain <br />
        In Every Heart And Home, Our Impact Will Remain
      </span>

    </div>
  );
};

export default Welcomecontent;
