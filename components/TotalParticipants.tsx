
// const TotalParticipants = ({participants}) => {

//   return (
//     <div>
//         <div>
//             <h2 className="text-2xl font-bold">
//             {participants.length}
//             </h2>
//             <p className="text-xs text-muted-foreground">Total Participants</p>
//         </div>

//     </div>
//   )
// }

// export default TotalParticipants


  



// const TotalParticipants = ({  participants }) => {
//   if (!participants.length) {
//     return (
//       <div>
//         <div className="flex items-center justify-center">
//           <div className="loader border-t-4 border-black rounded-full w-8 h-8 animate-spin"></div>
//           <span className="ml-2 text-black">Calculating Total Participants...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold">{
//         participants.filter((participant) => participant.paymentData?.data?.state === "COMPLETED").length
//         }</h2>
//       <p className="text-xs text-muted-foreground">Total Participants (paid)</p>
//     </div>
//   );
// };

// export default TotalParticipants;


import React, { useMemo } from "react";

const TotalParticipants = ({ participants }: { participants: any[] }) => {
  // Memoize the filtered list of paid participants
  const paidParticipantsCount = useMemo(() => {
    return participants.filter(
      (participant) => participant.paymentData?.data?.state === "COMPLETED"
    ).length;
  }, [participants]);

  // Early exit for empty participants array
  if (!participants.length) {
    return (
      <div className="flex items-center justify-center">
        <div className="loader border-t-4 border-black rounded-full w-8 h-8 animate-spin"></div>
        <span className="ml-2 text-black">Calculating Total Participants...</span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">{paidParticipantsCount}</h2>
      <p className="text-xs text-muted-foreground">Total Participants (paid)</p>
    </div>
  );
};

export default TotalParticipants;