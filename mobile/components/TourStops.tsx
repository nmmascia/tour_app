import TourStopCard from "./TourStopCard";

const TourStops = (props) => {
  const { tourStops } = props;

  return (
    <>
      {tourStops.map((tourStop) => {
        const { id, date, tourStopMembers } = tourStop;
        return (
          <TourStopCard
            key={id}
            date={date}
            tourStopMembers={tourStopMembers}
          />
        );
      })}
    </>
  );
};

export default TourStops;
