'use client';
import { endpoints } from "../api/config";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";

export default function Popular() {
  const popularGames = useGetDataByCategory(endpoints.games,'popular');

  return (
    <main className={'main-inner'}>
      {popularGames ? (
        <CardsListSection title='Популярные' data={popularGames} />
      ) : (
        <Preloader/>
      )}
    </main>
  )
}