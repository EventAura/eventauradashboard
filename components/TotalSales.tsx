








// const countParticipantsBetweenDates = (participants, startDate, endDate) => {
//   return participants.filter((participant) => {
//     const registrationDate = new Date(participant.userRegistrationDate);
//     return (
//       registrationDate >= new Date(startDate) &&
//       registrationDate <= new Date(endDate) &&
//       participant.paymentData?.data?.state === "COMPLETED"
//     );
//   });
// };

// const TotalSales = ({ eventData, participants }) => {
//   const totalSales = (price, participants, startDate, endDate) => {
//     const filteredParticipants = countParticipantsBetweenDates(
//       participants,
//       startDate,
//       endDate
//     );

//     // Calculate the total revenue after removing the last two zeroes from the amount
//     let totalRevenue = 0;
//     filteredParticipants.forEach((participant) => {
//       const amount = Math.floor(participant.paymentData.data.amount / 100);
//       totalRevenue += amount;
//     });

//     const percentageDeduction = totalRevenue * 0.02;
//     const fixedDeduction = filteredParticipants.length * 5;
//     const finalTotal = totalRevenue - (percentageDeduction + fixedDeduction);

//     return finalTotal.toLocaleString();
//   };

//   if (!eventData || !participants.length) {
//     return (
//       <div className="flex items-center justify-center">
//         <div className="loader border-t-4 border-black rounded-full w-8 h-8 animate-spin"></div>
//         <span className="ml-2 text-black">Calculating Total Sales...</span>
//       </div>
//     );
//   }

//   const { eventPrice, eventCreatedDate, eventLastDate } = eventData;

//   return (
//     <div>
//       <h2 className="text-2xl font-bold">
//         ₹{totalSales(eventPrice, participants, eventCreatedDate, eventLastDate)}
//       </h2>
//       <p className="text-xs text-muted-foreground">Total Revenue (after deductions)</p>
//     </div>
//   );
// };

// export default TotalSales;



import React, { useMemo } from "react";

const countParticipantsBetweenDates = (participants, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return participants.filter((participant) => {
    const registrationDate = new Date(participant.userRegistrationDate);
    return (
      registrationDate >= start &&
      registrationDate <= end &&
      participant.paymentData?.data?.state === "COMPLETED"
    );
  });
};

const calculateTotalRevenue = (filteredParticipants) => {
  let totalRevenue = 0;

  filteredParticipants.forEach((participant) => {
    const amount = Math.floor(participant.paymentData.data.amount / 100);
    totalRevenue += amount;
  });

  // Deduct 2% and a fixed fee of ₹5 per participant
  const percentageDeduction = totalRevenue * 0.02;
  const fixedDeduction = filteredParticipants.length * 5;
  const finalTotal = totalRevenue - (percentageDeduction + fixedDeduction);

  return finalTotal;
};

const TotalSales = ({ eventData, participants }) => {
  const totalSales = useMemo(() => {
    if (!eventData || !participants.length) return null;

    const { eventCreatedDate, eventLastDate } = eventData;

    // Filter participants between the specified dates
    const filteredParticipants = countParticipantsBetweenDates(
      participants,
      eventCreatedDate,
      eventLastDate
    );

    // Calculate total revenue after deductions
    const finalTotal = calculateTotalRevenue(filteredParticipants);

    return finalTotal.toLocaleString();
  }, [eventData, participants]);

  if (!eventData || !participants.length) {
    return (
      <div className="flex items-center justify-center">
        <div className="loader border-t-4 border-black rounded-full w-8 h-8 animate-spin"></div>
        <span className="ml-2 text-black">Calculating Total Sales...</span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">₹{totalSales}</h2>
      <p className="text-xs text-muted-foreground">Total Revenue (after deductions)</p>
    </div>
  );
};

export default TotalSales;