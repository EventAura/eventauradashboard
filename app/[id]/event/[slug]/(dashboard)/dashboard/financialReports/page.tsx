// 'use client'
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { isSameDay } from "date-fns";
// import * as XLSX from "xlsx";
// import { FiDownload } from "react-icons/fi";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { useParams } from "next/navigation";

// const FinancialReports = ({params}) => {
//   const {slug} = useParams();
//   const eventId = slug;
//   const [eventData, setEventData] = useState(null);
//   const [participants, setParticipants] = useState([]);
//   const [datesList, setDatesList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Function to generate list of dates between start and end date
//   const DateList = (start, end) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     const tempDatesList = [];

//     while (startDate <= endDate) {
//       tempDatesList.push(new Date(startDate.toISOString())); // Store Date objects
//       startDate.setDate(startDate.getDate() + 1);
//     }

//     setDatesList(tempDatesList);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const eventResponse = await axios.get(
//           `https://eventaura-server-api.onrender.com/event/${eventId}`
//         );
//         setEventData(eventResponse.data.data);

//         const fetchParticipantsApi = async () => {
//           try {
//             const response = await axios.get(
//               `https://eventaura-server-api.onrender.com/participants/event/${eventId}`
//             );
//             setParticipants(response.data);
//             setLoading(false);
//           } catch (error) {
//             console.log(error);
//           }
//         };
//         fetchParticipantsApi();

//         if (
//           eventResponse.data.data?.eventCreatedDate &&
//           eventResponse.data.data?.eventLastDate
//         ) {
//           DateList(
//             eventResponse.data.data.eventCreatedDate,
//             eventResponse.data.data.eventLastDate
//           );
//         }
//       } catch (error) {
//         console.log("Error fetching data:", error);
//       }
//     };

//     if (eventId) {
//       fetchData();
//       setLoading(false);
//     }
//   }, [eventId]);

//   // Function to count participants registered on a specific date
//   const countParticipantsForDate = (date) => {
//     return participants.filter(
//       (participant) =>
//         isSameDay(new Date(participant.userRegistrationDate), date) &&
//         participant.paymentData?.data?.state === "COMPLETED"
//     ).length;
//   };

//   // Function to download Excel
//   const downloadExcel = () => {
//     const data = datesList
//       .map((date) => {
//         const numParticipants = countParticipantsForDate(date);
//         if (numParticipants > 0) {
//           return {
//             Date: date.toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "short",
//               day: "numeric",
//             }),
//             Participants: numParticipants,
//             Amount:
//               numParticipants * eventData?.eventPrice -
//               numParticipants * (eventData?.eventPrice * 0.02 + 5),
//           };
//         }
//         return null;
//       })
//       .filter(Boolean);

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Financial Report");

//     XLSX.writeFile(workbook, "Financial_Report.xlsx");
//   };

//   // Function to download PDF
//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     const tableData = datesList
//       .map((date) => {
//         const numParticipants = countParticipantsForDate(date);
//         if (numParticipants > 0) {
//           return [
//             date.toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "short",
//               day: "numeric",
//             }),
//             numParticipants,
//             numParticipants * eventData?.eventPrice -
//               numParticipants * (eventData?.eventPrice * 0.02 + 5),
//           ];
//         }
//         return null;
//       })
//       .filter(Boolean);

//     doc.autoTable({
//       head: [["Date", "Participants", "Amount"]],
//       body: tableData,
//     });

//     doc.save("Financial_Report.pdf");
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl text-center text-indigo-600 my-5 font-semibold">
//         Financial Reports
//       </h1>
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={downloadExcel}
//           className="text-white bg-indigo-600 p-2 rounded-md hover:bg-indigo-700 flex items-center mr-2"
//         >
//           <FiDownload className="mr-2" />
//           Download Excel
//         </button>
//         <button
//           className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-600"
//           onClick={downloadPDF}
//         >
//           <FiDownload className="mr-2" />
//           Download PDF
//         </button>
//       </div>
//       <table className="min-w-full bg-gray-800 text-white shadow-md rounded-lg overflow-hidden">
//         <thead className="bg-gray-700">
//           <tr>
//             <th className="py-3 px-6 text-left border-b border-gray-600">Date</th>
//             <th className="py-3 px-6 text-left border-b border-gray-600">
//               No. of Participants
//             </th>
//             <th className="py-3 px-6 text-left border-b border-gray-600">
//               Amount
//             </th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-400">
//           {datesList.map((date, index) => {
//             const numParticipants = countParticipantsForDate(date);
//             if (numParticipants > 0) {
//               return (
//                 <tr key={index} className="hover:bg-gray-700">
//                   <td className="py-4 px-6 border-b border-gray-600">
//                     {date.toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </td>
//                   <td className="py-4 px-6 border-b border-gray-600">
//                     {numParticipants}
//                   </td>
//                   <td className="py-4 px-6 border-b border-gray-600">
//                     ₹
//                     {(
//                       numParticipants * eventData?.eventPrice -
//                       numParticipants * (eventData?.eventPrice * 0.02 + 5)
//                     ).toFixed(2)}
//                   </td>
//                 </tr>
//               );
//             } else {
//               return null; // Skip rendering rows with zero participants
//             }
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FinancialReports;







// 'use client'

// import React,{ useEffect, useState } from "react";
// import axios from "axios";
// import { isSameDay } from "date-fns";
// import * as XLSX from "xlsx";
// import { FiDownload } from "react-icons/fi";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { useParams } from "next/navigation";

// const FinancialReports = ({params}) => {
//   const unwrappedParams = React.use(params);
//   const {slug} =  unwrappedParams;
//   const eventId = slug;
//   const [eventData, setEventData] = useState(null);
//   const [participants, setParticipants] = useState([]);
//   const [datesList, setDatesList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Function to generate list of dates between start and end date
//   const DateList = (start, end) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     const tempDatesList = [];

//     while (startDate <= endDate) {
//       tempDatesList.push(new Date(startDate.toISOString())); // Store Date objects
//       startDate.setDate(startDate.getDate() + 1);
//     }

//     setDatesList(tempDatesList);
//   };

//   // Function to count participants registered on a specific date
//   const countParticipantsForDate = (date) => {
//     return participants.filter(
//       (participant) =>
//         isSameDay(new Date(participant.userRegistrationDate), date) &&
//         participant.paymentData?.data?.state === "COMPLETED"
//     ).length;
//   };

//   // Function to calculate total revenue for a specific date
//   const calculateRevenueForDate = (date) => {
//     const filteredParticipants = participants.filter(
//       (participant) =>
//         isSameDay(new Date(participant.userRegistrationDate), date) &&
//         participant.paymentData?.data?.state === "COMPLETED"
//     );

//     let totalRevenue = 0;

//     filteredParticipants.forEach((participant) => {
//       const amount = Math.floor(participant.paymentData.data.amount / 100);
//       totalRevenue += amount;
//     });

//     // Deduct 2% and a fixed fee of ₹5 per participant
//     const percentageDeduction = totalRevenue * 0.02;
//     const fixedDeduction = filteredParticipants.length * 5;
//     const finalTotal = totalRevenue - (percentageDeduction + fixedDeduction);

//     return finalTotal;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const eventResponse = await axios.get(
//           `https://eventaura-server-api.onrender.com/event/${eventId}`
//         );
//         setEventData(eventResponse.data.data);

//         const fetchParticipantsApi = async () => {
//           try {
//             const response = await axios.get(
//               `https://eventaura-server-api.onrender.com/participants/event/${eventId}`
//             );
//             setParticipants(response.data);
//             setLoading(false);
//           } catch (error) {
//             console.log(error);
//           }
//         };
//         fetchParticipantsApi();

//         if (
//           eventResponse.data.data?.eventCreatedDate &&
//           eventResponse.data.data?.eventLastDate
//         ) {
//           DateList(
//             eventResponse.data.data.eventCreatedDate,
//             eventResponse.data.data.eventLastDate
//           );
//         }
//       } catch (error) {
//         console.log("Error fetching data:", error);
//       }
//     };

//     if (eventId) {
//       fetchData();
//       setLoading(false);
//     }
//   }, [eventId]);

//   // Function to download Excel
//   const downloadExcel = () => {
//     const data = datesList
//       .map((date) => {
//         const numParticipants = countParticipantsForDate(date);
//         if (numParticipants > 0) {
//           return {
//             Date: date.toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "short",
//               day: "numeric",
//             }),
//             Participants: numParticipants,
//             Amount: calculateRevenueForDate(date).toFixed(2),
//           };
//         }
//         return null;
//       })
//       .filter(Boolean);

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Financial Report");

//     XLSX.writeFile(workbook, "Financial_Report.xlsx");
//   };

//   // Function to download PDF
//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     const tableData = datesList
//       .map((date) => {
//         const numParticipants = countParticipantsForDate(date);
//         if (numParticipants > 0) {
//           return [
//             date.toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "short",
//               day: "numeric",
//             }),
//             numParticipants,
//             calculateRevenueForDate(date).toFixed(2),
//           ];
//         }
//         return null;
//       })
//       .filter(Boolean);

//     doc.autoTable({
//       head: [["Date", "Participants", "Amount"]],
//       body: tableData,
//     });

//     doc.save("Financial_Report.pdf");
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl text-center text-black my-5 font-semibold">
//         Financial Reports
//       </h1>
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={downloadExcel}
//           className="text-white bg-indigo-600 p-2 rounded-md hover:bg-indigo-700 flex items-center mr-2"
//         >
//           <FiDownload className="mr-2" />
//           Download Excel
//         </button>
//         <button
//           className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-600"
//           onClick={downloadPDF}
//         >
//           <FiDownload className="mr-2" />
//           Download PDF
//         </button>
//       </div>
//       <table className="min-w-full bg-white text-black shadow-md rounded-lg overflow-hidden">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-3 px-6 text-left border-b border-gray-200">Date</th>
//             <th className="py-3 px-6 text-left border-b border-gray-200">
//               No. of Participants
//             </th>
//             <th className="py-3 px-6 text-left border-b border-gray-200">
//               Amount
//             </th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-700">
//           {datesList.map((date, index) => {
//             const numParticipants = countParticipantsForDate(date);
//             if (numParticipants > 0) {
//               return (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="py-4 px-6 border-b border-gray-200">
//                     {date.toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </td>
//                   <td className="py-4 px-6 border-b border-gray-200">
//                     {numParticipants}
//                   </td>
//                   <td className="py-4 px-6 border-b border-gray-200">
//                     ₹{calculateRevenueForDate(date).toFixed(2)}
//                   </td>
//                 </tr>
//               );
//             } else {
//               return null; // Skip rendering rows with zero participants
//             }
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FinancialReports;






'use client'

import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { isSameDay } from "date-fns";
import { FiDownload } from "react-icons/fi";
import { useParams } from "next/navigation";

const FinancialReports = ({ params }) => {
  const unwrappedParams=  React.use(params)
  const { slug } = unwrappedParams;
  const eventId = slug;
  const [eventData, setEventData] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch event and participants data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventResponse, participantsResponse] = await Promise.all([
          // axios.get(`https://eventaura-server-api.onrender.com/event/${eventId}`),
          // axios.get(`https://eventaura-server-api.onrender.com/participants/event/${eventId}`),
          axios.get(`http://localhost:8080/event/${eventId}`), 
          axios.get(`http://localhost:8080/participants/event/${eventId}`),
        ]);

        setEventData(eventResponse.data.data);
        setParticipants(participantsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (eventId) {
      fetchData();
    }
  }, [eventId]);

  // Generate list of dates between start and end date
  const datesList = useMemo(() => {
    if (!eventData?.eventCreatedDate || !eventData?.eventLastDate) return [];

    const startDate = new Date(eventData.eventCreatedDate);
    const endDate = new Date(eventData.eventLastDate);
    const tempDatesList = [];

    while (startDate <= endDate) {
      tempDatesList.push(new Date(startDate.toISOString()));
      startDate.setDate(startDate.getDate() + 1);
    }

    return tempDatesList;
  }, [eventData]);

  // Count participants registered on a specific date
  const countParticipantsForDate = useCallback(
    (date) => {
      return participants.filter(
        (participant) =>
          isSameDay(new Date(participant.userRegistrationDate), date) &&
          participant.paymentData?.data?.state === "COMPLETED"
      ).length;
    },
    [participants]
  );

  // Calculate total revenue for a specific date
  const calculateRevenueForDate = useCallback(
    (date) => {
      const filteredParticipants = participants.filter(
        (participant) =>
          isSameDay(new Date(participant.userRegistrationDate), date) &&
          participant.paymentData?.data?.state === "COMPLETED"
      );

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
    },
    [participants]
  );

  // Download Excel
  const downloadExcel = useCallback(async () => {
    const XLSX = await import("xlsx");

    const data = datesList
      .map((date) => {
        const numParticipants = countParticipantsForDate(date);
        if (numParticipants > 0) {
          return {
            Date: date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            Participants: numParticipants,
            Amount: calculateRevenueForDate(date).toFixed(2),
          };
        }
        return null;
      })
      .filter(Boolean);

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Financial Report");

    XLSX.writeFile(workbook, "Financial_Report.xlsx");
  }, [datesList, countParticipantsForDate, calculateRevenueForDate]);

  // Download PDF
  const downloadPDF = useCallback(async () => {
    const { jsPDF } = await import("jspdf");
    await import("jspdf-autotable");

    const tableData = datesList
      .map((date) => {
        const numParticipants = countParticipantsForDate(date);
        if (numParticipants > 0) {
          return [
            date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            numParticipants,
            calculateRevenueForDate(date).toFixed(2),
          ];
        }
        return null;
      })
      .filter(Boolean);

    const doc = new jsPDF();
    doc.autoTable({
      head: [["Date", "Participants", "Amount"]],
      body: tableData,
    });

    doc.save("Financial_Report.pdf");
  }, [datesList, countParticipantsForDate, calculateRevenueForDate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader border-t-4 border-black rounded-full w-8 h-8 animate-spin"></div>
        <span className="ml-2 text-black">Loading...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center text-black my-5 font-semibold">
        Financial Reports
      </h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={downloadExcel}
          className="text-white bg-indigo-600 p-2 rounded-md hover:bg-indigo-700 flex items-center mr-2"
        >
          <FiDownload className="mr-2" />
          Download Excel
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-600"
          onClick={downloadPDF}
        >
          <FiDownload className="mr-2" />
          Download PDF
        </button>
      </div>
      <table className="min-w-full bg-white text-black shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left border-b border-gray-200">Date</th>
            <th className="py-3 px-6 text-left border-b border-gray-200">
              No. of Participants
            </th>
            <th className="py-3 px-6 text-left border-b border-gray-200">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {datesList.map((date, index) => {
            const numParticipants = countParticipantsForDate(date);
            if (numParticipants > 0) {
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6 border-b border-gray-200">
                    {date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {numParticipants}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    ₹{calculateRevenueForDate(date).toFixed(2)}
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialReports;