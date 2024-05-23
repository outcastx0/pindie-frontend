'use client';

import { Banner } from "./components/Banner/Banner";
import { Promo } from "./components/Promo/Promo";
import { CardsListSection } from "./components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "./api/api-hooks";
import { endpoints } from "./api/config";
import { Preloader } from "./components/Preloader/Preloader";

export default function Home() {
  const popularGames = useGetDataByCategory(endpoints.games, "popular");
  const newGames = useGetDataByCategory(endpoints.games, "new");

  return (
    <main className="main">
      <Banner />
      {popularGames && newGames ? (
        <><CardsListSection id="popular" title="Популярные" data={popularGames} type='slider' />
          <CardsListSection id="new" title="Новинки" data={newGames} type='slider' /></>
      ) : (
        <Preloader/>
      )}
      <Promo />
    </main>
  );
}