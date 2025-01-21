

import { useEffect, useState } from "react";

const countParticipantsBetweenDates = (participants, startDate, endDate) => {
  return participants.filter((participant) => {
    const registrationDate = new Date(participant.userRegistrationDate);
    return (
      registrationDate >= new Date(startDate) &&
      registrationDate <= new Date(endDate) &&
      participant.paymentData?.data?.state === "COMPLETED"
    );
  }).length;
};

const TotalSales = ({ eventData, participants }) => {
  const totalSales = (price, participants, startDate, endDate) => {
    const totalParticipants = countParticipantsBetweenDates(
      participants,
      startDate,
      endDate
    );
    const totalRevenue = price * totalParticipants;

    const percentageDeduction = totalRevenue * 0.02;
    const fixedDeduction = totalParticipants * 5;

    const finalTotal = totalRevenue - (percentageDeduction + fixedDeduction);
    return finalTotal.toLocaleString();
  };

  if (!eventData || !participants.length) {
    return (
      <div>
        <div className="flex items-center justify-center">
        <div className="loader border-t-4 border-black rounded-full w-8 h-8 animate-spin"></div>
        <span className="ml-2 text-black">Calculating Total Sales...</span>
      </div>
             
      </div>
    );
  }

  const { eventPrice, eventCreatedDate, eventLastDate } = eventData;

  return (
    <div>
      
      <div>
        <h2 className="text-2xl font-bold">
          ₹
          {totalSales(eventPrice, participants, eventCreatedDate, eventLastDate)}
        </h2>
        <p className="text-xs text-muted-foreground">Total Revenue (after deductions)</p>
      </div>
    </div>
  );
};

export default TotalSales;

