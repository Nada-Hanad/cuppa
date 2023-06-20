import Image from "next/image";
import EditBoissonModal from "./editBoissonModal";

/**
 * Component for displaying a drink card.
 * @param {Object} drink - Drink object.
 * @param {Array} drinks - List of drinks.
 * @param {function} setDrinks - Function to update the list of drinks.
 * @returns {JSX.Element} - Drink card component.
 */
export default function BoissonCard({ drink, drinks, setDrinks }) {
  return (
    <div className="h-[200px] rounded bg-white p-[10px] text-start flex flex-col justify-between shadow-lg">
      <div className="flex justify-between items-center gap-4">
        <Image
          src={drink.image}
          alt="boissons's pic"
          height={100}
          width={100}
          className="w-32 h-32 overflow-hidden object-cover rounded"
        />
        <div className="flex flex-col gap-8">
          <h2 className="font-bold py-1 px-2 w-fit text-white rounded flex justify-center items-center bg-dark-grey">
            {drink?.name}
          </h2>
          <p className="h-8 w-24 text-white rounded flex justify-center items-center bg-dark-grey">
            {drink?.price} DZD
          </p>
        </div>
      </div>
      <EditBoissonModal drinks={drinks} setDrinks={setDrinks} drink={drink} />
    </div>
  );
}
