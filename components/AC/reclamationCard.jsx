import Image from "next/image";

export default function ReclamationCard() {
  return (
    <div className="h-[350px] w-80 rounded bg-white p-[10px] text-start flex flex-col justify-between">
      <div className="">
        <Image
          src="/placeholders/distributeur.jpg"
          alt="user's pic"
          height={64}
          width={64}
          className="h-16 w-16 overflow-hidden object-cover rounded-full"
        />
      </div>

      <h2 className="font-bold">d name</h2>
      <p>hel</p>
      <button className="py-2 px-4 bg-dark w-fit rounded text-white self-end">
        Voir plus
      </button>
    </div>
  );
}
