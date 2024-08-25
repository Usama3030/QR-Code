import React, { useState } from "react";

const QRCreater = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [assetNumber, setAssetNumber] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Attach photos / Videos");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 6 * 1024 * 1024) {
      setLoading(true);
      setFileName("Loading...");

      const reader = new FileReader();
      reader.onloadstart = () => {
        setLoading(true);
        setFileName("Loading...");
      };

      reader.onload = async (event) => {
        try {
          const fileContent = event.target.result;
          const blob = new Blob([fileContent], { type: file.type });

          const formData = new FormData();
          formData.append("file", blob, file.name);

          const response = await fetch(
            `${process.env.REACT_APP_NODE_API}/file/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (response.ok) {
            const fileURL = await response.text();
            setFileName(file.name);
            setFile(fileURL);
            console.log("Uploaded file URL:", fileURL);
          } else {
            setFileName("Attach photos / Videos");
            console.error("File upload failed");
          }
        } catch (error) {
          setFileName("Attach photos / Videos");
          console.error("Error during file upload:", error);
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert("File size exceeds the limit of 6MB");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Making the query string
    const query = new URLSearchParams({
      roomNumber,
      assetNumber,
      description,
      // file: fileName !== "Attach photos / Videos" ? fileName : "",
      file: file !== "" ? file : "",
    }).toString();

    // Making the URL
    const url = `${window.location.origin}/form?${query}`;

    console.log("Generated URL:", url);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="text-center mb-6">
        {/* <img src="/" alt="Header Image" className="w-24 h-24 mx-auto" /> */}
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
        <label
          htmlFor="file-upload"
          className="bg-gray-200 border-2 border-gray-300 p-3 rounded-md cursor-pointer w-full border-dashed flex items-center justify-center"
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
          <i className="fa fa-upload mr-2" /> {fileName}
        </label>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Room Number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-md"
          />
          <div className="relative flex-1">
            <select
              value={assetNumber}
              onChange={(e) => setAssetNumber(e.target.value)}
              className="appearance-none w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none"
            >
              <option value="">Select Asset Number</option>
              <option value="11">Fire Extinguisher 11</option>
              <option value="12">LED 12</option>
              <option value="13">Furniture 13</option>
            </select>
          </div>
        </div>
        <textarea
          placeholder="Anything specific we should know?......"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 border border-gray-300 rounded-md h-24 resize-none"
        ></textarea>
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 px-6 rounded-md w-full"
          >
            {loading ? "Waiting..." : "Report Problem"}
            {/* Report Problem */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QRCreater;
