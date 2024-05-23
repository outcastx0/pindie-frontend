'use client';
import { endpoints } from "../api/config";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";

export default function New() {
  const newGames = useGetDataByCategory(endpoints.games, 'new');

  return (
    <main className={'main-inner'}>
      {newGames ? (
        <CardsListSection title='Новинки' data={newGames} />
      ) : (
        <Preloader/>
      )}
    </main>
  );
}