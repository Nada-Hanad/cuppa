


export default function ReclamationCard() {
    return (
<div className='flex flex-col items-center pt-4 overflow-x-hidden text-center gap-11'>
      {/* ...autres éléments... */}

      <div className="relative">
        <button
          className="w-[180px] h-[60px] rounded-[15px] border-[3px] border-[#343A49] text-[#343A49] bg-white font-semibold text-[20px] flex items-center justify-evenly"
          onClick={() => {
            // Toggle dropdown menu visibility
            setSelectedType((prevType) => (prevType === "Delivery" ? null : "Delivery"));
          }}
        >
          Type: {selectedType || "Select"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${selectedType ? "transform rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 14l6-6H4l6 6z"
            />
          </svg>
        </button>

        {selectedType && (
          <div className="absolute mt-1 py-2 w-[180px] rounded-[15px] border-[3px] border-[#343A49] bg-white text-[#343A49] font-semibold">
            <button
              className="w-full py-2 px-4 text-left hover:bg-[#343A49] hover:text-white"
              onClick={() => {
                setReclamations(defaultData.filter((d) => d.type_reclamation === "Delivery"));
                setSelectedType(null);
              }}
            >
              Delivery
            </button>
			<button
              className="w-full py-2 px-4 text-left hover:bg-[#343A49] hover:text-white"
              onClick={() => {
                setReclamations(defaultData.filter((d) => d.id_reclamation != null));
                setSelectedType(null);
              }}
            >
             Tous
            </button>
            <button
              className="w-full py-2 px-4 text-left hover:bg-[#343A49] hover:text-white"
              onClick={() => {
                setReclamations(defaultData.filter((d) => d.type_reclamation === "Quality"));
                setSelectedType(null);
              }}
            >
              Quality
            </button>
          </div>
        )}
      </div>
</div>
  );
}
