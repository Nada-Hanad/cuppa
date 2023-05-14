import Head from "next/head";
import DistributorCard from "../../components/ADM/distributorCard";
import FilterButton from "../../components/shared/filters/filterButton";
import Input from "../../components/shared/inputs/input";
import SearchBar from "../../components/shared/search/searchBar";
import Title from "../../components/shared/layout/title";
import BoissonCard from "../../components/AC/boissonsCard";
import { useState } from "react";
import FilterSection from "../../components/shared/filters/filterSection";
import AddBoissonModal from "../../components/AC/addBoisson";

export default function Boissons() {
  const defaultData = [
    {
      id: 0,
      name: "Cappuccino",

      price: 4.99,
      ingredients: [
        { name: "espresso", quantity: 10 },
        { name: "steamed milk", quantity: 10 },
        { name: "foamed milk", quantity: 10 },
      ],
      image:
        "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Q2FwcHVjY2lub3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 1,
      name: "Chai Latte",

      price: 5.99,
      ingredients: [
        { name: "chai tea", quantity: 10 },
        { name: "steamed milk", quantity: 10 },
        { name: "honey", quantity: 10 },
      ],
      image:
        "https://images.unsplash.com/photo-1616084521924-3dbdfb2e5234?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Q2hhaSUyMExhdHRlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      name: "Hot Chocolate",

      price: 3.99,
      ingredients: [
        { name: "chocolate syrup", quantity: 10 },
        { name: "milk", quantity: 10 },
        { name: "whipped cream", quantity: 10 },
      ],
      image:
        "https://images.unsplash.com/photo-1512035986687-f3cc6aefba8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8SG90JTIwQ2hvY29sYXRlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Latte",

      price: 4.49,
      ingredients: [
        { name: "espresso", quantity: 10 },
        { name: "steamed milk", quantity: 10 },
        { name: "milk foam", quantity: 10 },
      ],
      image:
        "https://images.unsplash.com/photo-1593443320739-77f74939d0da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8TGF0dGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      name: "Mint Chocolate",
      price: 4.49,
      ingredients: [
        { name: "chocolate syrup", quantity: 10 },
        { name: "milk", quantity: 10 },
        { name: "whipped cream", quantity: 10 },
        { name: "mint extract", quantity: 10 },
      ],
      image:
        "https://images.unsplash.com/photo-1514508985285-52fa488e199a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8TWludCUyMEhvdCUyMENob2NvbGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 6,
      name: "Americano",
      price: 3.49,
      ingredients: [
        { name: "espresso", quantity: 10 },
        { name: "hot water", quantity: 10 },
      ],
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8QW1lcmljYW5vfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 7,
      name: "Matcha Latte",
      price: 5.99,
      ingredients: [
        { name: "matcha powder", quantity: 10 },
        { name: "steamed milk", quantity: 10 },
        { name: "honey", quantity: 10 },
      ],
      image:
        "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8TWF0Y2hhJTIwTGF0dGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 8,
      name: "Mulled Wine",
      price: 7.99,
      ingredients: [
        { name: "red wine", quantity: 1 },
        { name: "orange juice", quantity: 1 },
        { name: "cinnamon sticks", quantity: 1 },
        { name: "cloves", quantity: 1 },
        { name: "sugar", quantity: 1 },
      ],
      image:
        "https://images.unsplash.com/photo-1542143708653-1a0d78f64f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8TXVsbGVkJTIwV2luZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 9,
      name: "Turmeric Latte",
      price: 5.49,
      ingredients: [
        { name: "turmeric powder", quantity: 1 },
        { name: "steamed milk", quantity: 1 },
        { name: "honey", quantity: 1 },
      ],
      image:
        "https://images.unsplash.com/photo-1557130696-82c95909fe08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8VHVybWVyaWMlMjBMYXR0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 10,
      name: "London Fog",
      price: 4.99,
      ingredients: [
        { name: "Earl Grey tea", quantity: 1 },
        { name: "steamed milk", quantity: 1 },
        { name: "vanilla syrup", quantity: 1 },
      ],
      image:
        "https://images.unsplash.com/photo-1643660089917-3074ad9d046e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8TG9uZG9uJTIwRm9nJTIwZHJpbmt8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    },
  ];
  function handleSearch(enteredWord) {
    const searchTerms = enteredWord.toLowerCase().split(" ");
    const filteredDrinks = defaultData.filter((drink) => {
      const nameLower = drink.name.toLowerCase();
      return searchTerms.every((term) => nameLower.includes(term));
    });
    setDrinks(filteredDrinks);
  }
  const [drinks, setDrinks] = useState(defaultData);

  return (
    <div className="text-center pt-8 flex flex-col items-center">
      <Head>
        <title>Boissons</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Boissons" />

      <AddBoissonModal drinks={drinks} setDrinks={setDrinks} />

      <div className="flex my-8 justify-between h-full gap-10">
        <SearchBar
          placeholder={"Nom du boisson..."}
          handleSearch={handleSearch}
        />
        <FilterSection
          placeholders={{ first: "prix min...", second: "prix max..." }}
          data={defaultData}
          setData={setDrinks}
          attribute={"price"}
        />
      </div>
      <div className="grid grid-cols-3	gap-12">
        {drinks.map((drink, i) => (
          <BoissonCard
            key={i}
            drink={drink}
            drinks={drinks}
            setDrinks={setDrinks}
          />
        ))}
      </div>
    </div>
  );
}
