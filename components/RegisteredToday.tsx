import { useEffect, useState } from "react";

const countParticipantsRegisteredToday = (participants) => {
  const today = new Date();
  return participants.filter((participant) => {
    const registrationDate = new Date(participant.userRegistrationDate);
    return (
      registrationDate.toDateString() === today.toDateString() &&
      participant.paymentData?.data?.state === "COMPLETED"
    );
  }).length;
};

const ParticipantsRegisteredToday = ({ eventData, participants }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalParticipantsToday, setTotalParticipantsToday] = useState(0);
  const [isEventClosed, setIsEventClosed] = useState(false);

  useEffect(() => {
    if (!eventData || !participants) return;

    const today = new Date();
    const { eventLastDate } = eventData;

    if (today > new Date(eventLastDate)) {
      setIsEventClosed(true);
    } else {
      const total = countParticipantsRegisteredToday(participants);
      setTotalParticipantsToday(total);
    }

    setIsLoading(false); // Stop loading after calculations
  }, [eventData, participants]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="loader border-t-4 border-black rounded-full w-8 h-8 animate-spin"></div>
        <span className="ml-2 text-black">Calculating...</span>
      </div>
    );
  }

//   if (isEventClosed) {
//     return (
//       <div>
//         <h2 className="text-xl font-bold text-black">Event is closed</h2>
//       </div>
//     );
//   }

  return (
    <div>
      <h2 className="text-2xl font-bold">{totalParticipantsToday}</h2>
      <p className="text-xs text-muted-foreground">Participants Registered Today</p>
    </div>
  );
};

export default ParticipantsRegisteredToday;
