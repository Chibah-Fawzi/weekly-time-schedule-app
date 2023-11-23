// Header.js

const Header = ({ time }) => {
  const { currentWeek, startDate, endDate } = time;

  return (
    <div
      className="header"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontWeight: "lighter",
          width: "35vw",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        WEEK: {currentWeek} <b>• {startDate} </b> - <b> {endDate} •</b>
      </h1>
    </div>
  );
};

export default Header;
