'use client';
import { endpoints } from "../api/config";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";

export default function Runner() {
  const runnerGames = useGetDataByCategory(endpoints.games, 'runner');

  return (
    <main className={'main-inner'}>
      {runnerGames ? (
        <CardsListSection title='Ранеры' data={runnerGames} />
      ) : (
        <Preloader/>
      )}
    </main>
  );
}