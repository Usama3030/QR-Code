import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const QRScanner = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [assetNumber, setAssetNumber] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    setRoomNumber(query.get("roomNumber") || "");
    setAssetNumber(query.get("assetNumber") || "");
    setDescription(query.get("description") || "");
    // setFile(query.get("file") || "");
    const fileParam = query.get("file");
    if (fileParam) {
      try {
        const fileObject = JSON.parse(decodeURIComponent(fileParam));
        setFile(fileObject.url || "");
      } catch (error) {
        console.error("Error parsing file URL:", error);
        setFile("");
      }
    }
  }, [query]);

  console.log(query);

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="text-center mb-6">
        {/* <img
          src="/"
          alt="Header Image"
          className="w-24 h-24 mx-auto"
        /> */}
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="p-4 bg-[#3c3b6e] text-white rounded-md">
          <i className="fa fa-map-marker-alt" /> N Low Hall | Floor 5 | Finance
          Center, Dhahran
        </div>
        <div className="p-4 bg-[#3b82f6] text-white rounded-md">
          <i className="fa fa-wrench" /> Ceiling | Buildings & Fixtures
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <p
          className="text-center w-3/4"
          style={{ color: "#484F83", fontWeight: "bold" }}
        >
          Additional details will help us respond better but are not required
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="bg-gray-200 border-2 border-gray-300 p-3 rounded-md cursor-pointer w-full border-dashed flex items-center justify-center">
          {file && (
            <img src={file} alt="Uploaded File" className="w-24 h-24 mx-auto" />
          )}
        </div>
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Room Number"
            value={roomNumber}
            readOnly
            className="flex-1 p-3 border border-gray-300 rounded-md"
          />
          <div className="relative flex-1">
            <select
              value={assetNumber}
              readOnly
              className="appearance-none w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none"
            >
              <option value="">Select Asset Number</option>
              <option value="11">Fire Extenguisher 11</option>
              <option value="12">LED 12</option>
              <option value="13">Furniture 13</option>
            </select>
          </div>
        </div>
        <textarea
          placeholder="Anything specific we should know?......"
          value={description}
          readOnly
          className="p-3 border border-gray-300 rounded-md h-24 resize-none"
        ></textarea>
      </form>
    </div>
  );
};

export default QRScanner;
