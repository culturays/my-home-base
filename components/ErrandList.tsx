"use client" 
 
import { ErrandProps } from "@/app/types";
import { useEffect, useState } from "react";
  
 const mockErrands = [
   {
     id: 1,
     title: "Pick up laundry",
     description: "Collect clothes from 24hr Laundry by 5pm",
     location: "Ikeja, Lagos",
     deadline: "2025-06-03T17:00",
     status: "open",
   },
   {
     id: 2,
     title: "Grocery Shopping",
     description: "Buy vegetables and fruits from the market",
     location: "Lekki Phase 1",
     deadline: "2025-06-04T12:00",
     status: "open",
   },
 ];

const ErrandList = ({initialErrands}:{initialErrands:ErrandProps[]}) => {
      const [selected, setSelected] = useState<ErrandProps>();
      const [errands, setErrands] = useState<ErrandProps[]>(initialErrands); 

  const getStatusAccept = async(id:number|string) => {
    //  await handleAccept(id)
    //     setErrands((prev ) =>
    //   prev.map((e) => (e.id === id ? { ...e, status: "accepted" } : e))
    // );
 
  };
  return (
    <div>
         {/* <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Errands</h1>

      {selected ? (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">{selected.title}</h2>
          <p>{selected.description}</p>
          <p className="text-gray-500">{selected.location}</p>
          <p className="text-gray-500">
            Deadline: {new Date(selected.deadline).toLocaleString()}
          </p>
          <div className="mt-4 flex gap-3">
            <button
              className="bg-teal-600 text-white px-4 py-2 rounded"
              onClick={() => handleAccept(selected.id)}
            >
              Accept
            </button>
            <button
              className="text-teal-600 underline"
              onClick={() => setSelected(prev => prev)}
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        errands
          .filter((e) => e.status === "open")
          .map((errand) => (
            <div
              key={errand.id}
              className="bg-white p-4 rounded shadow mb-3 cursor-pointer"
              onClick={() => setSelected(errand)}
            >
              <h3 className="font-semibold">{errand.title}</h3>
              <p className="text-sm text-gray-500">{errand.location}</p>
            </div>
          ))
      )}
    </div>
      {selected ? (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">{selected.title}</h2>
          <p className="text-gray-600 mb-2">{selected.description}</p>
          <p className="text-gray-500">📍 {selected.location}</p>
          <p className="text-gray-500">🕒 Deadline: {new Date(selected.deadline).toLocaleString()}</p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => getStatusAccept(selected.id as number)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
            >
              Accept Errand
            </button>
            <button
              onClick={() => setSelected(prev => prev)}
              className="text-teal-700 underline hover:text-teal-800"
            >
              Back to List
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {errands.map((errand) => (
            <div
              key={errand.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
              onClick={() => setSelected(errand)}
            >
              <h2 className="text-lg font-semibold text-gray-800">{errand.title}</h2>
              <p className="text-gray-500 text-sm">{errand.location}</p>
              <p className="text-gray-400 text-sm">
                Deadline: {new Date(errand.deadline).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  )
}

export default ErrandList
